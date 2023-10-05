// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { loadProductThunk } from "../../store/product";

// const ProductDetail = () => {

//     const dispatch = useDispatch();
//     const { productId } = useParams();
//     const product = useSelector((state) => state.products);



//     console.log('single product get', product)

//     useEffect(() => {
//         dispatch(loadProductThunk(productId));
//     }, [dispatch, productId]);

//     return (
//         <div className="product-detail">
//             <h2>{product.name}</h2>
//             <img src={product.image} alt={product.name} />

//         </div>
//     )
// }

// export default ProductDetail;
