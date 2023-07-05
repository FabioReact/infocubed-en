import { useReducer, useState } from "react";
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

const initialState = {
	emailErrors: [] as string[],
	passwordErrors: [] as string[],
	passwordConfirmationErrors: [] as string[],
};

type ActionType =
	| {
			type: "SET_PASSWORD_ERRORS";
			passwordErrors: string[];
		}
	| {
			type: "SET_EMAIL_ERRORS";
			emailErrors: string[];
		}
	| {
			type: "SET_PASSWORD_CONFIRMATION_ERRORS";
			passwordConfirmationErrors: string[];
		};

const reducer = (state: typeof initialState, action: ActionType) => {
	switch (action.type) {
		case "SET_EMAIL_ERRORS": {
			const newState = structuredClone(state);
			newState.emailErrors = action.emailErrors;
			return newState;
		}
		case "SET_PASSWORD_ERRORS": {
			const newState = structuredClone(state);
			newState.passwordErrors = action.passwordErrors;
			return newState;
		}
		case "SET_PASSWORD_CONFIRMATION_ERRORS": {
			const newState = structuredClone(state);
			newState.passwordConfirmationErrors = action.passwordConfirmationErrors;
			return newState;
		}
		default:
			throw new Error("useRegisterForm - Not a valid action type");
	}
	return state;
};

const useRegisterForm = () => {
	const [
		{ emailErrors, passwordErrors, passwordConfirmationErrors },
		dispatch,
	] = useReducer(reducer, initialState);

	const validatePassword = (password: string) => {
		const passValidationResult = passwordValidation.safeParse(password);
		if (!passValidationResult.success) {
			const errors = [];
			for (const error of passValidationResult.error.issues) {
				errors.push(error.message);
			}
			dispatch({ type: "SET_PASSWORD_ERRORS", passwordErrors: errors });
		} else {
			dispatch({ type: "SET_PASSWORD_ERRORS", passwordErrors: [] });
		}
	};

	const validatePasswordConfirmation = (
		password: string,
		passwordConfirmation: string,
	) => {
		if (password !== passwordConfirmation) {
			const errors = ["Passwords should match"];
			dispatch({
				type: "SET_PASSWORD_CONFIRMATION_ERRORS",
				passwordConfirmationErrors: errors,
			});
		} else {
			dispatch({
				type: "SET_PASSWORD_CONFIRMATION_ERRORS",
				passwordConfirmationErrors: [],
			});
		}
	};

	const validateEmail = (email: string) => {
		const emailValidationResult = emailValidation.safeParse(email);
		if (!emailValidationResult.success) {
			const errors = [];
			for (const error of emailValidationResult.error.issues) {
				errors.push(error.message);
			}
			dispatch({ type: "SET_EMAIL_ERRORS", emailErrors: errors });
		} else {
			dispatch({ type: "SET_EMAIL_ERRORS", emailErrors: [] });
		}
	};

	// const emailErrors = state.emailErrors
	// const passwordErrors = state.passwordErrors
	// const passwordConfirmationErrors = state.passwordConfirmationErrors
	// Equivalent to
	// const { emailErrors, passwordErrors, passwordConfirmationErrors } = state

	return {
		emailErrors, // same as emailErrors: emailErrors
		passwordErrors,
		passwordConfirmationErrors,
		validatePassword,
		validateEmail,
		validatePasswordConfirmation,
	};
};

export { useRegisterForm };
