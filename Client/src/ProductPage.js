import React, { useEffect, useState } from "react";
import "./style.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { productsListActions } from "./Redux/productsList";

function ProductPage() {
	const { id } = useParams();
	const dispatch = useDispatch();

	const [myproduct, setProduct] = useState("");

	const products = useSelector((state) => state.productList.products);

	const numericId = parseInt(id, 10);

	useEffect(() => {
		// if condition - array of products should be present in redux toolkit to get the specific product
		if (products.length !== 0) {
			// Find the product with the matching id

			const product = products.find((item) => item.id === numericId);
			setProduct(product);
		}
	}, []);

	useEffect(() => {
		console.log("Products State: ", products);
	}, [products]);

	// const apiURL = "https://fakestoreapi.com/products/category/jewelery";

	useEffect(() => {
		const fetchProductDetails = async (productId) => {
			try {
				const response = await fetch(
					`http://localhost:8080/product/${productId}`,
				);
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();

				setProduct(data);
			} catch (error) {
				console.error("Error fetching product data:", error);
				// you can set product to null
				setProduct(null);
			}
		};
		// if condition - if myproduct is falsy, then Fetch product details.
		if (!myproduct) {
			fetchProductDetails(numericId);
		}
	}, [products.length === 0, id]);

	useEffect(() => {
		if (myproduct) {
			console.log("myProduct State: ", myproduct);
		}
	}, [myproduct]);

	function handleAddToCart(data) {
		dispatch(productsListActions.addToCart(data));
	}

	function handleViewCart(data) {
		console.log("This is View Cart", data);
	}

	return (
		<>
			<div className="product-detail">
				{myproduct && (
					<div>
						<div className="product-image">
							<img
								className="product-img-child"
								src={myproduct.image}
								alt={myproduct.title}
							/>
						</div>
						<div className="product-details">
							<h2 id="product-detail-title">{myproduct.title}</h2>
							<p id="product-detail-info">
								Price: ${myproduct.price}
							</p>
							<p id="product-detail-info">
								Category: {myproduct.category}
							</p>
							<p id="product-detail-info">
								Description: {myproduct.description}
							</p>
							{myproduct.rating && (
								<p id="product-detail-info">
									Rating: {myproduct.rating.rate} (
									{myproduct.rating.count} reviews)
								</p>
							)}
							<button
								className="add-to-cart-btn"
								onClick={() => handleAddToCart(myproduct)}
							>
								Add to Cart
							</button>
						</div>
					</div>
				)}
			</div>
			<div>
				{/* "View Cart" button */}
				<Link to="/cart">
					<button
						className="view-cart-btn"
						onClick={() => handleViewCart(myproduct)}
					>
						View Cart
					</button>
				</Link>
			</div>
		</>
	);
}

export default ProductPage;
