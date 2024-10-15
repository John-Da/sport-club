from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, FloatField, PasswordField, EmailField, BooleanField, SubmitField
from wtforms.validators import DataRequired, length, NumberRange


class SignUpForm(FlaskForm):
    email = EmailField("Email", validators=[DataRequired()], render_kw={'placeholder' : 'Email'})
    username = StringField("Username", validators=[DataRequired(), length(min=3)], render_kw={'placeholder' : 'User Name'})
    password1 = PasswordField("Password", validators=[DataRequired(), length(min=6)], render_kw={'placeholder' : 'Password'})
    password2 = PasswordField("Confirm Your Password", validators=[DataRequired(), length(min=6)], render_kw={'placeholder' : 'Confirm Password'})
    submit = SubmitField("Sign Up")


class LoginForm(FlaskForm):
    email = EmailField("Email", validators=[DataRequired()], render_kw={'placeholder' : 'Email'})
    password = PasswordField("Password", validators=[DataRequired(), length(min=6)], render_kw={'placeholder' : 'Password'})
    submit = SubmitField("Login")


class PromoteForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired()])
    submit = SubmitField('Promote to Admin')
