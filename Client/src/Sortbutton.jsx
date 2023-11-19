import React from "react";
import "./style.css";

function Sortbutton(props){

   
	
	return (
		<div >
			<button className="sort-button" onClick={()=>{props.makeChange(props.name)}}> {props.identifyButton}  </button>
		</div>	
	);
}

export default Sortbutton;