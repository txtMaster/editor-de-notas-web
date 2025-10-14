import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

export const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = () => {
		login().then(()=>navigate("/home"));
	};
	return (
		<>
			<div>Login</div>
			<button onClick={handleLogin}>Entrar</button>
		</>
	);
};
