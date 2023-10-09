import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import ProductTile from '../Products/ProductTile';
import { loadProductsThunk } from "../../store/product";

const StoreManager = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const allProducts = useSelector((state) => state.products.products);
    const sessionUser = useSelector((state) => state.session.user);
    let userProducts = null;

    if (allProducts) {
        userProducts = Object.values(allProducts).filter(product => product.userId === sessionUser.id)
    }

    useEffect(() => {
        dispatch(loadProductsThunk());
    }, [dispatch]);

    return (
        <div>
            {userProducts && userProducts.map(product => (
                <div key={product.id}>
                    <ProductTile product={product} isManage={true} />
                </div>
            ))}
        </div>
    );
}

export default StoreManager;
