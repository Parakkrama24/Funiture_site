import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Item.css';

const Item = ({ id, name, price, description, image, onCartUpdate }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [notification, setNotification] = useState(''); // Notification message state

    useEffect(() => {
        checkCartStatus();
    }, []);

    const checkCartStatus = async () => {
const Item = ({ id, name, price, description, image }) => {
    const [quantity, setQuantity] = useState(0); // State to manage quantity
    const [isAdded, setIsAdded] = useState(false); // State to toggle the visibility of the item counter
    const navigate = useNavigate();
    const [isQuantityChanged, setIsQuantityChanged] = useState(false);
    const [notification, setNotification] = useState(''); 

    // Function to handle adding item to cart
    const handleCartClick = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/cart/${id}`, {
                withCredentials: true
            });
            if (response.data && response.data.quantity > 0) {
                setIsAdded(true);
                setQuantity(response.data.quantity);
            }
        } catch (error) {
            console.error('Error checking cart status:', error);
        }
    };

    const addToCart = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/cart', {
                productId: id,
                quantity: quantity,
                price: price,
                name: name,
                image: image
            }, {
                withCredentials: true
            });

            if (response.status === 201) {
                setIsAdded(true);
                setNotification('Item added to cart successfully!');
                if (onCartUpdate) {
                    onCartUpdate(); // Update cart count in navbar
                }
                hideNotification();
                setIsAdded(true); // Mark the item as added to show the counter
                
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
        }
    };

    const updateCart = async () => {
        try {
            const response = await axios.put(`http://localhost:5000/api/cart/${id}`, {
                quantity: quantity
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setNotification('Cart updated successfully!');
                if (onCartUpdate) {
                    onCartUpdate();
                }
                hideNotification();
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleAddToCartButtonClick = () => {
        if (!isAdded) {
            addToCart();
        } else {
            updateCart();
        }
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1); // Adjust quantity locally
        setQuantity(quantity + 1);
        setIsQuantityChanged(true);
        setNotification(''); 
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity)); // Adjust quantity locally
        if (quantity > 1) { 
            setQuantity(quantity - 1);
            setIsQuantityChanged(true); 
            setNotification('');
        }
    };

    const hideNotification = () => {
        setTimeout(() => {
            setNotification('');
        }, 3000); // Hide notification after 3 seconds
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
                <div className='item-counter'>
                    <img 
                        onClick={decrementQuantity}
                        src={assets.minus_red}
                        alt="Decrease Quantity"
                    />
                    <p>{quantity}</p>
                    <img 
                        onClick={incrementQuantity}
                        src={assets.add_green}
                        alt="Increase Quantity"
                    />
                </div>
            </div>
            <div className="item-info">
                <p className='item-name'>{name}</p>
                <p className='item-desc'>{description}</p>
                <p className='item-price'>Rs. {price}</p>
                <button 
                    className='item-button' 
                    onClick={handleAddToCartButtonClick}
                >
                    {isAdded ? 'Update Cart' : 'Add to Cart'}
                </button>
                <button className='item-button' onClick={handleAddToCartButtonClick}>Add to Cart</button>
                {notification && (
                    <p className="notification" style={{ color: 'red', marginTop: '10px' }}>
                        {notification}
                    </p>
                )}
            </div>
            {notification && (
                <div className='notification'>
                    {notification}
                </div>
            )}
        </div>
    );
};

export default Item;
