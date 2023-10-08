import React from 'react';
import ProductForm from './index';

const UpdateForm = () => {
    let product = {}
    return (
        <div>
            <ProductForm formType="Update" product={product} />
        </div>
    );
}

export default UpdateForm;
