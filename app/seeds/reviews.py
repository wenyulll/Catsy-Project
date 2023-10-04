from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1 = (

    )


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
