import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { productsListActions } from "./Redux/productsList";
import "./styles/CartCSS.css"; // Import the Cart styles

const Cart = () => {
  const cartItems = useSelector((state) => state.productList.cart);
  const dispatch = useDispatch();
  const [totalAmount, setTotalAmount] = useState(0);

  function handleRemove(id) {
    dispatch(productsListActions.removeFromCart(id));
  }

  useEffect(() => {
    // Recalculate totalAmount whenever cartItems change
    const newTotalAmount = cartItems.reduce(
      (total, item) => total + item.price,
      0,
    );
    setTotalAmount(newTotalAmount);
  }, [cartItems]);

  return (
    <>
      <div className="container">
        <div className="cart-container">
          <h2 className="cart-header">Shopping Cart</h2>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <h3>{item.title}</h3>
                <p>{item.price}</p>
                <button
                  className="remove-product"
                  onClick={() => handleRemove(item.id)}
                >
                  [-]
                </button>
              </div>
            ))}
          </div>
          <p>Total Amount: </p>
          <p>{totalAmount.toFixed(2)}</p>
          <button className="proceed-to-payment">Proceed to Payment</button>
        </div>
      </div>
    </>
  );
};

export default Cart;
