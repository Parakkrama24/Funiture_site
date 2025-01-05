import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import './Item.css';

const Item = ({ id, name, price, description, image, onCartUpdate }) => {
    const [quantity, setQuantity] = useState(1);
    const [isAdded, setIsAdded] = useState(false);
    const [currentCartQuantity, setCurrentCartQuantity] = useState(0);

    // Check if item is already in cart when component mounts
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
                setCurrentCartQuantity(response.data.quantity);
            }
        } catch (error) {
            console.error('Error checking cart status:', error);
        }
    };

    const addToCart = async (currentQuantity) => {
        try {
            const response = await axios.post('http://localhost:5000/api/cart', {
                productId: id,
                quantity: currentQuantity,
                price: price,
                name: name,
                image: image
            }, {
                withCredentials: true
            });

            if (response.status === 201) {
                setIsAdded(true);
                setCurrentCartQuantity(currentQuantity);
                if (onCartUpdate) {
                    onCartUpdate(); // Update cart count in navbar
                }
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const updateCart = async (newQuantity) => {
        try {
            const response = await axios.put(`http://localhost:5000/api/cart/${id}`, {
                quantity: newQuantity
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                setCurrentCartQuantity(newQuantity);
                if (onCartUpdate) {
                    onCartUpdate();
                }
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        }
    };

    const handleCartClick = () => {
        addToCart(quantity);
    };

    const incrementQuantity = async () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        if (isAdded) {
            await updateCart(newQuantity);
        }
    };

    const decrementQuantity = async () => {
        if (quantity > 1) {
            const newQuantity = quantity - 1;
            setQuantity(newQuantity);
            if (isAdded) {
                await updateCart(newQuantity);
            }
        }
    };

    const handleAddToCartButtonClick = () => {
        if (!isAdded) {
            addToCart(quantity);
        } else {
            updateCart(quantity);
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
                <button 
                    className='item-button' 
                    onClick={handleAddToCartButtonClick}
                >
                    {isAdded ? 'Update Cart' : 'Add to Cart'}
                </button>
            </div>
        </div>
    );
};

export default Item;