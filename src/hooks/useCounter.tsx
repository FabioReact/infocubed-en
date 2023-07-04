import { useState } from 'react'

const useCounter = (initialValue = 0) => {
	const [counter, setCounter] = useState(initialValue);

	const increment = () => {
		// setCounter will be asynchronous
		setCounter((previousCounter) => previousCounter + 1);
	};

	const decrement = () => {
		setCounter((previousCounter) => previousCounter - 1);
	};

	return {
		counter,
		increment,
		decrement
	}
}

export { useCounter }