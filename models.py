from run_app import db

class Courts(db.Model):
    courtID = db.Column(db.Integer, primary_key=True)
    courtName = db.Column(db.String(100), nullable=False, unique=True)
    bookings = db.relationship('Booking', backref='court', lazy=True)  # Define relationship


class Coustomers(db.Model):
    coustomerID = db.Column(db.Integer, primary_key=True)
    coustomerName = db.Column(db.String(100), nullable=False, unique=True)
    bookings = db.relationship('Booking', backref='customer', lazy=True)  # Define relationship


class Booking(db.Model):
    bookingID = db.Column(db.Integer, primary_key=True)
    
    # Foreign keys for Courts and Coustomers
    coustomerID = db.Column(db.Integer, db.ForeignKey('coustomers.coustomerID'), nullable=False)
    courtID = db.Column(db.Integer, db.ForeignKey('courts.courtID'), nullable=False)
    
    # Optional booking time and date fields
    bookingTime = db.Column(db.Time, nullable=False)
    bookingDate = db.Column(db.Date, nullable=False)
