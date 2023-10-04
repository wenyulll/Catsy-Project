from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SubmitField
from wtforms.validators import DataRequired, ValidationError


class ReviewForm(FlaskForm):
    rating = IntegerField('rating', validators=[DataRequired()])
    review = StringField('review', validators=[DataRequired()])
    submit = SubmitField('submit')
