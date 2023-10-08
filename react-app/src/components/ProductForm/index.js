import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createProductThunk } from "../../store/product";
import { updateProductThunk } from "../../store/product";
import './productForm.css'
const ProductForm = ({ product, formType }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const [name, setName] = useState(product?.name || '');
    const [price, setPrice] = useState(product?.price || '');
    const [image, setImage] = useState(product?.image || '');
    const [category, setCategory] = useState(product?.category || '');
    const [description, setDescription] = useState(product?.description || '');
    const [quantity, setQuantity] = useState(product?.quantity || '');
    const [errors, setErrors] = useState({});

    // const products = useSelector((state) => state.products.products);
    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        let resErrors = {}

        const formData = {
            // ...formData,
            name,
            price,
            image,
            category,
            description,
            quantity,
            // userId: sessionUser.id ?
        };

        if (name.length < 4 || name.length > 100) {
            resErrors.name = "Name must be between 4 and 100 characters";
        }

        if (description.length < 20 || description.length > 1000) {
            resErrors.description = "Description must be between 20 and 1000 characters";
        }

        if (quantity < 1 || quantity > 99) {
            resErrors.quantity = "Quantity must be between 1 and 99";
        }

        if (Object.values(resErrors).length > 0) {
            setErrors(resErrors);
            return;
        } else {
            if (formType === 'Create') {
                const newProduct = await dispatch(createProductThunk(formData));

                product = newProduct;
                if (newProduct && newProduct.id) {
                    history.push(`/products/${product.id}`);
                }
            }

        }

    };

    return (
        <form className='product-form' onSubmit={handleSubmit}>

            <div className='product-form-div'>

                <div className='product-form-name'>
                    <label>Product Name</label>
                    {errors.name && <span className='errors errors-above'>{errors.name}</span>}
                    <input
                        className='form-inputs name-input'
                        type='text'
                        required
                        placeholder='Product Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className='product-form-description'>
                    <label>Description</label>
                    {errors.description && <span className='errors errors-above'>{errors.description}</span>}
                    <textarea
                        className='form-textarea'
                        required
                        placeholder='Describe your product'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <div className='product-form-price'>
                    <label>Price</label>
                    {errors.price && <span className='errors errors-above'>{errors.price}</span>}
                    <div className='price-input-div'>
                        $
                        <input
                            className='form-inputs price-input'
                            type='number'
                            required
                            placeholder='Price (USD)'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </div>
                </div>
            </div>
            <div className='product-form-quantity'>
                <label>Quantity</label>
                {errors.quantity && <span className='errors errors-above'>{errors.quantity}</span>}
                <input
                    className='form-inputs quantity-input'
                    type='number'
                    required
                    placeholder='Quantity'
                    value={quantity}
                    min="1"
                    max="99"
                    onChange={(e) => setQuantity(e.target.value)}
                />
            </div>

            <div className='product-form-images-div'>
                <h3>Product Images</h3>
                {errors.mainImage && <div className='errors errors-photos'>{errors.image}</div>}
                <p>Add images to showcase your product.</p>
                <input
                    type='url'
                    required
                    className='form-inputs form-images'
                    placeholder='Main Image URL'
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                />
            </div>

            <div className='product-form-category'>
                <label>Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} required>
                    <option value="">Select a category</option>
                    <option value="Art & Collectible">Art & Collectible</option>
                    <option value="Craft Supplies & Tools">Craft Supplies & Tools</option>
                    <option value="Jewelry">Jewelry</option>
                    <option value="Pet Supplies">Pet Supplies</option>
                    <option value="Home & Living">Home & Living</option>
                </select>
            </div>

            <button id='create-form-submit-button' type='submit'>{formType} Product</button>
        </form>
    );

}

export default ProductForm;
