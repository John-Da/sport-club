from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.secret_key = "you_will_never_know"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///petanque.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False  # The key should be plural
db = SQLAlchemy(app)



if __name__ == "__main__":
    from routes import *  # Import routes after app is initialized
    app.run(debug=True)
