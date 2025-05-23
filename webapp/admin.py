from flask import Blueprint, render_template, flash, redirect, url_for, request, current_app
from flask_login import login_required, current_user, logout_user
from .models import Court, Rules, db, Customer, Booking
from .forms import PromoteForm
from datetime import datetime
from sqlalchemy.orm import joinedload


admin = Blueprint("admin", __name__)

@admin.route("/dashboard")
@login_required
def admin_dashboard():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))
    courts = Court.query.all()
    users = Customer.query.all()
    return render_template("admin/admin_dashboard.html", courts=courts, customers=users)


@admin.route("/bookings")
@login_required
def admin_bookings():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))
    bookings = Booking.query.options(joinedload(Booking.customer)).all()
    return render_template("admin/manage_booking.html", bookings=bookings)


@admin.route("/checkin", methods=["POST"])
@login_required
def check_in():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))

    token = request.form.get("token")
    booking = Booking.query.filter_by(token=token).first()

    if not booking:
        flash("Invalid token. Please check and try again.", "error")
    else:
        booking.status = "Checked-in"
        db.session.commit()
        flash(f"User {booking.user_id} has been checked in.", "success")

    return redirect(url_for("admin.dashboard"))

@admin.route('/courts', methods=['GET', 'POST'])
def manage_courts():
    if request.method == 'POST':
        # Check if court data is being added
        if 'court_name' in request.form:
            court_name = request.form['court_name']
            date_str = request.form['date']
            time_str = request.form['time']
            duration = int(request.form['duration'])
            current_price = float(request.form['current_price'])
            previous_price = float(request.form.get('previous_price', 0))

            new_court = Court(
                court_name=court_name,
                date=date_str,
                time=time_str,
                duration=duration,
                current_price=current_price,
                previous_price=previous_price
            )

            try:
                db.session.add(new_court)
                db.session.commit()
                flash('Court added successfully', 'success')
            except Exception as e:
                db.session.rollback()
                current_app.logger.error(f"Database error while adding court: {str(e)}")
                flash(f"Error adding court: {str(e)}", 'error')

        # Check if rule data is being added
        if 'rule_description' in request.form:
            rule_description = request.form['rule_description']
            new_rule = Rules(rule_description=rule_description)  # Assuming your Rule model has a description field
            
            try:
                db.session.add(new_rule)
                db.session.commit()
                flash('Rule added successfully', 'success')
            except Exception as e:
                db.session.rollback()
                current_app.logger.error(f"Database error while adding rule: {str(e)}")
                flash(f"Error adding rule: {str(e)}", 'error')

    # Fetch all courts for display
    courts = Court.query.all()
    return render_template('admin/manage_courts.html', courts=courts)


@admin.route('/edit_court/<int:id>', methods=['GET', 'POST'])
def edit_court(id):
    court = Court.query.get_or_404(id)
    if request.method == 'POST':
        court.court_name = request.form['court_name']
        court.date = request.form['date']
        court.time = request.form['time']
        court.duration = int(request.form['duration'])
        court.current_price = float(request.form['current_price'])
        court.previous_price = float(request.form.get('previous_price', court.previous_price))
        
        db.session.commit()
        flash('Court updated successfully')
        return redirect(url_for('manage_courts'))
    
    return render_template('admin/edit_court.html', court=court)

@admin.route("/customers")
@login_required
def manage_customers():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))

    users = Customer.query.all()
    form = PromoteForm()
    
    return render_template("admin/manage_customers.html", customers=users, form=form)

@admin.route("/promote_user", methods=["POST"])
@login_required
def promote_user():
    if current_user.role != "admin":
        flash("You are not authorized.", "error")
        return redirect(url_for("views.landingpage"))

    form = PromoteForm()
    
    if form.validate_on_submit():
        email = form.email.data
        user = Customer.query.filter_by(email=email).first()

        if not user:
            flash("User not found.", "error")
            return redirect(url_for("admin.manage_customers"))

        # Promote user to admin
        user.role = "admin"
        db.session.commit()
        flash(f"{user.username} has been promoted to admin.", "success")
        return redirect(url_for("admin.manage_customers"))

    return redirect(url_for("admin.manage_customers"))


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

