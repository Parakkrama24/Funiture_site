import React from 'react'
import './Header.css'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className='header'>
        <div className="header-contents">
        <h1>Find Your Perfect Piece: </h1>
        <h2>Explore Our Collection</h2>
        <p>Experience the future of shopping with our augmented reality platform. Virtually place furniture and home equipment in your space to see how it fits and feels before you buy. Explore our collection and find the perfect pieces to elevate your home effortlessly, all from the comfort of your screen.</p>
        <Link to="/category" className="shop-link"><button>Shop Now</button> </Link>
        </div>
    </div>
  )
}

export default Header