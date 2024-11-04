from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import requests
import os
from dotenv import load_dotenv

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
