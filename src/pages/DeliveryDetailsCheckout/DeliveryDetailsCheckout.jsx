import axios from "axios";
import React, { useState } from "react";
import { useLocation } from 'react-router-dom';
import "./DeliveryDetailsCheckout.css";

function DeliveryDetailsCheckout() {
  const location = useLocation();
  const cartTotals = location.state?.cartTotals || { subTotal: 0, deliveryFee: 500, total: 0 };

  const [deliveryDetails, setDeliveryDetails] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    province: "",
    zipCode: "",
    country: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDeliveryDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/checkout", {
        deliveryDetails,
        totals: cartTotals,
      });

      if (response.status === 200) {
        alert("Order successfully placed!");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
  };

  return (
    <div className="delivery-checkout-container">
      <div className="delivery-form">
        <h3>DELIVERY INFORMATION</h3>
        <form>
          <div className="form-row">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={deliveryDetails.firstName}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={deliveryDetails.lastName}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={deliveryDetails.email}
            onChange={handleInputChange}
          />
          <input
            type="text"
            name="street"
            placeholder="Street"
            value={deliveryDetails.street}
            onChange={handleInputChange}
          />
          <div className="form-row">
            <input
              type="text"
              name="city"
              placeholder="City"
              value={deliveryDetails.city}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="province"
              placeholder="Province"
              value={deliveryDetails.province}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-row">
            <input
              type="text"
              name="zipCode"
              placeholder="Zip Code"
              value={deliveryDetails.zipCode}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="country"
              placeholder="Country"
              value={deliveryDetails.country}
              onChange={handleInputChange}
            />
          </div>
          <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={deliveryDetails.phone}
            onChange={handleInputChange}
          />
        </form>
      </div>

      <div className="place-order-right">
        <div className="cart-total-delivery">
          <h3>CART TOTALS</h3>
          <div className="cart-totals-with-promo-delivery">
            <div className="cart-totals-delivery">
              <table>
                <tbody>
                  <tr>
                    <td>Sub Total</td>
                    <td className="td1">Rs. {cartTotals.subTotal.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Delivery fee</td>
                    <td className="td1">Rs. {cartTotals.deliveryFee.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td>Total</td>
                    <td className="td1">Rs. {cartTotals.total.toLocaleString()}</td>
                  </tr>
                </tbody>
              </table>
              <button className="checkout-btn-delivery" onClick={handleCheckout}>
                Proceed to Payment
              </button>
            </div>

            <div className="promo-code">
              <p>
                If you have a promo code <a href="/cart">ENTER IT HERE</a>
              </p>
              <div>
                <input type="text" placeholder="Promo Code" />
                <button className="btn-submit">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryDetailsCheckout;
