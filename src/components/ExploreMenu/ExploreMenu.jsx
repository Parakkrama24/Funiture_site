import React from 'react';
import './ExploreMenu.css';
import { category_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div className='explore-menu' id='explore-menu'>
            <hr />
            <h1>Explore Our Collection</h1>
            <p className='explore-menu-text'>
                Browse our curated selection of furniture and home equipment, designed to blend style with functionality. Use our augmented reality feature to visualize each piece in your home, ensuring the perfect fit for your space and style preferences.
            </p>
            <div className='explore-menu-categories'>
                {category_list.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className='explore-menu-category-item'
                            onClick={() => setCategory(prevCategory => 
                                prevCategory === item.category_name ? "All" : item.category_name
                            )}
                        >
                            <img
                                className={category === item.category_name ? "active" : ""}
                                src={item.category_image}
                                alt={item.category_name}
                            />
                            <p>{item.category_name}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ExploreMenu;
