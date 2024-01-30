import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { productsListActions } from "./Redux/productsList";
import "./styles/CartCSS.css"; // Import the Cart styles
import axios from "axios";

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
      0
    );
    setTotalAmount(newTotalAmount);
  }, [cartItems]);

  const handlePayment = async (amount) => {
    try {
      // const response = await axios.get("http://localhost:8080/api/getkey");
      // console.log('API Response:', response);
  
      // const key = response.data.key;
      // if (!key) {
      //   console.error("No key passed");
      //   return;
      // }
    
      const { data: { key } } = await axios.get("http://localhost:8080/api/getkey");

      const newAmount = Math.floor(Number(amount*100));

      // Calculate totalAmount
     // const newTotalAmount = cartItems.reduce((total, item) => total + item.price, 0);
  
      const { data: order } = await axios.post(
        "http://localhost:8080/api/checkout",
        {
          newAmount,
        }
      );

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Harsh Hingu Ecom",
        description: "Test Transaction for ecommerce 2",
        image:
          "https://static.javatpoint.com/computer/images/what-is-the-url.png",
        order_id: order.id,
        callback_url: "http://localhost:8080/api/paymentverification",
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razor = new window.Razorpay(options);

      razor.open();
    } catch (error) {
      console.error("Error during API request: ", error);
    }
  };

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
          <button
            className="proceed-to-payment"
            onClick={() => handlePayment(totalAmount)}
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
