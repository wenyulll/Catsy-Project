export const LOAD_PRODUCTS = 'products/LOAD_PRODUCTS'
export const LOAD_PRODUCT = 'products/LOAD_PRODUCT'
export const CREATE_PRODUCT = 'products/CREATE_PRODUCT'
export const UPDATE_PRODUCT = 'products/UPDATE_PRODUCT'
export const DELETE_PRODUCT = 'products/DELETE_PRODUCT'

//action creators
// load all products
export const loadProducts = (products) => ({
    type: LOAD_PRODUCTS,
    payload: products,
});

//load a single product
export const loadProduct = (product) => ({
    type: LOAD_PRODUCT,
    payload: product,
});

//create a new product
export const createProduct = (product) => ({
    type: CREATE_PRODUCT,
    payload: product,
});

//update an existing product
export const updateProduct = (product) => ({
    type: UPDATE_PRODUCT,
    payload: product,
});

// delete a product
export const deleteProduct = (productId) => ({
    type: DELETE_PRODUCT,
    payload: productId,
});


// Thunk to load all products
export const loadProductsThunk = () => async (dispatch) => {
    try {
        const response = await fetch('/api/products');

        const data = await response.json();

        console.log("kjkjkjkjkj", data);
        dispatch(loadProducts(data));
        console.log(dispatch(loadProducts(data)))
    } catch (error) {
        console.error(error);
    }
};

//Thunk to load single product
export const loadProductThunk = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        console.log("singgggggle product", data)
        dispatch(loadProduct(data));
    } catch (error) {
        console.error(error);
    }
};




const initialState = { products: [] };

const productsReducer = (state = initialState, action) => {
    let newState
    switch (action.type) {

        case LOAD_PRODUCTS:
            newState = { ...state };
            newState.products = action.payload;
            return newState;

        case LOAD_PRODUCT:
            newState = { ...state };
            newState.products = action.payload;
            return newState;


        default:
            return state;
    }
};

export default productsReducer;