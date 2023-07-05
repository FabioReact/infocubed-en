// In that component, i want a form with an input type email, and two input type password
// when user submit the form (when he clicks on the button) we will run some validation
// The two password should match
// password should be at least 10 characters, maximum of a 100, should have a uppercase, a lowercase, a number and a special character
// email should have the correct format
// If validation succeed, log 'Success into the console'
import { useRef } from "react";
import { useRegisterForm } from '../hooks/useRegisterForm'


const Register = () => {
	const { emailErrors, passwordErrors, passwordConfirmationErrors, validatePassword, validateEmail, validatePasswordConfirmation } = useRegisterForm()
	const emailRef = useRef<HTMLInputElement>(null);
	const passwordRef = useRef<HTMLInputElement>(null);
	const passwordConfirmationRef = useRef<HTMLInputElement>(null);


	const onSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const email = emailRef.current?.value as string;
		const password = passwordRef.current?.value as string;
		const passwordConfirmation = passwordConfirmationRef.current?.value as string;

		// Password Validation
		validatePassword(password)

		// Password Confirmation Validation
		validatePasswordConfirmation(password, passwordConfirmation)

		// Email Validation
		validateEmail(email)

		console.log(email, password, passwordConfirmation);
	};

	const onChangePassword = () => {
		const password = passwordRef.current?.value as string;
		// Validating password / Setting errors
		validatePassword(password)
	}

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
					<input type="text" id="password" name="password" ref={passwordRef} onChange={onChangePassword} />
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
