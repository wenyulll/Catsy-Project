from flask import Blueprint, redirect, request, jsonify
from ..models import db
from flask_login import login_required, current_user
from ..models.order_item import OrderItem
from ..models.order import Order
from ..models.product import Product


order = Blueprint('order', __name__)


@order.route('/')
@login_required
def get_all_orders():
    orders = Order.query.filter(Order.userId == current_user.id).all()
    response = {}
    for order in orders:
        response[order.to_dict()['id']] = order.to_dict()
    return response


@order.route('/<int:id>')
@login_required
def get_order_detail(id):
    print('order_itemsorder_itemsorder_itemsorder_itemsorder_items', id)
    order_items = OrderItem.query.filter(OrderItem.orderId == id).all()
    order = Order.query.filter_by(id=id, userId=current_user.id).first()
    items = {}
    print('order_itemsorder_itemsorder_itemsorder_itemsorder_items', order_items)
    for item in order_items:
        items[item.to_dict()['id']] = item.to_dict()
    result = order.to_dict()
    result['items'] = items
    return result


@order.route('/', methods=["POST"])
@login_required
def add_order():
    userId = current_user.id

    order = Order(
        userId=userId,
        num_of_items=0,
        total_price=0
    )
    db.session.add(order)
    db.session.commit()
    return order.to_dict()


@order.route('/<int:id>', methods=["POST"])
@login_required
def add_order_item(id):
    req_json = request.json
    product_id = req_json.get("productId")
    quantity = req_json.get("quantity")

    order = Order.query.filter_by(id=id, userId=current_user.id).first()
    if order is None:
        return jsonify({"error": "Order not found"}), 404

    product = Product.query.filter_by(id=product_id).first()
    if product.quantity < quantity:
        return jsonify({"error": "Product quantity available is lower than ordered"}), 400

    # update product quantity available
    product.quantity -= quantity

    # create new item in order_item
    new_order_item = OrderItem(
        productId=product_id,
        orderId=id,
        quantity=quantity
    )
    db.session.add(new_order_item)

    # update number of type of product, and total price for the order
    order.num_of_items += quantity
    order.total_price += product.price*quantity

    db.session.commit()
    return new_order_item.to_dict()


@order.route('/<int:id>', methods=["DELETE"])
@login_required
def delete_order(id):
    order = Order.filter_by(id=id, userId=current_user.id).first()
    if order is None:
        return jsonify({"error": "Order not found or access denied"}), 404

    db.session.delete(order)
    db.session.commit()

    return order.to_dict()
