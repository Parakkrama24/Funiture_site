// import React from 'react';
// import './ExploreMenu.css';
// import { category_list } from '../../assets/assets';

// const ExploreMenu = ({ category, setCategory }) => {
//     return (
//         <div className='explore-menu' id='explore-menu'>
//             <hr />
//             <h1>Explore Our Collection</h1>
//             <p className='explore-menu-text'>
//                 Browse our curated selection of furniture and home equipment, designed to blend style with functionality. Use our augmented reality feature to visualize each piece in your home, ensuring the perfect fit for your space and style preferences.
//             </p>
//             <div className='explore-menu-categories'>
//                 {category_list.map((item, index) => {
//                     return (
//                         <div
//                             key={index}
//                             className='explore-menu-category-item'
//                             onClick={() => setCategory(prevCategory => 
//                                 prevCategory === item.category_name ? "All" : item.category_name
//                             )}
//                         >
//                             <img
//                                 className={category === item.category_name ? "active" : ""}
//                                 src={item.category_image}
//                                 alt={item.category_name}
//                             />
//                             <p>{item.category_name}</p>
//                         </div>
//                     );
//                 })}
//             </div>
//         </div>
//     );
// };

// export default ExploreMenu;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import './ExploreMenu.css';

const ExploreMenu = ({ category, setCategory }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    // Fetch products from the API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/products");
                if (response.status === 200) {
                    setProducts(response.data);
                    setFilteredProducts(response.data); // Initialize filtered products
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, []);

    // Filter products when a category is clicked
    useEffect(() => {
        if (category === "All") {
            setFilteredProducts(products); // Show all products
        } else {
            const filtered = products.filter(
                (product) => product.category === category
            );
            setFilteredProducts(filtered);
        }
    }, [category, products]);

    return (
        <div className='explore-menu' id='explore-menu'>
            <hr />
            <h1>Explore Our Collection</h1>
            <p className='explore-menu-text'>
                Browse our curated selection of furniture and home equipment, designed to blend style with functionality. Use our augmented reality feature to visualize each piece in your home, ensuring the perfect fit for your space and style preferences.
            </p>

            {/* Categories */}
            <div className='explore-menu-categories'>
                {/* <div
                    className={`explore-menu-category-item ${category === "All" ? "active" : ""}`}
                    onClick={() => setCategory("All")}
                >
                    <p>All</p>
                </div> */}
                {[...new Set(products.map((item) => item.category))].map((cat, index) => (
                    <div
                        key={index}
                        className={`explore-menu-category-item ${category === cat ? "active" : ""}`}
                        onClick={() => setCategory(cat)}
                    >
                        <p>{cat}</p>
                    </div>
                ))}
            </div>
            <h2>Top Items For You</h2>
            {/* Products */}
            <div className="explore-menu-products">
           
                {filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <Item
                            key={product._id}
                            id={product._id}
                            name={product.name}
                            description={product.description}
                            price={product.price}
                            image={product.image}
                        />
                    ))
                ) : (
                    <p>No products found in this category.</p>
                )}
            </div>
        </div>
    );
};

export default ExploreMenu;
