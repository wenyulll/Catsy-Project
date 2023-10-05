from flask import Blueprint, request, redirect
from flask_login import login_required, current_user
from app.models import Product, Review, db
from app.forms.product_form import ProductForm

products = Blueprint("products", __name__)


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


@products.route("")
def get_all_products():
    """
    return all products

    """
    products = Product.query.all()

    product_list = [product.to_dict() for product in products]
    return product_list


@products.route("/<int:id>")
def get_single_product(id):
    """
    return single product by id
    """

    # product = Product.query.filter_by(id=id).first()
    product = Product.query.get(id)

    if product:
        return product.to_dict()
    else:
        return {"error": "Product not found"}, 404


@products.route("/new", methods=["POST"])
def new_product():
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():

        new_product = Product(
            name=form.data['name'],
            price=form.data['price'],
            image=form.data['image'],
            category=form.data['category'],
            description=form.data['description'],
            quantity=form.data['quantity'],
            userId=current_user.id
        )

        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict(), 201
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@products.route("/update/<int:id>", methods=["PUT"])
def update_product(id):
    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        product_to_update = Product.query.get(id)

        if not product_to_update:
            return "Product not found", 404

        if current_user.id != product_to_update.userId:
            return "You are not the owner of this product", 403

        product_to_update.name = form.data['name']
        product_to_update.price = form.data['price']
        product_to_update.image = form.data['image']
        product_to_update.category = form.data['category']
        product_to_update.description = form.data['description']
        product_to_update.quantity = form.data['quantity']

        db.session.commit()

        return product_to_update.to_dict(), 200
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400


@products.route("/delete/<int:id>", methods=["DELETE"])
def delete_product(id):
    product_to_delete = Product.query.get(id)

    if not product_to_delete:
        return "Product not found", 404

    db.session.delete(product_to_delete)
    db.session.commit()
    return "Product deleted successfully", 200
