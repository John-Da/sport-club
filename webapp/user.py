from datetime import datetime
from flask import Blueprint, jsonify, render_template, redirect, request, session, url_for, flash
from flask_login import login_required, logout_user, current_user
import secrets
from webapp.models import Booking, Court, Rules
from webapp import db, mail  
from flask_mail import Message

user = Blueprint("user", __name__)

def generate_token():
    return secrets.token_hex(8)

@user.route("/dashboard")
@login_required
def dashboard():
    rules = Rules.query.all()
    bookings = Booking.query.filter_by(user_id=current_user.id).all()
    print("User ID:", current_user.id)  # Debug print
    print("Found bookings:", bookings)  # Debug print
    return render_template("end_user/user_dashboard.html", rules=rules, bookings=bookings)


@user.route('/bookings', methods=['GET', 'POST'])
def bookings():
    selected_date = request.args.get('date')
    selected_court = request.args.get('court')
    selected_duration = request.args.get('duration')

    unique_courts = Court.query.with_entities(Court.court_name).distinct().all()
    unique_durations = Court.query.with_entities(Court.duration).distinct().all()

    # Start building the query
    query = Court.query

    if selected_date:
        query = query.filter(Court.date == selected_date)
        return redirect(url_for('user.bookings'))

    if selected_court and selected_court != 'all':
        query = query.filter(Court.court_name == selected_court)
        return redirect(url_for('user.bookings'))

    if selected_duration and selected_duration != 'all':
        query = query.filter(Court.duration == selected_duration)
        return redirect(url_for('user.bookings'))

    courts = query.all()

    return render_template('end_user/bookings.html', courts=courts, selected_court=selected_court, selected_duration=selected_duration, selected_date=selected_date, unique_courts=[court.court_name for court in unique_courts], unique_durations=[duration.duration for duration in unique_durations])

@user.route('/book', methods=['GET', 'POST'])
@login_required
def book_court():
    if request.method == "POST":
        print("Form data:", request.form)  # Debug print
        
        court_name = request.form.get('court_name')
        duration = request.form.get('duration')
        time = request.form.get('time')
        date = request.form.get('date')
        price = request.form.get('price')
        court_id = request.form.get('court_id')
        
        print("Extracted data:", {  # Debug print
            'court_name': court_name,
            'duration': duration,
            'time': time,
            'date': date,
            'price': price,
            'court_id': court_id,
            'user_id': current_user.id
        })

        if not all([court_name, duration, time, date, price, court_id]):
            flash("All fields are required.", "error")
            return redirect(url_for("user.bookings"))

        try:
            token = generate_token()
            booking = Booking(
                user_id=current_user.id,
                court_name=court_name,
                date=datetime.strptime(date, "%Y-%m-%d"),
                time=time,
                duration=int(duration),
                price=float(price),
                token=token,
                court_id=int(court_id)
            )
            
            print("Created booking object:", booking)  # Debug print
            
            db.session.add(booking)
            db.session.commit()
            
            print("Booking committed to database")  # Debug print
            
            flash(f"Booking successful! Your token is {token}", "success")
            return redirect(url_for("user.dashboard"))
            
        except Exception as e:
            print("Error occurred:", str(e))  # Debug print
            db.session.rollback()
            flash(f"Booking failed: {str(e)}", "error")
            return redirect(url_for("user.bookings"))
    
    # GET request handling
    court_name = request.args.get('court_name')
    duration = request.args.get('duration')
    time = request.args.get('time')
    date = request.args.get('date')
    price = request.args.get('price')
    court_id = request.args.get('court_id')

    # Check if we have all required parameters
    if not all([court_name, duration, time, date, price, court_id]):
        flash("Missing required booking information.", "error")
        return redirect(url_for("user.bookings"))
    
    return render_template("end_user/bookingform.html", 
                         court_name=court_name,
                         duration=duration,
                         time=time,
                         date=date,
                         price=price,
                         court_id=court_id)

@user.route("/profile")
def profile():
    return render_template("end_user/profile.html")


@user.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect('/landingpage')
