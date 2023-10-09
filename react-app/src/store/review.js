export const LOAD_REVIEWS = 'reviews/LOAD_REVIEWS';
export const LOAD_REVIEW = 'reviews/LOAD_REVIEW';
export const CREATE_REVIEW = 'reviews/CREATE_REVIEW';
export const DELETE_REVIEW = 'reviews/DELETE_REVIEW';
export const UPDATE_REVIEW = 'reviews/UPDATE_REVIEW';

export const loadReviews = (reviews) => ({
    type: LOAD_REVIEWS,
    payload: reviews,
});

export const loadReview = (review) => ({
    type: LOAD_REVIEW,
    payload: review,
});

export const createReview = (review) => ({
    type: CREATE_REVIEW,
    payload: review,
});

export const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    payload: reviewId,
});

export const updateReview = (review) => ({
    type: UPDATE_REVIEW,
    payload: review,
});


/***** REVIEW THUNKS *****/

export const fetchReviewsThunk = () => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/reviews`);

        if (response.ok) {
            const reviews = await response.json();
            dispatch(loadReviewsAction(reviews));
        };
    } catch (error) {
        console.error(error);
    }
};



export const fetchSingleReviewThunk = (reviewId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/reviews/${reviewId}`);

        if (response.ok) {
            const review = await response.json();
            dispatch(loadSingleReviewAction(review));
        } else {
            console.error('Failed to fetch the review:', response.statusText);
        }
    } catch (error) {
        console.error(error);
    }
};

export const createReviewThunk = (reviewData) => async (dispatch) => {
    try {
        const { rating, review } = reviewData;

        const response = await csrfFetch(`/api/reviews/new`, {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rating,
                review
            })
        });

        if (response.ok) {
            const newReview = await response.json();
            dispatch(createReviewAction(newReview));
            return newReview;
        }
    } catch (e) {
        console.error("Error creating review:", e);
    }
}

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    try {
        const response = await csrfFetch(`/api/reviews/delete/${reviewId}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            dispatch(deleteReviewAction(reviewId));
        }
    } catch (e) {
        console.error("Error deleting review:", e);
    }
}

export const updateReviewThunk = (reviewData) => async (dispatch) => {
    try {
        const { id, rating, review } = reviewData;

        const response = await csrfFetch(`/api/reviews/update/${id}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                rating,
                review
            })
        });

        if (response.ok) {
            const updatedReview = await response.json();
            dispatch(updateReviewAction(updatedReview));
            return updatedReview;
        }
    } catch (e) {
        console.error("Error updating review:", e);
    }
}


const initialState = { reviews: {} };

const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_REVIEWS:
            const newState = { ...state, reviews: {} };
            action.payload.forEach((review) => {
                newState.reviews[review.id] = review;
            });
            return newState;
        case LOAD_REVIEW:
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.payload.id]: action.payload
                }
            };
        case CREATE_REVIEW:
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.payload.id]: action.payload
                }
            };
        case DELETE_REVIEW:
            const updatedReviews = { ...state.reviews };
            delete updatedReviews[action.payload];
            return { ...state, reviews: updatedReviews };
        case UPDATE_REVIEW:
            return {
                ...state,
                reviews: {
                    ...state.reviews,
                    [action.payload.id]: action.payload
                }
            };
        default:
            return state;
    };
};



export default reviewsReducer;