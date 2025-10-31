import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import s from "./Login.module.css";
import { PassInput } from "../../components/PassInput/PassInput";
import { AutoSlider } from "../../components/AutoSlider/AutoSlider";

export const Login = () => {
	const { login } = useAuth();
	const navigate = useNavigate();

	const handleLogin = () => {
		login().then((d) => {
			console.log(d)
			navigate("/home")
		});
	};
	return (
		<div className={s.root}>
			<section className={s.main}>
				<section className={s.left}>
					<div className={s.top}>
						<a href="#">git</a>
						<a href="#">ingresar como invitado &#8594; </a>
					</div>
					<div className={s.bottom}>
						<AutoSlider
							items={[
								"Almacenamiento en la nube",
								"Organización por carpetas",
								"Almacenamiento Tres",
							]}
							inteval={5000}
						/>
					</div>
				</section>
				<section className={s.right}>
					<div className={s.head}>
						<h2>Create an account</h2>
						<div>
							Already have a account?{" "}
							<a href="#" className={s.link}>
								{" "}
								Log in
							</a>
						</div>
					</div>
					<form action="#" className={s.form} onSubmit={(e)=>e.preventDefault()}>
						<label>
							<input type="text" name="name" placeholder="Name" />
						</label>
						<label>
							<input type="text" name="email" placeholder="Email" />
						</label>
						<PassInput name="password" placeholder="Password" />
						<div className={s.conditions}>
							<label>
								<input type="checkbox" name="accept" />I agree to the
							</label>
							<a href="#" className={s.link}>
								Terms & Conditioms
							</a>
						</div>
						<button type="submit" onClick={handleLogin}>
							Create Account
						</button>
						<button type="button">¿olvidaste tu contraseña?</button>
					</form>
				</section>
			</section>
		</div>
	);
};
