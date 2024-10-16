from datetime import datetime
from flask import Blueprint, render_template, redirect, request, url_for, flash
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


@user.route('/bookings', methods=['GET'])
def bookings():
    selected_date = request.args.get('date')
    courts = Court.query.filter_by(date=selected_date).all() if selected_date else Court.query.all()
    return render_template('end_user/bookings.html', courts=courts)


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
    return redirect(url_for("user.dashboard"))

@user.route("/profile")
def profile():
    return render_template("end_user/profile.html")


@user.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect('/landingpage')
