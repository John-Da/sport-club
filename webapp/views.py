from flask import Blueprint, render_template
from flask_login import current_user


views = Blueprint("views", __name__)


@views.route("/")
@views.route("/welcome")
def welcome():
    user_role = current_user.role if current_user.is_authenticated else None
    return render_template("/startupPages/welcome.html", role=user_role)


@views.route("/landingpage")
def landingpage():
    return render_template("/startupPages/landingpage.html")


@views.route("/home")
def home():
    return render_template("home.html")


@views.route("/booking")
def booking():
    return render_template("bookings.html")


@views.route("/profile")
def profile():
    return render_template("profile.html")
