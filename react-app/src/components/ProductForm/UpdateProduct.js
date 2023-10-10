import React from 'react';
import ProductForm from '.';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadProductThunk } from '../../store/product';

const UpdateForm = () => {
    const dispatch = useDispatch();
    const { productId } = useParams();
    const products = useSelector((state) => state.products.products)

    useEffect(() => {
        dispatch(loadProductThunk(productId))
    }, [dispatch, productId])

    if (!products[productId]) return null;
    return (
        <div>
            <ProductForm formType="Update" product={products[productId]} />
        </div>
    );
}

export default UpdateForm;




