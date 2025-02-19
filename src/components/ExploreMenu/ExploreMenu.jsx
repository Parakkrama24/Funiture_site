import axios from "axios";
import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Item from "../Item/Item";
import "./ExploreMenu.css";

const ExploreMenu = ({ category, setCategory }) => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query

    // Hardcoded categories with images
    const categories = [
        { name: "Furnitures", image: assets.ellipse1 },
        { name: "Electronics", image: assets.ellipse2 },
        { name: "Kitchen Equipments", image: assets.ellipse3 },
        { name: "Bathwares", image: assets.ellipse4 },
        { name: "Wall Designs", image: assets.ellipse5 },
    ];

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

    // Handle category selection
    const handleCategoryClick = (selectedCategory) => {
        if (category === selectedCategory) {
            // If clicked category is already active, reset to "All"
            setCategory("All");
            setFilteredProducts(products);
        } else {
            // Otherwise, filter by the selected category
            setCategory(selectedCategory);
            setFilteredProducts(
                products.filter((product) => product.category === selectedCategory)
            );
        }
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        if (query === "") {
            setFilteredProducts(products.filter((product) => product.category === category || category === "All"));
        } else {
            setFilteredProducts(
                products.filter(
                    (product) =>
                        product.name.toLowerCase().includes(query) &&
                        (product.category === category || category === "All")
                )
            );
        }
    };

    return (
        <div className="explore-menu" id="explore-menu">
            <hr />
            <h1>Explore Our Collection</h1>
            <p className="explore-menu-text">
                Browse our curated selection of furniture and home equipment, designed to blend style with functionality. Use our augmented reality feature to visualize each piece in your home, ensuring the perfect fit for your space and style preferences.
            </p>

            {/* Search Input */}
            <input
                type="text"
                placeholder="Search items..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input"
            />

            {/* Categories */}
            <div className="explore-menu-categories">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className={`explore-menu-category-item ${category === cat.name ? "active" : ""
                            }`}
                        onClick={() => handleCategoryClick(cat.name)}
                    >
                        <img
                            src={cat.image}
                            alt={cat.name}
                        />
                        <p>{cat.name}</p>
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
                        rating={product.rating}
                        reviews={product.reviews}
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
