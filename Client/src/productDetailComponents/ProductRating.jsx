import React from "react";
import "../style.css";

function ProductRating(props){
	return(
			<div className="rating-container">
      			<i className="star-icon">★</i>
      			<p className="rating-text">Rating: {props.rating}</p>
    		</div>
		);
}

export default ProductRating;