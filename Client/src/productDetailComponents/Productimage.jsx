import React from "react";

function Productimage(props){
	return(

		<>
			<img className="productImg" src={props.srcVal} alt={props.altVal}/> 
		</>
		);
}

export default Productimage;