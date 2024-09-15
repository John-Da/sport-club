from flask import *

from datetime import *
from run_app import app


db_uri = "sqlite:///petanque.db"

app.secret_key = "you_will_never_know"
app.config["SQLALCHEMY_DATABASE_URI"] = db_uri
app.config["SQLALCHEMY_TRACK_MODIFICATION"] = False
db = ''


class Customer(db.Model):
    customerID = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(200), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    date_added = db.Column(db.DateTime(), default=datetime.utcnow)

    def __repr__(self):
        return f"<Name {self.name}>"


class Booking(db.Model):
    bookingID = db.Column(db.Integer, primary_key=True)
    bookedDate = db.Column()
    bookedAT = db.Column()
    customerID = db.Column()


class Court(db.Model):
    courtID = db.Column(db.Integer, primary_key=True)
    available_court = db.Column()
    available_date = db.Column()
    available_time = db.Column()
    bookingID = db.Column()
    customerID = db.Column()


with app.app_context():
    db.create_all()