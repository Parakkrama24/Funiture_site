import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { assets } from '../../assets/assets';
import './Item.css';

const Item = ({ id, name, price, description, image }) => {
    const [quantity, setQuantity] = useState(0); // State to manage quantity
    const [isAdded, setIsAdded] = useState(false); // State to toggle the visibility of the item counter
    const navigate = useNavigate();
    const [isQuantityChanged, setIsQuantityChanged] = useState(false);
    const [notification, setNotification] = useState(''); 

    // Function to handle adding item to cart
    const handleCartClick = async () => {
        try {
            // Send POST request to add the item to the cart with the current quantity
            const response = await axios.post('http://localhost:5000/api/cart', {
                productId: id,
                quantity: quantity, 
                price: price,
                name: name,
                image:image
            }, {
                withCredentials: true  // Send cookies with the request
            });

            if (response.status === 201) {
                setIsAdded(true); // Mark the item as added to show the counter
                
            }
        } catch (error) {
            if (error.response) {
                console.error('Error response:', error.response);
            } else if (error.request) {
                console.error('Error request:', error.request);
            } else {
                console.error('Error message:', error.message);
            }
        }
    };

    const incrementQuantity = () => {
        setQuantity(quantity + 1);
        setIsQuantityChanged(true);
        setNotification(''); 
    };

    const decrementQuantity = () => {
        if (quantity > 1) { 
            setQuantity(quantity - 1);
            setIsQuantityChanged(true); 
            setNotification('');
        }
    };

    const handleAddToCartButtonClick = () => {
        if (isQuantityChanged && quantity >= 1) {
            navigate('/cart'); 
        } else {
            setNotification('Adjust the quantity before proceeding.');
        }
    };

    return (
        <div className='item'>
            <div className="item-img-container">
                <img className='item-img' src={image} alt={name} />

                {!isAdded ? (
                    <img
                        className='add'
                        onClick={handleCartClick} 
                        src={assets.add}
                        alt="Add to Cart"
                    />
                ) : (
                    <div className='item-counter'>
                        <img 
                            onClick={decrementQuantity} 
                            src={assets.minus_red} 
                            alt="Remove from Cart" 
                        />
                        <p>{quantity}</p>
                        <img 
                            onClick={incrementQuantity} 
                            src={assets.add_green} 
                            alt="Add to Cart" 
                        />
                    </div>
                )}
            </div>
            <div className="item-info">
                <p className='item-name'>{name}</p>
                <p className='item-desc'>{description}</p>
                <p className='item-price'>Rs. {price}</p>
                <button className='item-button' onClick={handleAddToCartButtonClick}>Add to Cart</button>
                {notification && (
                    <p className="notification" style={{ color: 'red', marginTop: '10px' }}>
                        {notification}
                    </p>
                )}
            </div>
        </div>
    );
};

export default Item;
