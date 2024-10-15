from webapp import create_app, db  
from webapp.models import Customer 

app = create_app()

with app.app_context():
    user = Customer.query.filter_by(email='user@example.com').first()

    if user:
        user.role = 'admin'
        db.session.commit()
        print(f"User {user.username} has been promoted to admin.")
    else:
        print("User not found.")
