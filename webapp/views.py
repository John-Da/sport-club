from flask import Blueprint, render_template
from flask_login import current_user


views = Blueprint("views", __name__)


@views.route("/")
@views.route("/welcome")
def welcome():
    user_role = current_user.role if current_user.is_authenticated else None
    return render_template("welcome.html", role=user_role)

@views.route("/landingpage")
def landingpage():
    return render_template("landingpage.html")

