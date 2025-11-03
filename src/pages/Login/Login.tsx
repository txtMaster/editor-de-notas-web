import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";
import s from "./Login.module.css";
import GithubIcon from "../../assets/svg/github.svg?react";
import { PassInput } from "../../components/PassInput/PassInput";
import { AutoSlider } from "../../components/AutoSlider/AutoSlider";
import { StepSlider } from "../../components/StepSlider/StepSlider";
import { useStepSlider } from "../../hooks/useStepSlider";
import { useState, type FormEvent } from "react";
import type { LoginData } from "../../context/AuthContext";

export const Login = () => {
	const { login } = useAuth();
	

	const onSubmitLoginForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const data = Object.fromEntries(formData.entries()) as LoginData;
		console.log(data)
		login(data).then(data=>{
			console.log(data)
		}).catch(e=>console.log(e))
	};

	const onSubmitSignupForm = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		console.log(formData.entries());
	};

	const { steps, next, prev, current } = useStepSlider([
		<section className={`${s.login} ${s.step}`} key={"login"}>
			<div className={s.head}>
				<h2>Create an account</h2>
				<div>
					Already have a account?{" "}
					<button className={s.link} onClick={() => next()}>
						{" Log in"}
					</button>
				</div>
			</div>
			<form
				action="#"
				className={s.form}
				method="post"
				onSubmit={onSubmitSignupForm}
			>
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
				<button type="submit">Create Account</button>
				<button type="button" className={s.btnpreview}>
					Ingresar como invitado, ¡sin registro!
				</button>
			</form>
		</section>,
		<section className={`${s.step} ${s.signup}`} key={"signup"}>
			<div className={s.head}>
				<h2>Log in</h2>
				<div>
					Don`t have an account?
					<button className={s.link} onClick={() => prev()}>
						{" "}
						Sign up
					</button>
				</div>
			</div>
			<form
				action="#"
				className={s.form}
				method="post"
				onSubmit={onSubmitLoginForm}
			>
				<label>
					<input type="text" name="email" placeholder="Email" />
				</label>
				<PassInput name="password" placeholder="Password" />
				<button type="submit">Log in</button>
				<button type="button" className={s.btnpreview}>
					Ingresar como invitado, ¡sin registro!
				</button>
				<button type="button">¿olvidaste tu contraseña?</button>
			</form>
		</section>,
	]);
	return (
		<div className={s.root}>
			<section className={s.main}>
				<section className={s.left}>
					<div className={s.top}>
						<a href="#" className={s.github}>
							<GithubIcon />
						</a>
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
					<StepSlider current={current} className={s.stepslider}>
						{steps}
					</StepSlider>
				</section>
			</section>
		</div>
	);
};
