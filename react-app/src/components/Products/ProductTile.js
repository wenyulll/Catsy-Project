import React from "react";
import './ProductTile.css'


const ProductTile = ({ product }) => {

    return (
        <div className="all-product-tiles">
            <ul>
                <div className="product-tile-image-container">
                    <img src={product.image} alt={product.name} width="300" />
                </div>
                <div className="product-tile-text-container">
                    <div className="text-name">
                        {product.name}
                    </div>
                    <div className="text-name">
                        ${product.price}
                    </div>

                </div>
            </ul>
        </div>
    );
}

export default ProductTile
