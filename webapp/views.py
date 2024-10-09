from flask import Blueprint, render_template


views = Blueprint("views", __name__)


# @views.route("/")
# def welcome():
#     return render_template("welcome.html")

@views.route("/")
@views.route("/home")
def home():
    return render_template("home.html")


@views.route("/booking")
def booking():
    return render_template("bookings.html")


@views.route("/profile")
def profile():
    return render_template("profile.html")
