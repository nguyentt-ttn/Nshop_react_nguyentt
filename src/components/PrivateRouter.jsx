import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AccessDenied from "../pages/AccessDenied";

const PrivateRouter = () => {
	const { isAuthenticated, user } = useContext(AuthContext);
	console.log(isAuthenticated, user);
	
	if (user?.role !== "admin") {
		return <AccessDenied />;
	}

	return <Outlet />;
};

export default PrivateRouter;
