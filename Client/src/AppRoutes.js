import ProductPage from "./ProductPage";
import App from "./App";
import CategoryProducts from "./CategoryProducts";
import { Routes, Route } from "react-router-dom";
import Cart from "./Cart";
import RegistrationForm from "./RegistrationForm";
import LoginForm from "./LoginForm";

function AppRoutes() {
	return (
		<>
			<Routes>
				<Route path="/" element={<App />} exact /> {/* Clean Code*/}
				<Route path="/product/:id" element={<ProductPage />} />
				{/* Clean Code*/}
				<Route
					path="/category/:category"
					element={<CategoryProducts />}
				/>
				{/* Clean Code*/}
				<Route path="/cart" element={<Cart />} /> {/* Clean Code*/}
				{/* Registration */}
				<Route path="/user/register" element={<RegistrationForm />} />
				{/* Login */}
				<Route path="/user/login" element={<LoginForm />} />
			</Routes>
		</>
	);
}

export default AppRoutes;
