import React from 'react';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'
import { deleteReviewThunk } from '../../store/review';
import { loadProductThunk } from '../../store/product'


function DeleteReviewModal({ reviewId, productId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteReview = async (e) => {
        e.preventDefault();
        const deletedReview = await dispatch(deleteReviewThunk(reviewId));
        console.log('deletedReview', deletedReview);
        if (deletedReview) {
            // await dispatch(loadProductThunk(productId));
            closeModal();
        }
    };

    return (
        <div className='delete-modal'>
            <h2>Confirm Delete</h2>
            <h4>Are you sure you want to delete this review?</h4>
            <span className='button-container'>
                <button id='delete-review-yes' onClick={deleteReview}>Yes (Delete Review)</button>
                <button id='delete-review-no' onClick={closeModal}>No (Keep Review)</button>
            </span>
        </div>
    );
};

export default DeleteReviewModal;