from flask import Blueprint, redirect, request, jsonify
from ..models import db
from flask_login import login_required, current_user
from ..models.shopping_cart_item import ShoppingCartItem
from ..models.product import Product

shopping_cart = Blueprint('shopping_cart', __name__)


@shopping_cart.route('/')
@login_required
def get_shopping_cart():
    """
    Query for all shopping_cart_items and returns them in a list of shopping_cart dictionaries with the current user
    """
    items = ShoppingCartItem.query.filter(ShoppingCartItem.userId == current_user.id).all()
    response = [item.to_dict() for item in items]
    return {'shopping_cart_items': response}


@shopping_cart.route("/", methods=["POST"])
@login_required
def add_shopping_cart_item():
    data = request.json
    product_id = data.get('productId')
    quantity = data.get('quantity')
    item = ShoppingCartItem(userId = current_user.id, productId = product_id, quantity=quantity)

    if product_id is None or quantity is None:
        return jsonify({"error": "Product ID and quantity are required"}), 400

    db.session.add(item)
    db.session.commit()
    return item.to_dict()


@shopping_cart.route("/<int:id>", methods=["DELETE"])
@login_required
def delete_shopping_cart_item(id):
    item_to_delete = ShoppingCartItem.query.filter_by(id=id).first()
    print(item_to_delete)
    if item_to_delete:
        db.session.delete(item_to_delete)
        db.session.commit()
        return item_to_delete.to_dict()
    return jsonify({"error": "Item not found with id: " + str(id)}), 404




