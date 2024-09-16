from flask import request, redirect, url_for, flash, render_template
from run_app import app, db
from models import *

@app.route('/')
@app.route('/memberdashboard')
def home():

    courts = Courts.query.all()
    
    court_info = []
    for court in courts:
        court_info.append({
            'court_number': court.courtName,  
            'available_date': '2024-09-16',  
            'available_time': ['10:00 AM', '11:00 AM', '12:00 PM'],
            'price' : '56'
        })
    
    return render_template('member_dashboard.html', court_info=court_info)


@app.route('/add_court', methods=['POST'])
def add_court():
    court_name = request.form.get('courtName')
    if court_name:
        try:
            new_court = Courts(courtName=court_name)
            db.session.add(new_court)
            db.session.commit()
            flash("Court added successfully!")
        except Exception as e:
            db.session.rollback()
            flash(f"Error adding court: {str(e)}")
    return redirect(url_for('show_form'))

@app.route('/add_booking', methods=['POST'])
def add_booking():
    court_name = request.form.get('courtName')
    customer_name = request.form.get('customerName')
    if court_name and customer_name:
        new_info = Booking()

@app.route('/add_customer', methods=['POST'])
def add_customer():
    customer_name = request.form.get('customerName')
    if customer_name:
        try:
            new_customer = Coustomers(coustomerName=customer_name)
            db.session.add(new_customer)
            db.session.commit()
            flash("Customer added successfully!")
        except Exception as e:
            db.session.rollback()
            flash(f"Error adding customer: {str(e)}")
    return redirect(url_for('show_form'))

@app.route('/booking')
def show_form():
    return render_template('booking.html')

