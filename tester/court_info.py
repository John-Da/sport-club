# Example Court Available Time Information

COURT_INFO = [
    {
        "id": "1",
        "court_number": "Court A",
        "available_date": "15/9/2024",
        "available_time": ["9-10", "10-11"],
        "total_people": "4",
    },
    {
        "id": "2",
        "court_number": "Court B",
        "available_date": "15/9/2024",
        "available_time": ["1-2", "3-4"],
        "total_people": "4",
    },
    {
        "id": "3",
        "court_number": "Court C",
        "available_date": "16/9/2024",
        "available_time": ["4-5", "6-7"],
        "total_people": "4",
    },
]




# ------------- Adding Court ---------
# @app.route('/booking', methods=['GET','POST'])
# def booking():
#     if request.method == 'POST':
#         court_name = request.form.get('courtName')
#         court_time = request.form.get('courtTime')
#         court_price = request.form.get('courtPrice')

#         if court_name and court_time and court_price:
#             try:
#                 new_court = Courts(courtName=court_name, courtTime=court_time, courtPrice=court_price)
#                 db.session.add(new_court)
#                 db.session.commit()

#                 flash("Booked successfully!")
#             except Exception as e:
#                 db.session.rollback()
#                 flash(f"Error adding court: {str(e)}")
        
#         else:
#             flash("All fields are required.")

#         return redirect(url_for('booking'))
#     return render_template('addCourt.html')



# -------------- Delete Cart ------------
# @app.route('/delete_court/<int:court_id>', methods=['POST'])
# def delete_court(court_id):
#     try:
#         court_to_delete = Courts.query.get(court_id)
#         if court_to_delete:
#             db.session.delete(court_to_delete)
#             db.session.commit()
#             flash('Court deleted successfully!')
#         else:
#             flash('Court not found.')
#     except Exception as e:
#         db.session.rollback()
#         flash(f"Error deleting court: {str(e)}")

#     return redirect(url_for('userhome'))

