import { useRef } from "react";
import { useRegisterForm } from "../hooks/useRegisterForm";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/users";
import { useAuthContext } from "../context/auth-context";

const Register = () => {
	const {
		emailErrors,
		passwordErrors,
		passwordConfirmationErrors,
		validatePassword,
		validateEmail,
		validatePasswordConfirmation,
	} = useRegisterForm();
	const navigate = useNavigate();
	const { onLogin } = useAuthContext();
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmationRef = useRef<HTMLInputElement>(null);

	const onSubmitHandler = async (event: React.FormEvent) => {
		event.preventDefault();
		const email = emailRef.current?.value as string;
		const password = passwordRef.current?.value as string;
		const passwordConfirmation = passwordConfirmationRef.current
			?.value as string;

		// Password Validation
		validatePassword(password);

		// Password Confirmation Validation
		validatePasswordConfirmation(password, passwordConfirmation);

		// Email Validation
		validateEmail(email);

		if (
			emailErrors.length === 0 &&
			passwordErrors.length === 0 &&
			passwordConfirmationErrors.length === 0
		) {
			// Success case
			// Send user to backend
			const data: any = await registerUser({
				email: email,
				password: password,
			});
			// Store the token into the context
			onLogin(data.accessToken);
			// redirect user
			navigate("/profile");
			console.log(data);
		}
	};

	const onChangePassword = () => {
		const password = passwordRef.current?.value as string;
		// Validating password / Setting errors
		validatePassword(password);
	};

	return (
		<section>
			<h1>Register</h1>
			<form onSubmit={onSubmitHandler}>
				<fieldset>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" ref={emailRef} />
					{emailErrors.map((error) => (
						<p className="ml-4 text-sm text-red-500 " key={error}>
							{error}
						</p>
					))}
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password:</label>
					<input
						type="text"
						id="password"
						name="password"
						ref={passwordRef}
						onChange={onChangePassword}
					/>
					{passwordErrors.map((error) => (
						<p className="ml-4 text-sm text-red-500 " key={error}>
							{error}
						</p>
					))}
				</fieldset>
				<fieldset>
					<label htmlFor="passwordConfirmation">Confirm Password:</label>
					<input
						type="password"
						id="passwordConfirmation"
						name="passwordConfirmation"
						ref={passwordConfirmationRef}
					/>
					{passwordConfirmationErrors.map((error) => (
						<p className="ml-4 text-sm text-red-500 " key={error}>
							{error}
						</p>
					))}
				</fieldset>
				<button type="submit" className="btn">
					Submit
				</button>
			</form>
		</section>
	);
};

export default Register;
