from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Product, Review, db
from app.forms.review_form import ReviewForm

reviews = Blueprint("reviews", __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list

    ['name : Name is required', 
    'age : Age must be a number', 'age : Age is required']

    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@reviews.route("/")
def get_all_reviews():
    pass
