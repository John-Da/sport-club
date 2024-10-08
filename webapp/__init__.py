from flask import Flask
from flask_sqlalchemy import SQLAlchemy



def create_app():
    app = Flask(__name__)
    app.secret_key = "you_will_never_know"
    app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///petanque.db"
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    db = SQLAlchemy(app)

    from .views import views
    from .auth import auth
    from .admin import admin
    app.register_blueprint(views, url_prefix='/')
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(admin, url_prefix='/')

    # from webapp.dbtable import create_db

    # create_db()

    return app