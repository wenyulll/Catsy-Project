import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { loadProductThunk } from "../../store/product";
import './ProductDetail.css';
import ReviewIndex from "../Reviews";
import ReviewRating from "../Reviews/ReviewRating"

const ProductDetail = () => {

    const dispatch = useDispatch();
    const { productId } = useParams();
    // const product = useSelector((state) => state.products.products);

    const product = useSelector((state) => state.products.products[productId]);

    useEffect(() => {
        dispatch(loadProductThunk(productId));
    }, [dispatch, productId]);

    if (!product) {
        return "404 NO PRODUCT FOUND!!";
    }

    const handleAddToCart = () => {
        console.log(`${product.name} added to cart!`);
    };

    console.log('product.userId', product.userId)
    return (
        <>
            <div className="product-detail">
                <div className="product-detail-left-container">
                    <div className="product-name-image">
                        <h2>{product.name}</h2>
                        <img src={product.image} alt={product.name} />
                    </div>
                    <div className="product-review">
                        {product && (<ReviewIndex product={product} />)}
                    </div>
                </div>
                <div className="product-detail-right-container">
                    <div className="product-price">${product.price}</div>
                    <div className="product-category">{product.category}</div>
                    <div className="product-quantity">Quantity: {product.quantity}</div>
                    <div className="product-description">Details:{product.description}</div>
                    <button className="add-to-cart-button" onClick={handleAddToCart}>Add to Cart</button>
                    <div className="product-owners">
                        <div className="meet-your-sellers"> Meet your sellers </div>
                        <div className="owner-name">{product.userId}</div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductDetail;
