import { useRef } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { loginUser } from "../api/users";
import { useAuthContext } from "../context/auth-context";
import { LoginResponse } from '../types/user'

const Login = () => {
	const navigate = useNavigate();
	const { connected, onLogin } = useAuthContext();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);

	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		const email = emailRef.current?.value as string;
		const password = passwordRef.current?.value as string;

		// Success case
		// Send user to backend
		const data = await loginUser({
			email: email,
			password: password,
		});
		// Store the token into the context
		onLogin(data.accessToken);
		// redirect user
		navigate("/profile");
	}

	if (connected) return <Navigate to='/profile' />

	return (
		<section>
			<h1>Login</h1>
			<form onSubmit={onSubmitHandler}>
				<fieldset>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" ref={emailRef} />
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password:</label>
					<input
						type="text"
						id="password"
						name="password"
						ref={passwordRef}
					/>
				</fieldset>
				<button type="submit" className="btn">
					Submit
				</button>
			</form>
		</section>
	);
};

export default Login;
