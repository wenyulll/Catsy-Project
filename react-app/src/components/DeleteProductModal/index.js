import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteProductThunk } from "../../store/product";
import './index.css';

function DeleteProductModal({ productId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const deleteProduct = (e) => {
        e.preventDefault();
        return dispatch(deleteProductThunk(productId))
            .then(closeModal)
    };

    return (
        <div className='delete-modal'>
            <h2>Confirm Delete</h2>
            <h4>Are you sure you want to remove this product from the listings?</h4>
            <span className="button-container">
                <button id='yes' onClick={deleteProduct}>Yes (Delete Product)</button>
                <button id='no' onClick={closeModal}>No (Keep Product)</button>
            </span>
        </div>
    );
};

export default DeleteProductModal;
