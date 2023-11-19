import React, { useEffect, useState } from "react";
import Productcategory from "./productDetailComponents/Productcategory";
import Productimage from "./productDetailComponents/Productimage";
import Producttitle from "./productDetailComponents/Producttitle";
import Productprice from "./productDetailComponents/Productprice";
import ProductRating from "./productDetailComponents/ProductRating";
import ProductStock from "./productDetailComponents/ProductStock";
import "./style.css";
import { useParams, Link } from "react-router-dom";

const CategoryProducts = () => {
	const [products, setProducts] = useState([]);

	const { category } = useParams();

	// const apiURL = "https://fakestoreapi.com/products/category/jewelery";

	const apiURL = `http://localhost:8080/category/${category}`;

	// useEffect hook to fetch the list of products from the API on component mount
	useEffect(() => {
		fetch(apiURL)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((apiData) => {
				setProducts(apiData);
				console.log("This is Category products: ", apiData);
				// console.error(apiData);
			})
			.catch((error) => console.error("Error fetching data:", error));
	}, []);

	return (
		<div>
			<div className="list-container">
				{/* Displaying the list of filtered products */}
				{products.map((data) => (
					<Link
						to={`/product/${data.id}`}
						style={{ textDecoration: "none" }}
					>
						<div key={data.id} className="product-item">
							<Productimage
								srcVal={data.image}
								altVal={data.title}
							/>
							<Productcategory category={data.category} />
							<Producttitle title={data.title} />
							<Productprice price={data.price} />
							<ProductRating rating={data.rating.rate} />
							<ProductStock stock={data.rating.count} />
						</div>
					</Link>
				))}
			</div>
		</div>
	);
};

export default CategoryProducts;
