import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductsThunk } from '../../store/search';
import { useHistory, useParams } from 'react-router-dom';
import ProductTile from '../Products/ProductTile';
import './searchResult.css'


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
            <div className="map-all-products">
                <ul>
                    {products && Object.values(products).map(product => (
                        <ProductTile key={product.id} product={product} isManage={false} />
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default SearchResults;
