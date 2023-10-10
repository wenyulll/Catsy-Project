import React from 'react';
import ProductForm from '.';

const CreateForm = () => {
    let product = {}
    return (
        <div>
            <h2>Create New Product</h2>
            <ProductForm formType="Create" product={product} />

        </div>
    );
}

export default CreateForm;
