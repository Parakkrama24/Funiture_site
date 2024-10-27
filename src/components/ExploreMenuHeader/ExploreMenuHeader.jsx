import React from 'react';
import './ExploreMenuHeader.css';
import { assets } from '../../assets/assets';

const ExploreMenu = () => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <hr />
            <h1>Explore Our Collection</h1>
            <p className='explore-menu-text'>
                Browse our curated selection of furniture and home equipment, designed to blend style with functionality. Use our augmented reality feature to visualize each piece in your home, ensuring the perfect fit for your space and style preferences.
            </p>
            <button className='explore-button'>
                Explore Our Collection 
                <img src={assets.arrow} alt="Arrow" className="arrow-image" />
            </button>
            
        </div>
    );
};

export default ExploreMenu;
