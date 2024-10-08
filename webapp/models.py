from run_app import db, app

class Courts(db.Model):
    courtID = db.Column(db.Integer, primary_key=True)
    courtName = db.Column(db.String(100), nullable=False)
    courtTime = db.Column(db.String(100), nullable=False)  # Add this field
    courtPrice = db.Column(db.Integer, nullable=False)  # Add this field
    bookings = db.relationship('Booking', backref='court', lazy=True)  # Define relationship


class Customers(db.Model):  # Fix the spelling of 'Coustomers'
    customerID = db.Column(db.Integer, primary_key=True)
    customerName = db.Column(db.String(100), nullable=False)
    bookings = db.relationship('Booking', backref='customer', lazy=True)  # Define relationship


class Booking(db.Model):
    bookingID = db.Column(db.Integer, primary_key=True)
    
    bookingTime = db.Column(db.Time, nullable=False)
    bookingDate = db.Column(db.Date, nullable=False)

    customerID = db.Column(db.Integer, db.ForeignKey('customers.customerID'), nullable=False)
    courtID = db.Column(db.Integer, db.ForeignKey('courts.courtID'), nullable=False)


with app.app_context():
    db.create_all()
