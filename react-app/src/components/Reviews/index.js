import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReviewIndexItem from './ReviewsIndexItem';
import CreateReviewModal from './CreateReviewModal'
import OpenModalButton from '../OpenModalButton';
import { fetchReviewsThunk } from '../../store/review'


const ReviewIndex = ({ product }) => {
    const productId = product.id
    const dispatch = useDispatch();

    // const reviews = Object.values(
    //     useSelector((state) => (state.reviews?.product ? state.reviews.product : []))
    // ).sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    const reviews = useSelector((state) => (state.reviews.reviews))
    let productReviews = null;
    let avgStarRating = null;
    if (reviews) {
        productReviews = Object.values(reviews).filter(el => el.productId === productId)
        productReviews = productReviews.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        avgStarRating = 0
        productReviews.forEach(el => avgStarRating += el.rating);
        avgStarRating /= productReviews.length;
    }

    const sessionUser = useSelector((state) => state.session.user);

    const productReview = {
        productId,
        review: '',
        stars: 0,
    };
    // console.log("productId", productId)
    // console.log("sessionUser.id", sessionUser.id)
    // console.log("product.userId", product.userId)
    // console.log("reviews", reviews)

    let SubmitProductReviewButton;

    if (sessionUser && productReviews) {
        if (sessionUser.id !== product.userId && !(productReviews.find(review => review.userId === sessionUser.id))) {
            SubmitProductReviewButton = (
                <OpenModalButton
                    buttonText='Submit Your Review'
                    modalComponent={<CreateReviewModal className='review-modal' productReview={productReview} />}
                />
            );
        }
    }

    useEffect(() => {
        dispatch(fetchReviewsThunk(productId));
    }, [dispatch, productId]);

    // console.log("productReviews", productReviews)
    return (
        <div className='product-reviews-index'>
            <div className='reviews-header'>
                <h3>
                    <i className='fa fa-star' /> {(productReviews.length) > 0 ? productReviews.length === 1 ? `${Number(avgStarRating).toFixed(1)} · ${productReviews.length} review` : `${Number(avgStarRating).toFixed(1)} · ${productReviews.length} reviews` : SubmitProductReviewButton ? 'Be the first to post the review!' : 'No review yet'}
                    {/* <i className='fa fa-star' />  {(productReviews.length) > 0 ? productReviews.length === 1 ? `${productReviews.length} review` : `${productReviews.length} reviews` : SubmitProductReviewButton ? 'Be the first to post the review!' : 'No review yet'} */}

                </h3>
            </div>
            {sessionUser && SubmitProductReviewButton}
            {sessionUser && SubmitProductReviewButton && reviews.length === 0 && (
                <h3>Be the first to post a review!</h3>
            )}
            <div className='reviews-container'>
                <ul className='reviews-list'>

                    {productReviews && productReviews.map((review) => (
                        <ul className='product-review-item' key={review.id}>
                            <ReviewIndexItem review={review} productId={productId} />
                        </ul>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ReviewIndex;
