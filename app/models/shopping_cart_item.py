from .db import db, environment, SCHEMA, add_prefix_for_prod

class ShoppingCartItem(db.Model):
    __tablename__ = 'shopping_cart_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    quantity = db.Column(db.Integer)

    # relationship atrribute
    users = db.relationship("User", back_populates="shopping_cart_items")
    products = db.relationship("Product", back_populates="shopping_cart_items", lazy="joined", order_by="asc(Product.updatedAt)")

    def to_dict(self):
        return {
            'id': self.id,
            'productId': self.productId,
            'userId': self.userId,
            'name': self.products.name,
            'price': self.products.price,
            'quantity': self.quantity,
            'quantity_available':self.products.quantity,
        }