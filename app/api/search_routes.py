from flask import Blueprint, jsonify
from app.models import Product
from sqlalchemy import or_

search = Blueprint('search', __name__)


@search.route("/<searchItem>", methods=["GET"])
def search_products(searchItem):
    # Search for products that match the search item in their name or category

    print("dajsdhfkjahkfja", searchItem)
    searched_products = Product.query.filter(
        or_(
            Product.name.ilike(f"%{searchItem}%"),
            Product.category.ilike(f"%{searchItem}%")
        )
    ).all()

    if not searched_products:
        return jsonify(error="Product could not be found"), 404

    product_lists = [product.to_dict() for product in searched_products]

    response_data = {
        "products": product_lists
    }

    return jsonify(response_data)
