from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Order(db.Model):
    __tablename__="orders"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key =True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    purchaseDate = db.Column(db.DateTime, nullable=False, default=datetime.now())
    num_of_items = db.Column(db.Integer, nullable=False)
    total_price = db.Column(db.Integer, nullable=False)

    users = db.relationship("User", back_populates="orders")
    order_items = db.relationship("OrderItem", back_populates="orders")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'date': self.purchaseDate,
            'num_of_items': self.num_of_items,
            'total_price': self.total_price,
        }
