from flask import *
from flask_sqlalchemy import *
from models import *


from court_info import COURT_INFO
from datetime import *

app = Flask(__name__)







if __name__ == "__main__":
    app.run(debug=True)
