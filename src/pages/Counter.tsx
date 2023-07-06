import React, { useCallback, useMemo, useState } from "react";
import { useCounter } from "../hooks/useCounter";
import { useRenderCount } from "@uidotdev/usehooks";

const ChildComponent = React.memo(() => {
	const renderCounter = useRenderCount();
	console.log("Render of Child Component");
	return (
		<p className="p-4">
			Render of some child component - Renderer {renderCounter} times
		</p>
	);
});

type ButtonProps = {
	children: React.ReactNode;
	onClick: () => void;
};

// React.memo - Usefull to memoize components
const Button = React.memo(({ children, onClick }: ButtonProps) => {
	const renderCounter = useRenderCount();
	return (
		<button onClick={onClick}>
			{children} - R{renderCounter}
		</button>
	);
});

const expensiveCompute = (a: number, b:number) => {
	let counter = 1000000000
	while (counter > 0) {
		counter--
	}
	return a * b
}

// I can memoize components with React.memo
// I can memoize function references with useCallback
// I can memoize function results with useMemo

const Counter = () => {
	const [counter, setCounter] = useState(0);
	const [number, setNumber] = useState(1);

	// useMemo will save in memory a function result depending on the dependancy array
	// if any value in the dependancy changes, the callback inside useMemo will fire again
	// if the values do not change, useMemo returns the previous value in memory
	const expensiveValue = useMemo(() => expensiveCompute(number, 5), [number]);

	// useCallback is usefull to memoize the reference of a function
	// useCallback will create a new reference ONLY if a value inside de dependancy array changes
	const increment = useCallback(() => {
		setCounter((c) => c + 1);
	}, []);

	const decrement = useCallback(() => {
		setCounter((c) => c - 1);
	}, []);

	const incrementByX = useCallback(() => {
		setCounter((c) => c + number);
	}, [number]);

	// Assignment
	// Increment by X should increment my counter by the current value of 'number'
	// The button should not re-render by i click on increment/decrement button

	return (
		<section>
			<h1>Counter: {counter}</h1>
			<ChildComponent />
			<p>Result of expensiveCompute: {expensiveValue}</p>
			<label htmlFor="">Add/substract:</label>
			<input
				type="number"
				value={number}
				onChange={(e) => setNumber(e.target.valueAsNumber)}
			/>
			<Button onClick={increment}>Increment</Button>
			<Button onClick={decrement}>Decrement</Button>
			<Button onClick={incrementByX}>Increment by X</Button>
		</section>
	);
};

export default Counter;
