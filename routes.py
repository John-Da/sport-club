from flask import request, redirect, url_for, flash, render_template
from run_app import app, db
from models import Courts, Customers, Booking


# ---------- User Views ------

@app.route('/')
@app.route('/userdashboard')
def userhome():
    court_info = Courts.query.all()

    return render_template('member_dashboard.html', court_info=court_info)


# ------------- Adding Court ---------
@app.route('/booking', methods=['GET','POST'])
def booking():
    if request.method == 'POST':
        court_name = request.form.get('courtName')
        court_time = request.form.get('courtTime')
        court_price = request.form.get('courtPrice')

        if court_name and court_time and court_price:
            try:
                new_court = Courts(courtName=court_name, courtTime=court_time, courtPrice=court_price)
                db.session.add(new_court)
                db.session.commit()

                flash("Booked successfully!")
            except Exception as e:
                db.session.rollback()
                flash(f"Error adding court: {str(e)}")
        
        else:
            flash("All fields are required.")

        return redirect(url_for('booking'))
    return render_template('addCourt.html')




