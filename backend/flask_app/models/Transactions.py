class Transactions:
    def __init__(self, id, customer_id, transaction_amount, transaction_type, isOnline, isRepeatRetailer, date):
        self._id = id
        self._customer_id = customer_id
        self._transaction_amount = transaction_amount
        self._transaction_type = transaction_type
        self._isOnline = isOnline
        self._isRepeatRetailer = isRepeatRetailer
        self._date = date

    @property
    def id(self):
        return self._id
    @property
    def customer_id(self):
        return self._customer_id
    @property
    def transaction_amount(self):
        return self._transaction_amount
    @property
    def transaction_type(self):
        return self._transaction_type
    @property
    def isOnline(self):
        return self._isOnline
    @property
    def isRepeatRetailer(self):
        return self._isRepeatRetailer
    @property
    def date(self):
        return self._date