import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createReviewThunk } from "../../store/review";
import { loadProductThunk } from "../../store/product";
import ReviewRating from "./ReviewRating"
import './CreateReviewModal.css'

function CreateReviewModal({ productReview, className }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [stars, setStars] = useState(productReview.stars);
    const [review, setReview] = useState(productReview.review);
    const [errors, setErrors] = useState({});


    const onChange = (number) => {
        setStars(parseInt(number));
    }; //处理星星评级，接收一个参数

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});


        if (stars < 1) {
            setErrors(prevErrors => ({ ...prevErrors, 'stars': 'Please give a star rating' }));
            return;
        }

        if (review.length < 10) {
            setErrors(prevErrors => ({ ...prevErrors, 'review': 'Review text must be at least 10 characters long' }));
            return;
        } else if (review.length > 100) {
            setErrors(prevErrors => ({ ...prevErrors, 'review': 'Review text must be no more than 100 characters long' }));
            return;
        }



        const newReview = await dispatch(createReviewThunk({ ...productReview, stars, review }))
        if (newReview) {
            if (newReview.errors) {
                setErrors(newReview.errors);
            } else {
                closeModal()
                // await dispatch(loadProductThunk(productId), [dispatch])
                //     .then(closeModal)
            }
        }
    };

    return (
        <div className="create-modal-container">
            <div className={className}>
                <h2>How was your purchase?</h2>
                <div className='errors'>{errors.review}</div>
                <div className='reviewTextArea'>
                    <textarea
                        className='review-text-input'
                        value={review}
                        onChange={(e) => {
                            setReview(e.target.value)
                        }}
                        placeholder="Leave your review here..."
                    />
                </div>
                <div className='review-stars'>
                    <ReviewRating stars={stars} disabled={false} onChange={onChange} />
                </div>
                <div className='errors'>{errors.stars}</div>
                <button id='enabled-submit-review-button' onClick={handleSubmit}>Submit Your Review</button>
                {/* <button id={(stars < 1 || review.length < 10) ? 'disabled-submit-review-button' : 'enabled-submit-review-button'} disabled={stars < 1 || review.length < 10} onClick={handleSubmit}>Submit Your Review</button> */}
            </div>
        </div>
    )
}

export default CreateReviewModal;