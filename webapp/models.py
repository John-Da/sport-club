from webapp import db
from flask_login import UserMixin
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class Customer(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    username = db.Column(db.String(100))
    password_hash = db.Column(db.String(150))
    date_joined = db.Column(db.DateTime, default=datetime.now)
    role = db.Column(db.String(50), default='user')

    bookings = db.relationship("Booking", backref=db.backref("customer", lazy=True)) 

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
    date = db.Column(db.String(20), nullable=False)
    time = db.Column(db.String(20), nullable=False)
    duration = db.Column(db.Integer, nullable=False)  # in hours
    current_price = db.Column(db.Float, nullable=False)
    previous_price = db.Column(db.Float)

    bookings = db.relationship("Booking", backref=db.backref("booking", lazy=True)) 


    def __str__(self):
        return "<Courts %r>" % self.court_name
    

class Booking(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    token = db.Column(db.String(16), unique=True, nullable=False)  
    status = db.Column(db.String(50), default="Booked")
    customer_id = db.Column(db.Integer, db.ForeignKey("customer.id"), nullable=False)
    court_id = db.Column(db.Integer, db.ForeignKey("court.id"), nullable=False)

    def __repr__(self):
        return f'<Booking {self.id}>'

