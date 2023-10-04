from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    price = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, nullable=False)
    category = db.Column(db.String, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.String, nullable=False)
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))

    user = db.relationship("User", back_populates='products')
    reviews = db.relationship(
        'Review', back_populates='products', cascade="all, delete", lazy="joined")


def to_dict(self):
    return {
        'id': self.id,
        'name': self.name,
        'price': self.price,
        'image': self.image,
        'category': self.category,
        'quantity': self.quantity,
        'description': self.description,
        'createdAt': self.createdAt,
        'updatedAt': self.updatedAt,
        'userId': self.userId,
        # 'reviews': [review.to_dict() for review in self.reviews]
    }
