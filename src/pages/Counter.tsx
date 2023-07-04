import { useCounter } from '../hooks/useCounter'

const Counter = () => {
	// const [connected, setConnected] = useState(false);
	const { counter, increment, decrement } = useCounter();

	return (
		<section>
			<h1>Counter: {counter}</h1>
			<button onClick={increment}>Increment</button>
			<button onClick={decrement}>Decrement</button>
			{/* <button onClick={() => setConnected((b) => !b)}>
				Connected: {connected.toString()}
			</button> */}
		</section>
	);
};

// const env_variable = 'sdfsf'

// export { Counter as default, env_variable } // named export
export default Counter; // default export
// I can only have ONE default export, but I can have as many named export as I want
