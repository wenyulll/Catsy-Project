import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductsThunk } from '../../store/search';
import { useHistory, useParams } from 'react-router-dom';
import ProductTile from '../Products/ProductTile';


const SearchResults = () => {
    const { searchItem } = useParams();
    const dispatch = useDispatch();
    const history = useHistory();

    const products = useSelector(state => state.search.products);

    useEffect(() => {


    }, [dispatch, searchItem]);

    const handleProductClick = (productId) => {

        history.push(`/products/${productId}`);
    };

    return (
        <div>
            {products && products.map(product => (


                <ProductTile
                    key={product.id}
                    product={product}
                    onClick={() => handleProductClick(product.id)}
                />
            ))}
        </div>
    );
}

export default SearchResults;
