class Customer:
    def __init__(self, id, name, contact, address):
        self._id = id
        self._name = name
        self._contact = contact
        self._address = address
        self._median_expenditure = 0
        self._median_expenditure_list = []
        self._transactions = []
        self._last_ratio = 0

    @property
    def id(self):
        return self._id
    @property
    def name(self):
        return self._name
    @property
    def contact(self):
        return self._contact
    @property
    def address(self):
        return self._address
    @property
    def median_expenditure(self):
        return self._median_expenditure
    @median_expenditure.setter
    def median_expenditure(self, new_median_expenditure):
        self._median_expenditure = new_median_expenditure
    @property
    def median_expenditure_list(self):
        return self._median_expenditure_list
    @property
    def last_ratio(self):
        return self._last_ratio
    @last_ratio.setter
    def last_ratio(self, new_last_ratio):
        self._last_ratio = new_last_ratio
    @property
    def transactions(self):
        return self._transactions

    def add_transaction(self, transaction):
        self._transactions.append(transaction)

    def compute_median_expenditure(self):
        '''
        Computes the median expenditure of a customer based on the list of transactions.
        '''
        if len(self._transactions) == 0:
            return None 
        self._median_expenditure_list.clear()

        for transaction in self._transactions:
            self._median_expenditure_list.append(transaction.transaction_amount)
        self._median_expenditure_list.sort()
        # Compute the median
        length = len(self._median_expenditure_list)
        if length % 2 == 0:
            median = (self._median_expenditure_list[length//2] + self._median_expenditure_list[length//2 - 1]) / 2
        else:
            median = self._median_expenditure_list[length//2]
        # Set the median expenditure
        self.median_expenditure = median
        return median  # Return the median value
    
    def compute_ratio_to_median_purchase_price(self):
        self.last_ratio = self.transactions[-1]/self.median_expenditure
