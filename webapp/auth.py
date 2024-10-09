from flask import Blueprint, render_template, flash, redirect
from .forms import LoginForm, SignUpForm
from flask_login import login_user, login_required, logout_user
from .models import Customer
from . import db


auth = Blueprint("auth", __name__)


@auth.route("/register", methods=["GET", "POST"])
def register():
    form = SignUpForm()

    if form.validate_on_submit():
        email = form.email.data
        username = form.username.data
        password1 = form.password1.data
        password2 = form.password2.data

        if password1 == password2:
            new_customer = Customer()
            new_customer.email = email
            new_customer.username = username
            new_customer.password = password2

            try:
                db.session.add(new_customer)
                db.session.commit()
                flash("Account Created Successfully, You can now Login")
                return redirect('/login')
            
            except Exception as e:
                print(f"Error: {e}")
                flash("Account Not Created! Email already exists")
            
            form.email.data = ''
            form.username.data = ''
            form.password1.data = ''
            form.password2.data = ''

    return render_template("register.html", form=form)


@auth.route("/login", methods=["GET", "POST"])
def login():
    form = LoginForm()

    if form.validate_on_submit:
        email = form.email.data
        password = form.password.data

        customer = Customer.query.filter_by(email=email).first()
        if customer:
            if customer.verify_password(password=password):
                login_user(customer)
                return redirect('/')
            else:
                flash("Incorrect Email or Password")
        else:
            flash("Account does not exist. Please Sign Up.")


    return render_template("login.html", form=form)


@auth.route('/logout', methods=['GET', 'POST'])
@login_required
def logout():
    logout_user()
    return redirect('/')
