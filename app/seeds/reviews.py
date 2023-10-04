from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text


def seed_reviews():
    review1 = Review(
        rating=4,
        review='good!',
        userId=1,
        productId=3
    )

    review2 = Review(
        rating=5,
        review='lOVE IT ! !',
        userId=1,
        productId=4
    )

    review3 = Review(
        rating=4,
        review='super cuuuuuute!',
        userId=1,
        productId=5
    )
    review4 = Review(
        rating=5,
        review='perfect!',
        userId=1,
        productId=7
    )
    review5 = Review(
        rating=5,
        review='my cat loves it so much',
        userId=2,
        productId=1
    )
    review6 = Review(
        rating=5,
        review='Extremely over the moon with how beautiful my portrait was so so thankful for these artists!',
        userId=4,
        productId=1
    )
    review7 = Review(
        rating=5,
        review='Excellent portrait of Ozzy! I framed it to make it extra fancy!',
        userId=3,
        productId=1
    )
    review8 = Review(
        rating=3,
        review='ok',
        userId=1,
        productId=8
    )
    review9 = Review(
        rating=4,
        review='perfect for my bedroom',
        userId=2,
        productId=12
    )
    review10 = Review(
        rating=5,
        review='good gift for cat lover',
        userId=3,
        productId=11
    )
    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)

    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
