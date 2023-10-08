import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadProductThunk } from "../../store/product";
import './ProductDetail.css';

const ProductDetail = () => {

    const dispatch = useDispatch();
    const { productId } = useParams();
    // const product = useSelector((state) => state.products.products);

    const product = useSelector((state) => state.products.products[productId]);

    // console.log('njkjkjkjkjkjkjjjjjjjjj', product)

    useEffect(() => {
        dispatch(loadProductThunk(productId));
    }, [dispatch, productId]);

    if (!product) {
        return "404 NO PRODUCT FOUND!!";
    }

    const handleAddToCart = () => {
        console.log(`${product.name} added to cart!`);
    };
    return (
        <div className="product-detail">
            <div className="product-detail-left-container">
                <h2>{product.name}</h2>
                <img src={product.image} alt={product.name} />
            </div>
            <div className="product-detail-right-container">
                <p>Price: ${product.price}</p>
                <p>Category: {product.category}</p>

                <p>Quantity: {product.quantity}</p>
                <p>Owner: {product.userId}</p>
                <p>Description: {product.description}</p>
                <button onClick={handleAddToCart}>Add to Cart</button>
            </div>


        </div>
    )
}

export default ProductDetail;
