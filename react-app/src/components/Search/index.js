import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProductsThunk } from '../../store/search';
import { useHistory } from 'react-router-dom';

const SearchBar = () => {
    const [searchItem, setSearchItem] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const products = useSelector(state => state.search.products);

    const handleSearch = (e) => {
        e.preventDefault();

        dispatch(searchProductsThunk(searchItem));
        history.push(`/search/${searchItem}`);
    };

    const handleProductClick = (productId) => {


        history.push(`/product/${productId}`);
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <i className="fa-solid fa-magnifying-glass" style={{ color: "rgb(165, 165, 165)" }}></i>
                <input
                    id='search-input'
                    type="text"
                    value={searchItem}
                    onChange={(e) => setSearchItem(e.target.value)}
                    placeholder="Search Products or Category"
                />
            </form>
        </div>
    );
};

export default SearchBar;
