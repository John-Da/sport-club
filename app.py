from flask import *

app = Flask(__name__)


# nameList = ['tim', 'joe', 'mark']

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test')
def test():
    return render_template('newPage.html', content='Testing')


if __name__ == "__main__":
    app.run(debug=True)