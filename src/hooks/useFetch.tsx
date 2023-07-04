import { useEffect, useState } from 'react'

const useFetch = (url: string) => {
	const [error, setError] = useState<string|null>(null)
	const [data, setData] = useState<unknown|null>(null)
	useEffect(() => {
		const controller = new AbortController()
		fetch(url, {
			signal: controller.signal,
		}).then(response => {
			if (response.status >= 500) {
				setError(response.statusText)
			}
			return response.json()
		}).then(data => {
			setData(data)
		}).catch(e => {
			if (e.name !== 'AbortError') {
				setError(e)
			}
		})
		return () => {
			controller.abort()
		}
	}, [url])

	return {
		error,
		data
	}
}

export { useFetch }