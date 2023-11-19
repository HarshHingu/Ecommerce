import React from "react";
import "../style.css";

function Productprice(props) {
  return (
    <>
    <p className="product-price">$ {props.price}</p>
    </>
    );
}

export default Productprice;
