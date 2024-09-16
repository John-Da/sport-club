from flask import *
from flask_sqlalchemy import *
from sqlalchemy import *
from sqlalchemy.orm import *
from datetime import *
from run_app import app


app.secret_key = "you_will_never_know"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///petanque.db"
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
db = SQLAlchemy(app)


class Courts(db.Model):
    courtID = db.Column(db.Integer, primary_key=True)
    courtName = db.Column(db.String(100), nullable=False, unique=True)


class Coustomers(db.Model):
    coustomerID = db.Column(db.Integer, primary_key=True)
    coustomerName = db.Column(db.String(100), nullable=False, unique=True)


class Booking(db.Model):
    bookingID = db.Column(db.Integer, primary_key=True)


with app.app_context():
    db.create_all()
