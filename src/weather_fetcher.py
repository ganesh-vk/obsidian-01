from fastapi import FastAPI, Query
import requests
import datetime

app = FastAPI()

def geocode_location(location: str):
    """Convert city or pincode to lat/lon using OpenStreetMap Nominatim API"""
    url = f"https://nominatim.openstreetmap.org/search?q={location}&format=json&limit=1"
    resp = requests.get(url, headers={"User-Agent": "solar-alert-app"}).json()
    if not resp:
        return None
    return float(resp[0]["lat"]), float(resp[0]["lon"]), resp[0]["display_name"]

def classify_cloudiness(avg_cloud):
    """Simple classification of cloudiness"""
    if avg_cloud < 20:
        return "Sunny"
    elif avg_cloud < 60:
        return "Partly Cloudy"
    else:
        return "Cloudy"

@app.get("/solar-forecast")
def solar_forecast(location: str = Query(..., description="City name or postal code")):
    geo = geocode_location(location)
    if not geo:
        return {"error": "Location not found"}
    
    lat, lon, display_name = geo
    tomorrow = (datetime.date.today() + datetime.timedelta(days=1)).strftime("%Y-%m-%d")

    # Fetch solar radiation + cloud cover forecast from Open-Meteo
    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}"
        f"&hourly=shortwave_radiation,cloudcover"
        f"&timezone=auto"
        f"&start_date={tomorrow}&end_date={tomorrow}"
    )
    data = requests.get(url).json()
    
    radiation = data["hourly"]["shortwave_radiation"]
    clouds = data["hourly"]["cloudcover"]

    avg_rad = sum(radiation) / len(radiation)
    avg_cloud = sum(clouds) / len(clouds)
    cloudiness = classify_cloudiness(avg_cloud)

    return {
        "location": display_name,
        "date": tomorrow,
        "avg_irradiance_wm2": round(avg_rad, 2),
        "cloudiness": cloudiness
    }
