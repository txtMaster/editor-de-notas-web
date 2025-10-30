import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import "./login.css";
import { PassInput } from "../../components/PassInput/PassInput";
import { AutoSlider } from "../../components/AutoSlider/AutoSlider";

export const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = () => {
		login().then(() => navigate("/home"));
	};
	return (
		<>
			<section className="left">
				<div className="top">
					<a href="#">git</a>
					<a href="#">ingresar como invitado &#8594; </a>
				</div>
				<div className="bottom">
					<AutoSlider items={[
						"Almacenamiento Uno",
						"Almacenamiento Dos",
						"Almacenamiento Tres"
					]} inteval={5000}/>
				</div>
			</section>
			<section className="right">
				<div className="head">
					<h2>Create an account</h2>
					<div>
						Already have a account?{" "}
						<a href="#" className="link">
							{" "}
							Log in
						</a>
					</div>
				</div>
				<form action="#" className="form">
					<label>
						<input type="text" name="name" placeholder="Name" />
					</label>
					<label>
						<input type="text" name="email" placeholder="Email" />
					</label>
					<PassInput name="password" placeholder="Password" />
					<div className="conditions">
						<label>
							<input type="checkbox" name="accept" />I agree to the
						</label>
						<a href="#" className="link">
							Terms & Conditioms
						</a>
					</div>
					<button type="submit" onClick={handleLogin}>
						Create Account
					</button>
					<button type="button">¿olvidaste tu contraseña?</button>
				</form>
			</section>
		</>
	);
};
