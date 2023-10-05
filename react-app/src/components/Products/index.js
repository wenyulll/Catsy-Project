import React, { useEffect, useState } from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { getReviews } from "../../store/reviews";
import { loadProductsThunk } from "../../store/product";
// import { loadProductThunk } from "../../store/product";
const Products = () => {
    const dispatch = useDispatch()
    // const history = useHistory();
    // const allProducts = []
    // const products = useSelector((state) => state.products.products);


    // Object.values(products)?.map(product => allProducts.push(product));

    // console.log("cxdvcvx", allProducts)
    useEffect(() => (
        dispatch(loadProductsThunk())
    ), [dispatch])
    // const handleProductsClick = (productId) => {
    //     history.push(`/posts/${productId}`);
    // };

    return (
        <div>
            HELOOOOOOOOO
        </div>
    )
}

export default Products;
