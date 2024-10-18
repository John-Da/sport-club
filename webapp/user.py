from datetime import datetime
from flask import Blueprint, jsonify, render_template, redirect, request, url_for, flash
from flask_login import login_required, logout_user, current_user
import secrets
from webapp.models import Booking, Court
from webapp import db, mail  
from flask_mail import Message

user = Blueprint("user", __name__)

def generate_token():
    return secrets.token_hex(8)

@user.route("/dashboard")
def dashboard():
    return render_template("end_user/user_dashboard.html")

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

    return render_template(
        'end_user/bookings.html', 
        courts=courts, 
        selected_court=selected_court, 
        selected_duration=selected_duration, 
        selected_date=selected_date,
        unique_courts=[court.court_name for court in unique_courts],
        unique_durations=[duration.duration for duration in unique_durations]
    )


@user.route("/book", methods=["POST"])
@login_required
def book_court():
    court_id = request.form.get('court_id')
    date = request.form.get('date')

    token = generate_token()

    booking = Booking(
        user_id=current_user.id,  
        court_id=court_id,
        date=datetime.strptime(date, "%Y-%m-%d"),
        token=token
    )
    
    db.session.add(booking)
    db.session.commit()
    
    # Now you can send email
    msg = Message("Your Booking Token", recipients=[current_user.email])
    msg.body = f"Your booking is confirmed. Your token number is {token}."
    mail.send(msg)

    flash(f"Booking successful! Your token is {token}. Please check your email for the confirmation.", "success")
    # return redirect(url_for("user.dashboard"))
    return jsonify({'message': 'Booking successful!', 'token': token}), 201

@user.route("/profile")
def profile():
    return render_template("end_user/profile.html")


@user.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect('/landingpage')
