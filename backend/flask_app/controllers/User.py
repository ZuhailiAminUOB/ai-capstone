from flask import Blueprint, render_template, request, jsonify, redirect, url_for
from models.forms import RegForm

auth = Blueprint('auth', __name__) 

@auth.route("/register", methods=['GET', 'POST'])
def register():
    form = RegForm()