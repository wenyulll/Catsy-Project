from flask import Blueprint, redirect, request
from flask_login import login_required, current_user
from app.models import Product, Review, db
from app.forms.review_form import ReviewForm
# from sqlalchemy.orm import joinedload, subqueryload

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


@reviews.route("")
def get_all_reviews():
    reviews = Review.query.all()
    # reviews = Review.query.options(subqueryload(Review.users)).all()

    review_list = [review.to_dict() for review in reviews]
    print('review_list', review_list)
    return review_list


@reviews.route("/<int:id>")
def get_single_review(id):
    """
    return single reivew by id
    """

    # product = Product.query.filter_by(id=id).first()
    reivew = Review.query.get(id)

    if reivew:
        return reivew.to_dict()
    else:
        return {"error": "Review not found"}, 404


@reviews.route("products/<int:id>", methods=["POST"])
def new_review(id):
    # print("New Review Route Hit")
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_review = Review(
            rating=form.data['rating'],
            review=form.data['review'],
            userId=current_user.id,
            productId=id
        )

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@reviews.route("/update/<int:id>", methods=["PUT"])
def update_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        review_to_update = Review.query.get(id)

        if not review_to_update:
            return "Review not found", 404

        if current_user.id != review_to_update.userId:
            return "You are not the owner of this review", 403

        review_to_update.rating = form.data['rating']
        review_to_update.review = form.data['review']

        db.session.commit()

        return review_to_update.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@reviews.route("/delete/<int:id>", methods=["DELETE"])
def delete_review(id):
    review_to_delete = Review.query.get(id)

    if not review_to_delete:
        return "Review not found", 404

    db.session.delete(review_to_delete)
    db.session.commit()
    return "Review deleted successfully", 200
