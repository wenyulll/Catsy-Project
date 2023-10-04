from app.models import db, Product, environment, SCHEMA
from sqlalchemy.sql import text


def seed_products():

    product1 = Product(
        userId=1,
        name='Pet Portrait in Watercolor',
        price=45,
        image='https://i.etsystatic.com/41651278/r/il/776b8f/5332611733/il_1588xN.5332611733_cyqw.jpg',
        category='Pet Supplies',
        quantity=2,
        description='| MATERIAL | Water Color on Premium Cold Pressed Watercolor Paper 4 x 6'
    )

    product2 = Product(
        userId=1,
        name='Pet Ear with Name Necklace',
        price=23,
        image='https://i.etsystatic.com/42759861/r/il/233672/5128656218/il_1588xN.5128656218_e5al.jpg',
        category='Pet Supplies',
        quantity=5,
        description='Handmade item. Ships from a small business in California. Materials: Gold, Silver. Adjustable length.'
    )
    product3 = Product(
        userId=2,
        name='Book Cat Earrings, Avid Reader Gifts',
        price=23,
        image='https://i.etsystatic.com/26862916/r/il/bcf392/5351979595/il_1588xN.5351979595_gklp.jpg',
        category='Pet Supplies',
        quantity=10,
        description='Handmade item. Drop length: 1 7/8 Inches; Length: 1 1/8 Inches; Width: 3/4 Inches'
    )
    product4 = Product(
        userId=2,
        name='Pet Memorial Gift | Custom shaped pillow | Dog Pillow | Cat Pillow | Pet Lover Gift',
        price=28,
        image='https://i.etsystatic.com/25155098/r/il/50053d/4045930533/il_1588xN.4045930533_m0ga.jpg',
        category='Pet Supplies',
        quantity=10,
        description='This funny shaped pillow is designed as a perfect gift for birthday, anniversary, Christmas, and more memorable days.'
    )
    product5 = Product(
        userId=2,
        name='Small Standing stained glass cat suncatcher ornament',
        price=22,
        image='https://i.etsystatic.com/16813188/r/il/cd7ad8/2814450415/il_1588xN.2814450415_q57e.jpg',
        category='Pet Supplies',
        quantity=4,
        description='Stained glass cat suncatcher ornament, perfect for a window sill, desk, shelf or mantle. A great gift for a cat lover. They are about 3 inches wide and about 2.5 inches tall.'
    )
    product6 = Product(
        userId=2,
        name="The Cat Is On My Lap Socks, I Can't Get Up Right Now, Gift, Birthday, Christmas, Gift For Him, Cat Lover",
        price=9,
        image='https://i.etsystatic.com/9188500/r/il/3a9dfd/3454214285/il_1588xN.3454214285_dttz.jpg',
        category='Pet Supplies',
        quantity=1,
        description=''
    )
    product7 = Product(
        userId=2,
        name='1pc Magic Cat Scratching Board Foldable',
        price=32,
        image='https://i.etsystatic.com/46209589/r/il/2b18c4/5237056782/il_1588xN.5237056782_8iuc.jpg',
        category='Pet Supplies',
        quantity=99,
        description="🐱 Interactive toy with bell perfect for grinding claws details 11 1pc Magic Cat Scratching Board. Engaging & Mind-Stimulating: Designed to capture your cat's attention, this toy promotes mental and physical activity, catering to their natural instincts.",
    )
    product8 = Product(
        userId=1,
        name='Paw Print Bracelet, Dog Mom Jewelry, Dog Dad, Pet Parent Gift',
        price=7,
        image='https://i.etsystatic.com/11184134/r/il/9597f5/1153535452/il_1588xN.1153535452_9220.jpg',
        category='Jewelry',
        quantity=3,
        description='✧ This wish bracelet features a paw print charm on a waxed cotton cord ✧☆The legend of this bracelet:Make a wish before you put on the bracelet. Once it falls off, your wish is supposed to come true.☆',
    )
    product9 = Product(
        userId=1,
        name='Best Seller 925 Sterling Silver plt Cute Cat Kitty Adjustable Ring ',
        price=17,
        image='https://i.etsystatic.com/35652213/r/il/0edb1c/3865406546/il_1588xN.3865406546_4j3f.jpg',
        category='Jewelry',
        quantity=10,
        description="Ring Size: Adjustable end. High quality Designer Ring for Wedding, Valentine's day, Engagement, Mother's day and various occasions.",
    )
    product10 = Product(
        userId=1,
        name='Rose Gold Cat Necklace Personalized Cat Lover Gift for Her Cat Jewelry',
        price=45,
        image='https://i.etsystatic.com/6104294/r/il/944a7d/3330983737/il_1588xN.3330983737_5fta.jpg',
        category='Jewelry',
        quantity=9,
        description='Handmade item. Materials: Rose gold. Closure: Spring ring. Chain style: Cable. Adjustable length. Style: Minimalist. Can be personalized'
    )
    product11 = Product(
        userId=1,
        name='Black Cat Print Painting Art Prints Cat Art Wall Decor Cat Lover ',
        price=20,
        image='https://i.etsystatic.com/7352268/r/il/9f78d4/5163733609/il_1588xN.5163733609_c5dm.jpg',
        category='Home & Living',
        quantity=20,
        description='Sizes: 8x10 inches (20x25cm), 11x14 inches (28x35cm), 11x16 inches (29x42cm) A3.'
    )
    product12 = Product(
        userId=1,
        name='Black Cat Suncatcher Halloween Decoration, Halloween suncatcher gift, halloween sun catcher, black cat halloween',
        price=65,
        image='https://i.etsystatic.com/45844351/r/il/83b3a2/5317905478/il_1588xN.5317905478_3tbz.jpg',
        category='Home & Living',
        quantity=5,
        description='This Halloween, give your home a spooky and festive touch with the Black Cat Suncatcher Halloween Decoration. This unique suncatcher gift is a great way to celebrate the season and will bring some extra sparkle to your home.'
    )

    products = [product1, product2, product3, product4, product5, product6,
                product7, product8, product9, product10, product11, product12]

    for product in products:
        db.session.add(product)

    db.session.commit()


def undo_products():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM products"))

    db.session.commit()
