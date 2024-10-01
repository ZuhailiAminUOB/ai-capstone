class Location:
    def __init__(self, id, name, longitude, latitude):
        self._id = id
        self._name = name
        self._longitude = longitude
        self._latitude = latitude
    
    @property
    def name(self):
        return self._name
    @property
    def longitude(self):
        return self._longitude
    @property
    def latitude(self):
        return self._latitude
    
    @name.setter
    def setName(self, newName):
        self._name = newName
    @longitude.setter
    def setLongitude(self, newLongitude):
        self._longitude = newLongitude
    @latitude.setter
    def setLatitude(self, newLatitude):
        self._latitude = newLatitude
    
