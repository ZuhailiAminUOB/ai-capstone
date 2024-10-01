import requests
import folium
import time
import math

def haversine(lat1, lon1, lat2, lon2):
    # Radius of the Earth in kilometers
    R = 6371.0

    # Convert degrees to radians
    lat1 = math.radians(lat1)
    lon1 = math.radians(lon1)
    lat2 = math.radians(lat2)
    lon2 = math.radians(lon2)

    # Differences in latitudes and longitudes
    dlat = lat2 - lat1
    dlon = lon2 - lon1

    # Haversine formula
    a = math.sin(dlat / 2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))

    # Distance in kilometers
    distance = R * c

    return distance


BASE_URL = "https://nominatim.openstreetmap.org/search?format=json"

headers = {
    "User-Agent": "TestFraudDetection"
}

location_name1 = 'Singapore Polytechnic'
response = requests.get(f"{BASE_URL}&q={location_name1}", headers=headers)
# print(response.text)
data = response.json()
latitude = data[0].get('lat')
longitude = data[0].get('lon')
location1 = float(latitude), float(longitude)
print(location1)
time.sleep(2)

location_name2 = 'Ngee Ann Polytechnic'
response2 = requests.get(f"{BASE_URL}&q={location_name2}", headers=headers)
data2 = response2.json()
latitude2 = data2[0].get('lat')
longitude2 = data2[0].get('lon')
location2 = float(latitude2), float(longitude2)
print(location2)
time.sleep(2)

location_name3 = 'Temasek Polytechnic'
response3 = requests.get(f"{BASE_URL}&q={location_name3}", headers=headers)
data3 = response3.json()
latitude3 = data3[0].get('lat')
longitude3 = data3[0].get('lon')

location3 = float(latitude3), float(longitude3)
print(location3)

haversine_distance1 = haversine(float(latitude), float(longitude), float(latitude2), float(longitude2))
print("Distance difference haversine SP and NP: ", haversine_distance1)
haversine_distance2 = haversine(float(latitude2), float(longitude2), float(latitude3), float(longitude3))
print("Distance difference haversine NP and TP: ", haversine_distance2)

m = folium.Map(location=[latitude, longitude], zoom_start=15, width=800, height=400)
folium.Marker(location=[latitude, longitude], popup=location_name1).add_to(m)
folium.Marker(location=[latitude2, longitude2], popup=location_name2).add_to(m)
folium.Marker(location=[latitude3, longitude3], popup=location_name3).add_to(m)
folium.PolyLine((location1, location2), popup=f"{haversine_distance1:.2f}km").add_to(m)
folium.PolyLine((location2, location3), popup=f"{haversine_distance2:.2f}km").add_to(m)

m.save("map.html")
