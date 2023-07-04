import axios from 'axios'

const BASE_URL = 'http://localhost:4000'

class Fetcher {
	static get<T = unknown>(url: string, options = {
		method: 'GET'
	}) {
		// return fetch(url, options).then(response => response.json())
		return axios.get<T>(url, options)
	}
}

export { Fetcher as default, BASE_URL }
