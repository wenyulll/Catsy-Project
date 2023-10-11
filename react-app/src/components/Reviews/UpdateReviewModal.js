import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal'
import { updateReviewThunk } from '../../store/review';
import { loadProductThunk } from '../../store/product'
import ReviewRating from './ReviewRating';
import './UpdateReviewModal.css'

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

        if (stars < 1) {
            setErrors({ ...errors, 'stars': 'Please give a star rating' });
            return;
        }
        if (review.length < 10) {
            setErrors({ ...errors, 'review': 'Review text must be more than 10 letters' });
            return;
        }

        const updatedReview = await dispatch(updateReviewThunk({ ...productReview, stars, review }))
        if (updatedReview) {
            if (updatedReview.errors) {
                setErrors(updatedReview.errors);
                console.log('updatedReview.errors', updatedReview.errors)
            } else {
                await dispatch(loadProductThunk(productReview.productId), [dispatch])
                    .then(closeModal)
            }
        }
    };

    return (
        <div className={className}>
            <h2>Update your review</h2>
            {errors.review && (<div className='errors'>{errors.review}</div>)}
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
            {errors.stars && (<div className='errors'>{errors.stars}</div>)}
            <button id='enabled-update-review-button' onClick={handleSubmit}>Update Your Review</button>
            {/* <button id={(stars < 1 || review.length < 10) ? 'disabled-update-review-button' : 'enabled-update-review-button'} disabled={stars < 1 || review.length < 10} onClick={handleSubmit}>Update Your Review</button> */}
        </div>
    )
}

export default UpdateReviewModal;
