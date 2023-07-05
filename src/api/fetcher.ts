import axios from "axios";

const BASE_URL = "http://localhost:4000";

type ErrorType = {
	statusCode: number;
	errorMessage: string;
};

class Fetcher {
	static async get<T = unknown>(
		url: string,
		options = {
			method: "GET",
			// signal: typeof AbortSignal,
		} as {
			method: string;
			signal: AbortSignal;
		},
	) {
		// return fetch(url, options).then(response => response.json())
		// .catch(err => {
		// 	return {
		// 		statusCode: 404
		// 		errorMessage: 'Ressource not found'
		// 	}
		// })
		const response = await axios.get<T>(url, options)
		return response.data
	}

	static async post<T>(url: string, data: unknown) {
		const response = await axios.post<T>(url, data)
		return response.data
	}
}

export { Fetcher as default, BASE_URL };
