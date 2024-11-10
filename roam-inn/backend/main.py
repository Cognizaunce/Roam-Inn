from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from database import get_db
from crud import create_hotel, get_hotels_by_city
from models import Hotel

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

# Endpoint to search for hotels
@app.get("/api/search-hotels")
async def search_hotels(city: str):
    token = get_amadeus_token()
    url = f"https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode={city}&radius=15&radiusUnit=KM&hotelSource=ALL"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    return response.json()

#these endpoints below are not correct, must update according to amadeus docs
@app.get("/api/populate-hotels/")
async def populate_hotels(city: str, db: Session = Depends(get_db)):
    token = get_amadeus_token()
    url = f"https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode={city}&radius=15&radiusUnit=KM&hotelSource=ALL"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    hotels_data = response.json().get("data", [])

    # Insert each hotel into the database
    for hotel in hotels_data:
        create_hotel(
            db=db,
            name=hotel.get("name"),
            city=city,
            rating=hotel.get("rating", 0),  # Adjust based on the actual structure
            address=hotel.get("address", {}).get("lines", [""])[0]
        )
    
    return {"message": "Hotels data populated in database"}

@app.get("/api/hotels/")
async def get_hotels(city: str, db: Session = Depends(get_db)):
    hotels = get_hotels_by_city(db, city=city)
    return hotels
