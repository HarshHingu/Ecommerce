import React from "react";
import "./App.css";
import Listproducts from "./Listproducts";
import Categories from "./Categories";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <Link to="/" style={{ textDecoration: "none" }}>
        <div className="App">
          <Categories />

          <Listproducts />
        </div>
      </Link>
    </>
  );
}

export default App;
