// In that component, i want a form with an input type email, and two input type password
// when user submit the form (when he clicks on the button) we will run some validation
// The two password should match
// password should be at least 10 characters, maximum of a 100, should have a uppercase, a lowercase, a number and a special character
// email should have the correct format
// If validation succeed, log 'Success into the console'
import { useRef, useState } from "react";
import { z } from "zod";

const emailValidation = z.string().email();
const passwordValidation = z
	.string()
	.min(10, { message: "Password should be at least 10 characters long" })
	.max(100, { message: "Password should be at most 100 characters long" })
	.regex(/(?=.*?[A-Z])/, {
		message: "Password should have at least one uppercase letter",
	})
	.regex(/(?=.*?[a-z])/, {
		message: "Password should have at least one lowercase letter",
	})
	.regex(/(?=.*?[0-9])/, {
		message: "Password should have at least one number",
	})
	.regex(/(?=.*?[@$!%*#?&<>])/, {
		message: "Password should have at least one special character: @&#*<>!?$€%",
	});

const Register = () => {
	const emailRef = useRef<HTMLInputElement>(null);
	const [emailError, setEmailError] = useState<string[]>([]);
	const passwordRef = useRef<HTMLInputElement>(null);
	const [passwordError, setPasswordError] = useState<string[]>([]);
	const passwordConfirmationRef = useRef<HTMLInputElement>(null);
	const [passwordConfirmationError, setPasswordConfirmationError] = useState<string[]>([]);

	const onSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		const email = emailRef.current?.value;
		const password = passwordRef.current?.value;
		const passwordConfirmation = passwordConfirmationRef.current?.value;

		// Password Validation
		const passValidationResult = passwordValidation.safeParse(password);
		if (!passValidationResult.success) {
			const errors = []
			for (const error of passValidationResult.error.issues) {
				errors.push(error.message)
			}
			setPasswordError(errors)
		}

		// Email Validation
		const emailValidationResult = emailValidation.safeParse(email)
		if (!emailValidationResult.success) {
			const errors = []
			for (const error of emailValidationResult.error.issues) {
				errors.push(error.message)
			}
			setEmailError(errors)
		}

		console.log(email, password, passwordConfirmation);
	};

	const onChangePassword = () => {
		const password = passwordRef.current?.value;
		const passValidationResult = passwordValidation.safeParse(password);
		console.log(passValidationResult.success)
		if (!passValidationResult.success) {
			const errors = []
			for (const error of passValidationResult.error.issues) {
				console.log(error)
				errors.push(error.message)
			}
			setPasswordError(errors)
		} else {
			setPasswordError([])
		}
	}
	return (
		<section>
			<h1>Register</h1>
			<form onSubmit={onSubmitHandler}>
				<fieldset>
					<label htmlFor="email">Email:</label>
					<input type="email" id="email" name="email" ref={emailRef} />
					{emailError.map((error) => (
						<p className="ml-4 text-sm text-red-500 " key={error}>
							{error}
						</p>
					))}
				</fieldset>
				<fieldset>
					<label htmlFor="password">Password:</label>
					<input type="text" id="password" name="password" ref={passwordRef} onChange={onChangePassword} />
					{passwordError.map((error) => (
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
					{passwordConfirmationError.map((error) => (
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
