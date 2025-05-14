from flask import Flask, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
from werkzeug.security import generate_password_hash
from flask_mail import Mail

db = SQLAlchemy()
DB_NAME = "database.sqlite3"
login_manager = LoginManager()
mail = Mail()

def create_app():
    app = Flask(__name__, template_folder='templates')
    app.secret_key = "you_will_never_know"
    app.config["SQLALCHEMY_DATABASE_URI"] = f"sqlite:///{DB_NAME}"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    app.config['MAIL_SERVER'] = 'petanq@club.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USERNAME'] = 'petanq@club.com'
    app.config['MAIL_PASSWORD'] = 'admin12345'
    app.config['MAIL_USE_TLS'] = True

    db.init_app(app)

    login_manager.init_app(app)
    login_manager.login_view = "auth.login"
    mail.init_app(app)

    from .models import Customer, Court, Booking
    
    @login_manager.user_loader
    def load_user(id):
        return Customer.query.get(int(id))

    from .views import views
    from .auth import auth
    from .admin import admin
    from .user import user

    app.register_blueprint(views, url_prefix="/")
    app.register_blueprint(auth, url_prefix="/auth")
    app.register_blueprint(admin, url_prefix="/admin")
    app.register_blueprint(user, url_prefix="/user")

    with app.app_context():
        inspector = db.inspect(db.engine)
        if not inspector.has_table("customer"):
            db.create_all()
        else:
            columns = inspector.get_columns("customer")
            if "role" not in [col["name"] for col in columns]:
                db.engine.execute('ALTER TABLE customer ADD COLUMN role VARCHAR(50) DEFAULT "user"')
                print("Added 'role' column to the customer table.")

        admin_email = 'admin@petanq.com'
        adminpass = 'admin12345'
        admin = Customer.query.filter_by(email=admin_email).first()
        if not admin:
            hashpass = generate_password_hash(password=adminpass)
            new_admin = Customer(email=admin_email, username="admin", password=adminpass, role="admin")
            db.session.add(new_admin)
            db.session.commit()
            print('Admin account created.')
        
    return app