import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const ProductForm = ({ product, formType, formTile }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    // React state for form data
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            name,
            price: Number(price), // ensure price is a number
            image,
            category,
            description,
            quantity: Number(quantity),
            // userId: ... you can set userId here if needed
        };

        // Make an API call here to save the product data
        // For example, using the 'fetch' function:

        const response = await fetch('/api/path-to-your-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            // handle successful form submission
            // for instance, navigate to another page
            history.push('/path-after-success');
        } else {
            // Handle errors, maybe update the state with an error message
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" required />
                <input type="number" value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" required />
                <input value={image} onChange={e => setImage(e.target.value)} placeholder="Image URL" required />
                <select value={category} onChange={e => setCategory(e.target.value)} required>
                    <option value="">-- Select a category --</option>
                    {["Art & Collectible", "Craft Supplies & Tools", "Home & Living", "Jewelry", "Pet Supplies"].map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required></textarea>
                <input type="number" value={quantity} onChange={e => setQuantity(e.target.value)} placeholder="Quantity" required />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ProductForm;
