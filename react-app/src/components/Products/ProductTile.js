import React, { useState } from "react";
import './ProductTile.css'
import { useHistory } from "react-router-dom";
import DeleteProductModal from "../DeleteProductModal";
import OpenModalButton from "../OpenModalButton";
const ProductTile = ({ product, isManage }) => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true);


    // Function to handle image load
    const handleImageLoad = () => {
        setIsLoading(false);
    };

    const handleProductClick = (e) => {
        e.preventDefault();
        history.push(`/products/${product.id}`);
    };

    const handleEdit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/products/update/${product.id}/`)
    };

    const handleDelete = (e) => {
        e.preventDefault();
        e.stopPropagation();

    };
    // console.log('isManage', isManage)

    return (
        <div className="all-product-tiles" onClick={handleProductClick}>
            <ul className="all-product-tiles-ul">
                <div className="product-tile-image-container">
                    {isLoading && <p>Loading...</p>}
                    <img src={product.image} alt={product.name} width="300" onLoad={handleImageLoad} />
                </div>
                <div className="product-tile-text-container">
                    <div className="text-name">
                        {product.name}
                    </div>
                    <div className="text-price">
                        ${product.price}
                    </div>

                </div>
                <div className="edit-delete-button-container">
                    {isManage && (
                        <>
                            <button className="edit-button" onClick={handleEdit}>Edit</button>
                            {/* <span className='open-modal-button' onClick={handleDelete}> */}
                            <OpenModalButton
                                buttonText='Delete'
                                className="delete-button open-modal-button"
                                onClick={handleDelete}
                                modalComponent={<DeleteProductModal productId={product.id} />}
                            />
                            {/* </span> */}
                        </>
                    )}
                </div>
            </ul>
        </div>
    );
}

export default ProductTile
