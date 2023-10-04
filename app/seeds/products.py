from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():

    product1 = Product(
        name='Pet Portrait in Watercolor',
        price=45,
        image='https://i.etsystatic.com/41651278/r/il/776b8f/5332611733/il_1588xN.5332611733_cyqw.jpg',
        category='Pet Supplies',
        quantity=2,
        description='| MATERIAL | Water Color on Premium Cold Pressed Watercolor Paper 4 x 6'
    )

    product2 = Product(
        name='Pet Ear with Name Necklace',
        price=23,
        image='https://i.etsystatic.com/42759861/r/il/233672/5128656218/il_1588xN.5128656218_e5al.jpg',
        category='Pet Supplies',
        quantity=5,
        description='Handmade item. Ships from a small business in California. Materials: Gold, Silver. Adjustable length.'
    )
    product3 = Product(
        name='Book Cat Earrings, Avid Reader Gifts',
        price=23,
        image='https://i.etsystatic.com/26862916/r/il/bcf392/5351979595/il_1588xN.5351979595_gklp.jpg',
        category='Pet Supplies',
        quantity=10,
        description='Handmade item. Drop length: 1 7/8 Inches; Length: 1 1/8 Inches; Width: 3/4 Inches'
    )
    product4 = Product(
        name='Pet Memorial Gift | Custom shaped pillow | Dog Pillow | Cat Pillow | Pet Lover Gift',
        price=28,
        image='https://i.etsystatic.com/25155098/r/il/50053d/4045930533/il_1588xN.4045930533_m0ga.jpg',
        category='Pet Supplies',
        quantity=10,
        description='This funny shaped pillow is designed as a perfect gift for birthday, anniversary, Christmas, and more memorable days.'
    )
    product5 = Product(
        name='Small Standing stained glass cat suncatcher ornament',
        price=22,
        image='https://i.etsystatic.com/16813188/r/il/cd7ad8/2814450415/il_1588xN.2814450415_q57e.jpg',
        category='Pet Supplies',
        quantity=4,
        description='Stained glass cat suncatcher ornament, perfect for a window sill, desk, shelf or mantle. A great gift for a cat lover. They are about 3 inches wide and about 2.5 inches tall.'
    )
    product6 = Product(
        name="The Cat Is On My Lap Socks, I Can't Get Up Right Now, Gift, Birthday, Christmas, Gift For Him, Cat Lover",
        price=9,
        image='https://i.etsystatic.com/9188500/r/il/3a9dfd/3454214285/il_1588xN.3454214285_dttz.jpg',
        category='Pet Supplies',
        quantity=1,
        description=''
    )
    product7 = Product(
        name='1pc Magic Cat Scratching Board Foldable',
        price=32,
        image='https://i.etsystatic.com/46209589/r/il/2b18c4/5237056782/il_1588xN.5237056782_8iuc.jpg',
        category='Pet Supplies',
        quantity=99,
        description="🐱 Interactive toy with bell perfect for grinding claws details 11 1pc Magic Cat Scratching Board. Engaging & Mind-Stimulating: Designed to capture your cat's attention, this toy promotes mental and physical activity, catering to their natural instincts.",
    )
    product8 = Product(
        name='',
        price='',
        image='',
        category='',
        quantity=1,
        description=''
    )
    product9 = Product(
        name='',
        price='',
        image='',
        category='',
        quantity=1,
        description=''
    )
    product10 = Product(
        name='',
        price='',
        image='',
        category='',
        quantity=1,
        description=''
    )
    product11 = Product(
        name='',
        price='',
        image='',
        category='',
        quantity=1,
        description=''
    )
    product12 = Product(
        name='',
        price='',
        image='',
        category='',
        quantity=1,
        description=''
    )
    products = [product1, product2, product3, product4, product5, product6,
                product7, product8, product9, product10, product11, product12]

    for product in products:
        db.seesion.addd(product)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
