import React, { useState, useEffect } from "react";
import "./style.css";
import { Link } from "react-router-dom";

function Categories() {
	// State to hold the category data fetched from the API
	const [category, setCategory] = useState([]);

	// useEffect hook to fetch categories from the API
	useEffect(() => {
		fetch("https://ecommerce-orpin-delta.vercel.app/category")
			.then((response) => response.json())
			.then((data) => {
				console.log("categories data: ", data);
				setCategory(data);
			});
	}, []);

	return (
		<>
			<div>
				<div className="mycategoryImagesContainer">
					{/* Map through the category array to display category images */}
					{category.map((listCat, index) => (
						<Link
							to={`/category/${listCat.name}`}
							key={index}
							className="linkCat"
							style={{ textDecoration: "none" }}
						>
							<div key={listCat.id}>
								<img
									className="mycategoryImages"
									src={listCat.img}
									alt="Categories"
								/>

								<p className="categoryName">{listCat.name}</p>
							</div>
						</Link>
					))}
				</div>
			</div>
		</>
	);
}

export default Categories;
