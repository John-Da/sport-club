from flask import Blueprint, render_template, flash, redirect, url_for
from flask_login import login_required, current_user, logout_user
from .models import Court, db, Customer
from .forms import PromoteForm

admin = Blueprint("admin", __name__)


@admin.route("/dashboard")
@login_required
def admin_dashboard():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))
    return render_template("admin/admin_dashboard.html")


@admin.route("/bookings")
@login_required
def admin_bookings():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))
    return render_template("admin/manage_booking.html")


@admin.route("/courts")
@login_required
def manage_courts():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))

    courts = Court.query.all()
    return render_template("admin/manage_courts.html", users=courts)


@admin.route("/customers")
@login_required
def manage_customers():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))

    users = Customer.query.all()
    form = PromoteForm()
    if form.validate_on_submit():
        email = form.email.data
        user = Customer.query.filter_by(email=email).first()

        if not user:
            flash("User not found.", "error")
            return redirect(url_for("admin.admin_dashboard"))

        user.role = "admin"
        db.session.commit()
        flash(f"{user.username} has been promoted to admin.", "success")
        return redirect(url_for("admin.admin_dashboard"))

    return render_template("admin/manage_customers.html", customers=users, form=form)


@admin.route("/analytics")
@login_required
def admin_analytics():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))
    return render_template("admin/admin_analytics.html")


@admin.route("/messages")
@login_required
def messages():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))
    return render_template("admin/messages.html")


@admin.route("/reports")
@login_required
def reports():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))
    return render_template("admin/reports.html")


@admin.route("/settings")
@login_required
def admin_settings():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))
    return render_template("admin/admin_settings.html")


@admin.route("/logout", methods=["GET", "POST"])
@login_required
def logout():
    logout_user()
    return redirect("/landingpage")


# @admin.route("/promote", methods=["GET", "POST"])
# @login_required
# def promote_user():
#     if current_user.role != "admin":
#         flash("You are not authorized to perform this action.", "error")
#         return redirect(url_for("views.landingpage"))

#     form = PromoteForm()
#     if form.validate_on_submit():
#         email = form.email.data
#         user = Customer.query.filter_by(email=email).first()

#         if not user:
#             flash("User not found.", "error")
#             return redirect(url_for("admin.admin_dashboard"))

#         user.role = "admin"
#         db.session.commit()
#         flash(f"{user.username} has been promoted to admin.", "success")
#         return redirect(url_for("admin.admin_dashboard"))

#     return render_template("admin/promote_user.html", form=form)
