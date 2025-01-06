import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : prevQuantity)); // Adjust quantity locally
    };

    const hideNotification = () => {
        setTimeout(() => {
            setNotification('');
        }, 3000); // Hide notification after 3 seconds
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