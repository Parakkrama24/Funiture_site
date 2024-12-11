import React, { useContext } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext'
import './Item.css'

const Item = ({ id, name, price, description, image }) => {

    const { cartItems, addToCart, removeFromCart } = useContext(StoreContext)


    return (
        <div className='item'>
            <div className="item-img-container">
                <img className='item-img' src={image} alt="" />
                {!cartItems[id]
                    ? <img className='add' onClick={() => addToCart(id)} src={assets.add} alt="" />
                    : <div className='item-counter'>
                        <img onClick={() => removeFromCart(id)} src={assets.minus_red} alt="" />
                        <p>{cartItems[id]}</p>
                        <img onClick={() => addToCart(id)} src={assets.add_green} alt="" />
                    </div>}
            </div>
            <div className="item-info">
                <p className='item-name'>{name}</p>
                <p className='item-desc'>{description}</p>
                <p className='item-price'>Rs. {price}</p>
                <button className='item-button'>Add to Cart</button>
            </div>

        </div>
    )
}

export default Item