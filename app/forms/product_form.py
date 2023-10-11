from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField, FileField, SubmitField
from wtforms.validators import DataRequired, Email, ValidationError
from flask_wtf.file import FileAllowed, FileRequired, FileField
from api.aws_helpers import ALLOWED_EXTENSIONS

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

categories = [
    "Art & Collectible", "Craft Supplies & Tools",
    "Home & Living", "Jewelry", "Pet Supplies"
]


class ProductForm(FlaskForm):

    name = StringField('name', validators=[DataRequired()])
    price = IntegerField('price', validators=[DataRequired()])
    image = StringField('image', validators=[DataRequired()])
    imageaws = FileField("Image File", validators=[
        FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    category = SelectField('category', choices=categories)
    description = TextAreaField('description', validators=[DataRequired()])
    quantity = IntegerField('quantity', validators=[DataRequired()])
    # userId = IntegerField('userId', validators=[DataRequired()])
    submit = SubmitField("Submit")
