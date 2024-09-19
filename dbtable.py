from run_app import app, db

def create_db():
    with app.app_context():
        db.create_all()
        print("Database and tables created.")


