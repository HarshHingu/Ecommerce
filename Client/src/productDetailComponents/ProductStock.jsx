
import React from "react";
import "../style.css";

function ProductStock(props){
	return(
							<p className="product-stock">Stock left: {props.stock}</p>
			
		);
}

export default ProductStock;