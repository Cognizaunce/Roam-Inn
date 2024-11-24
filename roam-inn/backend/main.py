from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from datetime import datetime
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from database import get_db
from crud import create_hotel, get_hotels_by_city
from models import User, Hotel

# For Secure Login
from passlib.context import CryptContext
from pydantic import BaseModel, Field, EmailStr
from fastapi.exceptions import HTTPException

#for hotel address
from utils import reverse_geocode

# Load environment variables
load_dotenv()

app = FastAPI()

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Amadeus API credentials
AMADEUS_API_KEY = os.getenv("AMADEUS_API_KEY")
AMADEUS_API_SECRET = os.getenv("AMADEUS_API_SECRET")

# Function to authenticate and get an access token
def get_amadeus_token():
    url = "https://test.api.amadeus.com/v1/security/oauth2/token"
    data = {
        "grant_type": "client_credentials",
        "client_id": AMADEUS_API_KEY,
        "client_secret": AMADEUS_API_SECRET,
    }
    response = requests.post(url, data=data)
    return response.json().get("access_token")

# User Management: Pydantic Schemas
class CreateAccountRequest(BaseModel):
    first_name: str = Field(..., max_length=50)
    last_name: str = Field(..., max_length=50)
    email: EmailStr
    password: str = Field(..., min_length=8)
    phone_number: str = Field(None, max_length=15)

class LoginRequest(BaseModel):
    email: str
    password: str

class hotelSearchRequest(BaseModel):
    city: str
    radius: int

# Endpoint: Create a new user account
@app.post("/create-account")
def create_account(request: CreateAccountRequest, db: Session = Depends(get_db)):
    # Check if email is already registered
    existing_user = db.query(User).filter(User.email == request.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = pwd_context.hash(request.password)

    # Current timestamp
    current_time = datetime.utcnow()

    # Create new user
    new_user = User(
        first_name=request.first_name,
        last_name=request.last_name,
        email=request.email,
        password_hash=hashed_password,
        phone_number=request.phone_number,
        user_type="user",
        account_created=current_time,
        account_updated=current_time
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "status": "success",
        "message": "Account created successfully",
        "user_id": new_user.user_id,
    }

# Endpoint: Login user
@app.post("/login")
def login(request: LoginRequest, db: Session = Depends(get_db)):
    # Fetch user by email
    user = db.query(User).filter(User.email == request.email).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # Verify password
    if not pwd_context.verify(request.password, user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "status": "success",
        "message": f"Welcome, {user.first_name}!",
        "user_id": user.user_id,
    }

# Endpoint to search for hotels
@app.get("/api/search-hotels")
async def search_hotels(city: str, radius: int, db: Session = Depends(get_db)):
    token = get_amadeus_token()
    url = f"https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode={city}&radius={radius}&radiusUnit=KM&hotelSource=ALL"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    return response.json()

#endpoint to convert hotel coordinates to address
@app.post("/process-hotels/")
async def process_hotels(hotels: list[dict], db: Session = Depends(get_db)):
    """
    Processes a list of hotels, calls the reverse geocoding API, 
    and inserts new hotels into the database if they don't already exist.
    """
    processed_hotels = []

    for hotel in hotels:
        hotel_id = hotel["hotelID"]
        latitude = hotel["geoCode"]["latitude"]
        longitude = hotel["geoCode"]["longitude"]

        # Call reverse geocoding API to get the address
        address_details = reverse_geocode(latitude, longitude)
        if not address_details:
            continue  # Skip if reverse geocoding fails

        # Prepare hotel data
        hotel_data = {
            "hotel_id": hotel_id,
            "name": address_details["name"] or "Unknown Hotel",
            "address": address_details["address"] or "Unknown Address",
            "city": address_details["city"] or "Unknown City",
            "state": address_details["state"] or "Unknown State",
            "country": address_details["country"] or "Unknown Country",
            "postal_code": address_details["postal_code"] or "00000",
        }

        # Insert into database if it doesn't already exist
        try:
            new_hotel = Hotel(
                hotel_id=hotel_data["hotel_id"],
                name=hotel_data["name"],
                address=hotel_data["address"],
                city=hotel_data["city"],
                state=hotel_data["state"],
                country=hotel_data["country"],
                postal_code=hotel_data["postal_code"],
            )
            db.add(new_hotel)
            db.commit()
            db.refresh(new_hotel)
            processed_hotels.append(hotel_data)  # Append only if successfully added

        except IntegrityError:
            db.rollback()  # Avoid breaking the loop if duplicate entry or other DB issue
            continue

    return {
        "status": "success",
        "processed_hotels": processed_hotels,
        "message": f"{len(processed_hotels)} hotels processed and inserted into the database.",
    }
#these endpoints below are not correct, must update according to amadeus docs
# @app.get("/api/populate-hotels/")
# async def populate_hotels(city: str, db: Session = Depends(get_db)):
#     token = get_amadeus_token()
#     url = f"https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode={city}&radius=15&radiusUnit=KM&hotelSource=ALL"
#     headers = {"Authorization": f"Bearer {token}"}
#     response = requests.get(url, headers=headers)
#     hotels_data = response.json().get("data", [])

#     # Insert each hotel into the database
#     for hotel in hotels_data:
#         create_hotel(
#             db=db,
#             name=hotel.get("name"),
#             city=city,
#             rating=hotel.get("rating", 0),  # Adjust based on the actual structure
#             address=hotel.get("address", {}).get("lines", [""])[0]
#         )
    
#     return {"message": "Hotels data populated in database"}

@app.get("/api/hotels/")
async def get_hotels(city: str, db: Session = Depends(get_db)):
    hotels = get_hotels_by_city(db, city=city)
    return hotels
