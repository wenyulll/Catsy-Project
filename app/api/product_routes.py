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


@products.route("/")
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
    product = Product.query.filter_by(id=id).first()
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
    pass


@products.route("/delete/<int:id>")
def delete_product(id):
    product_to_delete = Product.query.get(id)

    if not product_to_delete:
        return "Product not found", 404

    db.session.delete(product_to_delete)
    db.session.commit()
    return redirect('/')
