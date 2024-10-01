from geopy.geocoders import Nominatim

# Function to get latitude and longitude from an address
def get_lat_long(address):
    geolocator = Nominatim(user_agent="geoapiExercises")
    location = geolocator.geocode(address)
    if location:
        return location.latitude, location.longitude
    else:
        return None, None

address = "123 Main St, New York, NY"
latitude, longitude = get_lat_long(address)
print(f"Latitude: {latitude}, Longitude: {longitude}")