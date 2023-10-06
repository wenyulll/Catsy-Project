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

        // console.log("kjkjkjkjkj", data);
        dispatch(loadProducts(data));
        // console.log(dispatch(loadProducts(data)))
    } catch (error) {
        console.error(error);
    }
};

//Thunk to load single product
export const loadProductThunk = (productId) => async (dispatch) => {
    try {
        const response = await fetch(`/api/products/${productId}`);
        const data = await response.json();

        // console.log("singgggggle product", data)
        dispatch(loadProduct(data));
    } catch (error) {
        console.error(error);
    }
};

// Thunk to create a new product
export const createProductThunk = productData => async dispatch => {
    try {
        const response = await fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(createProduct(data));
        }
    } catch (error) {
        console.error(error);
    }
};

// Thunk to update a product
export const updateProductThunk = productData => async dispatch => {
    try {
        const response = await fetch(`/api/products/${productData.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productData),
        });

        if (response.ok) {
            const data = await response.json();
            dispatch(updateProduct(data));
        }
    } catch (error) {
        console.error(error);
    }
};

// Thunk to delete a product
export const deleteProductThunk = productId => async dispatch => {
    try {
        const response = await fetch(`/api/products/${productId}`, { method: 'DELETE' });

        if (response.ok) {
            dispatch(deleteProduct(productId));
        }
    } catch (error) {
        console.error(error);
    }
};

const initialState = { products: {} };

const productsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS:
            const newState = { ...state, products: { ...state.products } }
            action.payload.forEach(el => {
                newState.products[el.id] = el
            });
            return newState;
        case LOAD_PRODUCT:
            // return { ...state, products: { [action.payload.id]: action.product } };

            return { ...state, products: { ...state.products, [action.payload.id]: action.payload } };

        case CREATE_PRODUCT:
            return { ...state, products: { ...state.products, [action.product.id]: action.product } };
        case UPDATE_PRODUCT:
            return { ...state, products: { ...state.products, [action.product.id]: action.product } };
        case DELETE_PRODUCT:
            const updatedProducts = { ...state.products };
            delete updatedProducts[action.productId];
            return { ...state, products: updatedProducts };
        default:
            return state;
    }
};


export default productsReducer;