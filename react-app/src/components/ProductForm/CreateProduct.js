import React from 'react';
import ProductForm from '.';
import './CreateProduct.css';

const CreateForm = () => {
    let product = {}
    return (
        <div className='create-new-product-page'>
            <h2>Create New Product</h2>
            <ProductForm formType="Create" product={product} />

        </div>
    );
}

export default CreateForm;
