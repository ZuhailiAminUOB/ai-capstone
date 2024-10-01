class Retailer:
    def __init__(self, id, name, location, contact):
        self._id = id
        self._name = name
        self._location = location
        self._contact = contact
        self._customers = []
    
    @property
    def id(self):
        return self._id
    @property
    def name(self):
        return self._name
    @name.setter
    def name(self, newName):
        self._name = newName
    @property
    def location(self):
        return self._location
    @location.setter
    def location(self, newLocation):
        self._location = newLocation
    @property
    def contact(self):
        return self._contact
    @contact.setter
    def contact(self, newContact):
        self._contact = newContact
    @property
    def customers(self):
        return self._customers
    
    def addCustomer(self, customer):
        if customer not in self._customers:
            self._customers.append(customer)
