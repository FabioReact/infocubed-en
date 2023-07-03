import { useState } from 'react'

const Counter = () => {
	const initialValue = 0
	const [state, setState] = useState(initialValue)
	const increment = () => {
		setState(state + 1)
	}

	return (
		<section>
			<h1>Counter: {state}</h1>
			<button onClick={increment}>Increment</button>
			<button>Decrement</button>
		</section>
	)
}

// const env_variable = 'sdfsf'

// export { Counter as default, env_variable } // named export
export default Counter // default export
// I can only have ONE default export, but I can have as many named export as I want