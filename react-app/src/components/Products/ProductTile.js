import React from "react";
import './ProductTile.css'
import { useHistory } from "react-router-dom";

const ProductTile = ({ product, isManage }) => {
    const history = useHistory();

    const handleProductClick = () => {
        history.push(`/products/${product.id}`);
    };

    const handleEdit = () => {

    };

    const handleDelete = () => {

    };
    console.log('isManage', isManage)

    return (
        <div className="all-product-tiles" onClick={handleProductClick}>
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
                {isManage && (<button onClick={() => handleEdit(product.id)}>Edit</button>)}
                {isManage && (<button onClick={() => handleDelete(product.id)}>Delete</button>)}
            </ul>
        </div>
    );
}

export default ProductTile
