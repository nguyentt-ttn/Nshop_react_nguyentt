import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../contexts/ProductContext";

const Home = () => {
	const { state } = useContext(ProductContext);
	return (
		<div className="row justify-between ms-1">
			<h1>Danh sách sản phẩm</h1>
			{state.products.map((item) => (
				<div className="col-12 col-sm-2 col-lg-2 card" key={item.id}>
					<Link to={`/product-detail/${item.id}`}>
						<img src={item.thumbnail} alt={item.title} />
					</Link>
					<div className="content">
						<Link to={`/product-detail/${item.id}`}>
							<h2>{item.title}</h2>
						</Link>
						<p>{item.price}$</p>
						<button className="btn btn-primary">Add to cart</button>
					</div>
				</div>
			))}
		</div>
	);
};

export default Home;