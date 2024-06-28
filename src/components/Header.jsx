import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function Header() {
	const { isAuthenticated, user, logout } = useContext(AuthContext);
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/");
	};

	return (
		<header>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
				<li>
					<Link to="/blog">Blog</Link>
				</li>
				{isAuthenticated ? (
					<>
						<li>
							<button className="btn btn-danger" onClick={handleLogout}>Xin chào {user?.email} - LOGOUT</button>
						</li>
						<li>
							<Link to="/admin"><button className="btn btn-primary">Bạn có phải là admin?</button></Link>
						</li>
					</>
				) : (
					<>
						<li>
							<Link to="/login">Login</Link>
							</li>
							<li>
							<Link to="/register">Register</Link>
						</li>
					</>
				)}
			</ul>
		</header>
	);
}
