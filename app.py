from flask import Flask, request, jsonify, render_template, redirect, url_for
import requests
import folium
import time
import math

import joblib
import os
import pandas as pd
import numpy as np
import sqlite3

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        model_path = 'models/RF.pkl'
        if os.path.exists(model_path):
            model = joblib.load(model_path)
            print("Model loaded successfully.")
            print("Model",  model)
        else:
            print(f"Model not found at {model_path}")
        
        # Process custmer data from database
        conn = sqlite3.connect('database.db')
        cur = conn.cursor()
        try:
            # Get data from form
            distance_from_home = float(request.form.get('distance_from_home'))
            distance_last_transaction = float(request.form.get('distance_last_transaction'))
            ratio_median_purchase_price = float(request.form.get('ratio_median_purchase_price'))
            repeat_retailer = int(request.form.get('repeat_retailer'))
            used_chip = int(request.form.get('used_chip'))
            used_pin = int(request.form.get('used_pin'))
            online_order = int(request.form.get('online_order'))
            # Processing
            data = [distance_from_home, distance_last_transaction, ratio_median_purchase_price, repeat_retailer, used_chip, used_pin, online_order]

            # Insert into database
            cur.execute('''
                INSERT INTO transactions (distance_from_home, distance_last_transaction, ratio_median_purchase_price, repeat_retailer, used_chip, used_pin, online_order) 
                VALUES (?, ?, ?, ?, ?, ?, ?)
                ''', data)
            conn.commit()
            print("Data inserted successfully")

            scaler_minmax = [1063.723672, 11851,104565, 267.80292, 1, 1, 1, 1]
            feature_names = ['distance_from_home', 'distance_from_last_transaction', 'ratio_to_median_purchase_price', 'repeat_retailer', 'used_chip', 'used_pin_number', 'online_order']
            input_data = pd.DataFrame([data], columns=feature_names)
            # Normalization
            input_data_scaled = input_data.copy()
            for i, feature in enumerate(feature_names):
                if scaler_minmax[i] != 0:  # Avoid division by zero
                    input_data_scaled[feature] = input_data[feature] / scaler_minmax[i]
            # Prediction
            prediction = model.predict(input_data_scaled)    
            prediction = prediction.tolist()[0]
            print("prediction: ",  prediction)
            if prediction == 0.0:
                result = 'Alright youre good'
            else:
                result = 'That looks like a fraud to me'
            return render_template('index.html', prediction=result, database_result = 'Successful database entry')
        
        except Exception as e:
            print("Error: ", e)
            return render_template('index.html', prediction='Error processing data', database_result = 'Unsuccessfully database entry')
    
    return render_template('index.html')

@app.route('/data')
def data():
    conn = sqlite3.connect("database.db")
    # store all the rows
    conn.row_factory = sqlite3.Row

    cur = conn.cursor()
    cur.execute("SELECT * FROM transactions")
    rows = cur.fetchall()
    conn.close()
    return render_template("data.html", rows = rows)

@app.route('/clear_transactions', methods=['POST'])
def clear_transactions():
    conn = sqlite3.connect('database.db')
    cur = conn.cursor()
    
    try:
        cur.execute('DELETE FROM transactions')
        conn.commit()
        print("All transaction records cleared")

    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        conn.close()
    
    return redirect(url_for('index'))

@app.route('/register_card', methods=['GET', 'POST'])
def register_card():
    #get details from register_card.html
    if request.method == 'POST':
        try:
            data = request.get_json()
            name = data.get('name')
            userAddress = data.get('userAddress')
            annual_income = data.get('annual_income')

            print("name: "+  name + " address: " + userAddress + " income: " + annual_income)

            #processing
            BASE_URL = "https://nominatim.openstreetmap.org/search?format=json"
            headers = {"User-Agent": "TestFraudDetection"}

            response = requests.get(f"{BASE_URL}&q={userAddress}", headers=headers)
            data = response.json()
            latitude = data[0].get('lat')
            longitude = data[0].get('lon')

            user_location = float(latitude), float(longitude)
            print(user_location)

            m = folium.Map(location=user_location, zoom_start=15, width=800, height=400)
            folium.Marker(location=[latitude, longitude], popup=userAddress).add_to(m)

            map_filename = f"static/{name}_map.html"
            m.save(map_filename)

            # map_html = m._repr_html_()
            return jsonify({"map_url": map_filename})

        except Exception as e:
            print("Error: ", e)
            return jsonify({"error": str(e)})

    return render_template('register_card.html')



if __name__ == '__main__':
    app.run(debug=True)