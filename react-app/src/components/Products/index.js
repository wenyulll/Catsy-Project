import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { loadProductsThunk } from "../../store/product";
import ProductTile from "./ProductTile";
import "./index.css"
import Welcomelogo from '../Products/Welcomelogo.png'
const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.products);
    const user = useSelector((state) => state.session.user);

    // console.log("jksjfkjsk", products)
    useEffect(() => {
        dispatch(loadProductsThunk());
    }, [dispatch]);

    return (
        <div>
            <div className="welcome-message">
                {user && <h2>Welcome back, <span className="underline-text">{user.username}</span>!</h2>}
                {/* <img alt='logo' className='Welcomelogo' src={Welcomelogo} /> */}
            </div>

            <div className="welecome-banner">
                <div className="eek-text">Eek! Almost gone!</div>
                <div className='Halloween'>Halloween picks up to 30% OFF</div>
                <div className='participating'>Participating Shops only.Terms apply</div>
            </div>

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

export default Products;
