import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsThunk } from "../../store/product";
import ProductTile from "./ProductTile";
import "./index.css"

const Products = () => {
    const dispatch = useDispatch();

    const products = useSelector((state) => state.products.products);

    console.log("jksjfkjsk", products)
    useEffect(() => {
        dispatch(loadProductsThunk());
    }, [dispatch]);

    return (
        <div>
            <h1>Product List</h1>
            <div className="map-all-products">
                <ul>
                    {products && Object.values(products).map(product => (
                        <ProductTile key={product.id} product={product} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Products;
