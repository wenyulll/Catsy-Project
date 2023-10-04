from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    rating = db.Column(db.Integer, nullable=False)
    review = db.Column(db.String(255), nullable=False)
    productId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('products.id')), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(
        add_prefix_for_prod('users.id')))
    createdAt = db.Column(db.DateTime, nullable=False, default=datetime.now())
    updatedAt = db.Column(db.DateTime, nullable=False, default=datetime.now())

    users = db.relationship('User', back_populates='reviews')
    products = db.relationship('Product', back_populates='reviews')

    def to_dict(self):
        return {
            'id': self.id,
            'rating': self.rating,
            'review': self.review,
            'userId': self.userId,
            'productId': self.productId,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt,
        }
