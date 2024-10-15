from flask import Blueprint, render_template, redirect, url_for
from flask_login import login_required, logout_user, current_user


user = Blueprint("user", __name__)

@user.route("/dashboard")
def dashboard():
    return render_template("end_user/user_dashboard.html")


@user.route("/booking")
def booking():
    return render_template("end_user/bookings.html")


@user.route("/profile")
def profile():
    return render_template("end_user/profile.html")

@user.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect('/landingpage')