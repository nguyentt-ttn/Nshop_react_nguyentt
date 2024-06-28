import React from "react";
import { Outlet } from "react-router-dom";
import Footer from './Footer';
import Header from "./Header";

const LayoutClient = () => {
	return (
		<>
			<Header />
			<main className="main">
				<Outlet />
			</main>
			<Footer />
		</>
	);
};

export default LayoutClient;