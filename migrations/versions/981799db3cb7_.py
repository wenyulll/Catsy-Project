"""empty message

Revision ID: 981799db3cb7
Revises: 
Create Date: 2023-12-21 15:16:27.762079

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '981799db3cb7'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('username', sa.String(
                        length=40), nullable=False),
                    sa.Column('email', sa.String(length=255), nullable=False),
                    sa.Column('hashed_password', sa.String(
                        length=255), nullable=False),
                    sa.PrimaryKeyConstraint('id'),
                    sa.UniqueConstraint('email'),
                    sa.UniqueConstraint('username')
                    )
    op.create_table('orders',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('userId', sa.Integer(), nullable=True),
                    sa.Column('purchaseDate', sa.DateTime(), nullable=False),
                    sa.Column('num_of_items', sa.Integer(), nullable=False),
                    sa.Column('total_price', sa.Integer(), nullable=False),
                    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('products',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('name', sa.String(), nullable=False),
                    sa.Column('price', sa.Integer(), nullable=False),
                    sa.Column('image', sa.String(), nullable=False),
                    sa.Column('category', sa.String(), nullable=False),
                    sa.Column('quantity', sa.Integer(), nullable=False),
                    sa.Column('description', sa.String(), nullable=False),
                    sa.Column('createdAt', sa.DateTime(), nullable=False),
                    sa.Column('updatedAt', sa.DateTime(), nullable=False),
                    sa.Column('userId', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('order_items',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('productId', sa.Integer(), nullable=True),
                    sa.Column('orderId', sa.Integer(), nullable=True),
                    sa.Column('quantity', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['orderId'], ['orders.id'], ),
                    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('reviews',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('rating', sa.Integer(), nullable=False),
                    sa.Column('review', sa.String(length=255), nullable=False),
                    sa.Column('productId', sa.Integer(), nullable=False),
                    sa.Column('userId', sa.Integer(), nullable=True),
                    sa.Column('createdAt', sa.DateTime(), nullable=False),
                    sa.Column('updatedAt', sa.DateTime(), nullable=False),
                    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
                    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    op.create_table('shopping_cart_items',
                    sa.Column('id', sa.Integer(), nullable=False),
                    sa.Column('userId', sa.Integer(), nullable=True),
                    sa.Column('productId', sa.Integer(), nullable=True),
                    sa.Column('quantity', sa.Integer(), nullable=True),
                    sa.ForeignKeyConstraint(['productId'], ['products.id'], ),
                    sa.ForeignKeyConstraint(['userId'], ['users.id'], ),
                    sa.PrimaryKeyConstraint('id')
                    )
    # ### end Alembic commands ###
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE orders SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE products SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE order_items SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE reviews SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE shopping_cart_items SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('shopping_cart_items')
    op.drop_table('reviews')
    op.drop_table('order_items')
    op.drop_table('products')
    op.drop_table('orders')
    op.drop_table('users')
    # ### end Alembic commands ###
