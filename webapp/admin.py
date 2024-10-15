from flask import Blueprint, render_template, flash, redirect, url_for
from flask_login import current_user, login_required
from .models import Customer, Court, db
from .forms import PromoteForm


admin = Blueprint('admin', __name__)


@admin.route('/admin')
@login_required
def admin_dashboard():
    if current_user != 'admin':
        flash("You are not authorized.", 'error')
        return redirect(url_for('view.home'))
    return render_template('admin_dashboard.html')


@admin.route('/admin/courts')
@login_required
def manage_courts():
    if current_user != 'admin':
        flash("You are not authorized.", 'error')
        return redirect(url_for('view.home'))

    courts = Court.query.all()
    return render_template('manage_courts.html', courts=courts)


@admin.route('/admin/promote/<int:user_id>')
@login_required
def promote_user():
    if current_user.role != 'admin':
        flash('You are not authorized to perform this action.', 'error')
        return redirect(url_for('views.home'))

    form = PromoteForm()
    if form.validate_on_submit():
        email = form.email.data
        user = Customer.query.filter_by(email=email).first()

        if not user:
            flash('User not found.', 'error')
            return redirect(url_for('admin.admin_dashboard'))

        user.role = 'admin'
        db.session.commit()
        flash(f'{user.username} has been promoted to admin.', 'success')

        return redirect(url_for('admin.admin_dashboard'))

    return render_template('promote_user.html', form=form)

        



