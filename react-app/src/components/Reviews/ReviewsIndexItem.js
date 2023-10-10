import React from 'react';
import { useSelector } from 'react-redux';
import DeleteReviewModal from './DeleteReviewModal';
import UpdateReviewModal from './UpdateReviewModal';
import OpenModalButton from '../OpenModalButton';

function ReviewIndexItem({ review }) {
    const productId = review.productId;
    const sessionUser = useSelector((state) => state.session.user);

    const createdAtDate = new Date(review.createdAt);
    const month = createdAtDate.toLocaleString('en', { month: 'long' });
    const year = createdAtDate.getFullYear();
    const rating_arr = Array(review.rating).fill(0);

    let deleteReviewButton;
    if (sessionUser && sessionUser.id === review.userId) {
        deleteReviewButton = (
            <OpenModalButton
                className='modal-dialog'
                buttonText='Delete'
                modalComponent={<DeleteReviewModal className='delete-modal' reviewId={review.id} productId={productId} />}
            />
        );
    }

    let updateReviewButton;
    if (sessionUser && sessionUser.id === review.userId) {
        updateReviewButton = (
            <OpenModalButton
                className='modal-dialog'
                buttonText='Update'
                modalComponent={
                    <UpdateReviewModal
                        className='update-modal'
                        productReview={review}
                    />
                }
            />
        );
    }

    return (
        <div className='reviewIndexItemContainer'>
            <div className='reviewIndexItem-name'>{review.username}</div>
            <div className='reviewIndexItem-date'>{month} {year}</div>
            <div className='reviewIndexItem-star'>{rating_arr.map(() => (<i className='fa fa-star'></i>))}</div>
            <div className='reviewIndexItem-text'>
                {review.review}
            </div>
            <div className='delete-update-buttons-container'>
                {sessionUser && deleteReviewButton}
                {sessionUser && updateReviewButton}
            </div>
        </div>
    )
}

export default ReviewIndexItem;
