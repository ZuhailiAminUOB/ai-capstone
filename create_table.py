import sqlite3

conn = sqlite3.connect('database.db')
print("Connected to database successfully")
cur = conn.cursor()

cur.execute('DROP TABLE IF EXISTS transactions')
print("Table dropped successfully")
cur.execute('''
CREATE TABLE transactions(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    distance_from_home FLOAT,
    distance_last_transaction FLOAT,
    ratio_median_purchase_price FLOAT,
    repeat_retailer INTEGER,
    used_chip INTEGER,
    used_pin INTEGER,
    online_order INTEGER)        
    ''')
print("Table successfully created")

conn.close()