import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal'
import { updateReviewThunk } from '../../store/review';
import { loadProductThunk } from '../../store/product'
import ReviewRating from './ReviewRating';

function UpdateReviewModal({ productReview, className }) {
    const user = useSelector((state) => state.session.user);
    const reviewId = productReview.id;
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [stars, setStars] = useState(productReview.rating);
    const [review, setReview] = useState(productReview.review);
    const [errors, setErrors] = useState({});

    const onChange = (number) => {
        setStars(parseInt(number));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        const updatedReview = await dispatch(updateReviewThunk({ ...productReview, stars, review }))
        if (updatedReview) {
            if (updatedReview.errors) {
                setErrors(updatedReview.errors);
            } else {
                await dispatch(loadProductThunk(productReview.productId), [dispatch])
                    .then(closeModal)
            }
        }
    };

    return (
        <div className={className}>
            <h2>Update your review</h2>
            <div className='errors'>{errors.review}</div>
            <div className='reviewTextArea'>
                <textarea
                    className='review-text-input'
                    value={review}
                    onChange={(e) => {
                        setReview(e.target.value)
                    }}
                    placeholder="Update your review here..."
                />
            </div>
            <div className='review-stars'>
                <ReviewRating stars={stars} disabled={false} onChange={onChange} />
            </div>
            <div className='errors'>{errors.stars}</div>
            <button id={(stars < 1 || review.length < 10) ? 'disabled-update-review-button' : 'enabled-update-review-button'} disabled={stars < 1 || review.length < 10} onClick={handleSubmit}>Update Your Review</button>
        </div>
    )
}

export default UpdateReviewModal;
