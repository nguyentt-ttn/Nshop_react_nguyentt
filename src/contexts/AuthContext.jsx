import React, { createContext, useState, useEffect } from "react";
import api from "../axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("token");
			if (token) {
				try {
					
					const { data } = await api.get("/660/users/1", {
						headers: {
							Authorization: `Bear ${token}`,
						},
					});

					setUser(data);
					setIsAuthenticated(true);
				} catch (error) {
					console.error(error);
					setIsAuthenticated(false);
					setUser(null);
				}
			}
		};
		checkAuth();
	}, []);

	const login = async (email, password) => {
		try {
			const { data } = await api.post("/login", { email, password });
			localStorage.setItem("token", data.accessToken);
			setUser(data.user);
			setIsAuthenticated(true);
		} catch (error) {
			console.error(error);
			setIsAuthenticated(false);
			setUser(null);
		}
	};

	const register = async (email, password) => {
		try {
			const { data } = await api.post("/register", { email, password });
			localStorage.setItem("token", data.accessToken);
			setUser(data.user);
			setIsAuthenticated(true);
		} catch (error) {
			console.error(error);
			setIsAuthenticated(false);
			setUser(null);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
		setUser(null);
		setIsAuthenticated(false);
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, register, login, logout }}>{children}</AuthContext.Provider>
	);
};

export default AuthContextProvider;
