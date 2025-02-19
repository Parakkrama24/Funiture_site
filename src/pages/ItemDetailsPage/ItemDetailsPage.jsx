import { useState } from "react";
import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./ItemDetailsPage.css";

const ItemDetails = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const maxStars = 5;

  // Dummy products data (Replace with API data)
  const product = {
    id,
    name: "Wireless Headphones",
    description:
      "High-quality sdsfs sfsfs fsf sfsf dsdsds sfsfsf ssfsfs daadad bcbcc cbcbcb ccbcbnn czczc zxzxzx zxzczccxccscd zxzzxz sfdsfsf dsfsf fsfs sdsfsf dssfsfssf sfsfsf wireless headphones with noise cancellation and long battery life.",
    price: 99.99,
    image: "https://cdn.pixabay.com/photo/2025/02/11/20/43/cormorant-9399801_1280.jpg",
    stock: 10,
    reviews: "This is good",
    ratings: 3.5
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of ${product.name} to cart`);
  };

  return (
    <div className="container">
      <div className="product">
        {/* Product Image */}
        <div>
          <img src={product.image} alt={product.name} className="product-image" />
        </div>

        {/* Product Details */}
        <div className="details">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p className="price">${product.price.toFixed(2)}</p>
          <p className={`stock ${product.stock > 0 ? "in-stock" : "out-of-stock"}`}>
            {product.stock > 0 ? `In Stock (${product.stock} left)` : "Out of Stock"}
          </p>

          {/* Quantity Selector */}
          <div className="quantity">
            <button onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}>-</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity((prev) => prev + 1)}>+</button>
          </div>

          {/* Reviews & Rating */}
          <div className="reviews">
            {[...Array(maxStars)].map((_, index) => {
              const starValue = index + 1;
              return (
                <span key={index}>
                  {product.ratings >= starValue ? (
                    <FaStar color="gold" />
                  ) : product.ratings >= starValue - 0.5 ? (
                    <FaStarHalfAlt color="gold" />
                  ) : (
                    <FaRegStar color="gray" />
                  )}
                </span>
              );
            })}
          </div>
         

          {/* Action Buttons */}
          <div className="actions">
            <button onClick={handleAddToCart} className="button add-to-cart">
              Add to Cart
            </button>
            <button className="button buy-now">Buy Now</button>
          </div>
        </div>
      </div>
          <div>
            
          </div>
    </div>
  );
};

export default ItemDetails;




