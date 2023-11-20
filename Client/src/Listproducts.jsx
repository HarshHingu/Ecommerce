import React, { useState, useEffect } from "react";
import "./style.css";
import Productcategory from "./productDetailComponents/Productcategory";
import Productimage from "./productDetailComponents/Productimage";
import Producttitle from "./productDetailComponents/Producttitle";
import Productprice from "./productDetailComponents/Productprice";
import ProductRating from "./productDetailComponents/ProductRating";
import ProductStock from "./productDetailComponents/ProductStock";
import Sortbutton from "./Sortbutton";
import { useDispatch, useSelector } from "react-redux";
import { productsListActions } from "./Redux/productsList";

import { Link } from "react-router-dom";

function Listproducts() {
	const dispatch = useDispatch();

	const productListRedux = useSelector((state) => state.productList.products);

	const [searchQuery, setSearchQuery] = useState("");

	const apiURL = "https://fakestoreapi.com/products";
	// const apiURL = "https://ecommerce-orpin-delta.vercel.app/allproduct";

	// useEffect hook to fetch the list of products from the API on component mount
	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch(apiURL);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const apiData = await response.json();

				dispatch(productsListActions.setProductList(apiData));

				console.log("Fetched products:", apiData);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		// Fetch list of products only if products are not already fetched
		if (productListRedux.length === 0) {
			fetchData();
		}
	}, [dispatch, productListRedux.length]);

	useEffect(() => {
		console.log("Redux ProductList: ", productListRedux);
	}, [productListRedux]);

	// Function to handle changes in the search input
	const handleSearchInputChange = (event) => {
		setSearchQuery(event.target.value);
	};

	// useEffect hook to filter products based on the search query
	useEffect(() => {
		const filtered = productListRedux.filter((product) => {
			const productTitles = product.title
				.toLowerCase()
				.includes(searchQuery.toLowerCase());
			const productCategories = product.category
				.toLowerCase()
				.includes(searchQuery.toLowerCase());

			return productTitles || productCategories;
		});
		dispatch(productsListActions.setProductList(filtered));
	}, [searchQuery]);

	// Function to handle clicks on different sorting/filtering buttons
	function handleClick(name) {
		let sortedProducts;

		if (name === "LowToHigh") {
			sortedProducts = [...productListRedux].sort(
				(a, b) => a.price - b.price,
			);
			dispatch(productsListActions.setProductList(sortedProducts));
		} else if (name === "HighToLow") {
			sortedProducts = [...productListRedux].sort(
				(a, b) => b.price - a.price,
			);
			dispatch(productsListActions.setProductList(sortedProducts));
		} else if (name === "SortRating") {
			sortedProducts = [...productListRedux].sort(
				(a, b) => b.rating.rate - a.rating.rate,
			);
			dispatch(productsListActions.setProductList(sortedProducts));
		}
	}

	return (
		<div>
			{/* Input field for searching */}
			<input
				type="text"
				placeholder="Search..."
				value={searchQuery}
				onChange={handleSearchInputChange}
				className="search-input"
			/>

			<div className="sort-button-container">
				{/* Sorting/filtering buttons */}

				<Sortbutton
					makeChange={handleClick}
					name="LowToHigh"
					identifyButton="Sort by Price: Low to High"
				/>
				<Sortbutton
					makeChange={handleClick}
					name="HighToLow"
					identifyButton="Sort by Price: High to Low"
				/>
				<Sortbutton
					makeChange={handleClick}
					name="SortRating"
					identifyButton="Sort by: Rating"
				/>
			</div>

			<div className="list-container">
				{/* Displaying the list of filtered products */}
				{productListRedux.map((data) => (
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
}

export default Listproducts;
