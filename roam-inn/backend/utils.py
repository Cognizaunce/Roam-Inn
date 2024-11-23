import requests
import os

GEOCODING_API_KEY = os.getenv("GEOCODING_API_KEY")
GEOCODING_BASE_URL = "https://api.geoapify.com/v1/geocode/reverse"

def reverse_geocode(lat, lon):
    """
    Makes a reverse geocoding request to Geoapify and returns the address details.
    """
    params = {
        "lat": lat,
        "lon": lon,
        "format": "json",
        "apiKey": GEOCODING_API_KEY
    }
    response = requests.get(GEOCODING_BASE_URL, params=params)
    response.raise_for_status()
    data = response.json()

    if "results" in data and len(data["results"]) > 0:
        result = data["results"][0]
        return {
            "name": result.get("name"),
            "address": result.get("formatted"),
            "city": result.get("city"),
            "state": result.get("state"),
            "country": result.get("country"),
            "postal_code": result.get("postcode"),
        }
    else:
        return None
