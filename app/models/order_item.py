from .db import db, environment, SCHEMA, add_prefix_for_prod

class OrderItem(db.Model):
    __tablename__ = 'order_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key =True)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("products.id")))
    orderId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("orders.id")))
    quantity = db.Column(db.Integer)

    products = db.relationship("Product", back_populates="order_items")
    orders = db.relationship("Order", back_populates="order_items")

    def to_dict(self):
        return {
            'id': self.id,
            'productId': self.productId,
            'orderId': self.orderId,
            'userId': self.orders.userId,
            'price': self.products.price,
            'productName': self.products.name,
            'quantity': self.quantity
        }