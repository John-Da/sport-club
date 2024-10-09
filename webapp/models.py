from webapp import db
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class Customer(db.Model, UserMixin):  # Fix the spelling of 'Coustomers'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    username = db.Column(db.String(100))
    password_hash = db.Column(db.String(150))
    date_joined = db.Column(db.DateTime, default=datetime.now)

    bookings = db.relationship("Booking", backref=db.backref("customer", lazy=True))  # Define relationship
    courts = db.relationship("Court", backref=db.backref("customer", lazy=True))

    @property
    def password(self):
        raise AttributeError("Password is not a readable Attribute.")

    @password.setter
    def password(self, password):
        self.password_hash = generate_password_hash(password=password)

    def verify_password(self, password):
        return check_password_hash(self.password_hash, password=password)

    def __str__(self):
        return "<Customer %r>" % self.id


class Court(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    court_name = db.Column(db.String(100), nullable=False)
    time = db.Column(db.String(100), nullable=False)  # Add this field
    current_price = db.Column(db.Float, nullable=False)  # Add this field
    previous_price = db.Column(db.Float, nullable=False)  # Add this field
    in_use = db.Column(db.Float, nullable=False)  # Add this field
    court_picture = db.Column(db.String(2000), nullable=False)
    date_added = db.Column(db.DateTime, default=datetime.now())

    bookings = db.relationship("Booking", backref=db.backref("booking", lazy=True))  # Define relationship


    def __str__(self):
        return "<Courts %r>" % self.court_name
    

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    time_booked = db.Column(db.Time, nullable=False)
    date_booked = db.Column(db.Date, nullable=False)
    status = db.Column(db.String(100), nullable=False)
    payment_id = db.Column(db.String(1000), nullable=False)

    customer_link = db.Column(db.Integer, db.ForeignKey("customer.id"), nullable=False)
    court_link = db.Column(db.Integer, db.ForeignKey("court.id"), nullable=False)

    def __str__(self):
        return "<Booking %r>" % self.id

