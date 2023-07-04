import { useEffect, useState } from "react";
import { Hero } from "../types/hero";
import HeroCard from "../components/HeroCard";

const arrayOfLetters: Array<string> = [];
for (let i = 97; i <= 122; i++) {
	arrayOfLetters.push(String.fromCharCode(i));
}

const getHeroesByLetter = (
	letter: string,
	{
		signal,
	}: {
		signal?: any;
	} = {},
) => {
	// const controller = new AbortController();
	// const signal = controller.signal;
	// controller.abort();
	return fetch(`http://localhost:4000/heroes?name_like=^${letter}`, {
		method: "GET", // POST, PATCH, PUT, DELETE
		signal: signal,
	}).then((response) => response.json());
};

const Heroes = () => {
	const [selectedLetter, setSelectedLetter] = useState<string>("a");
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const callback = (letter: string) => {
		setSelectedLetter(letter);
		// First I set loading to true, I clean the potential error, then I make the API call with the letter the user clicked
		// Once I have data (or an error), I set loading to false to show the result
		setIsError(false);
		setIsLoading(true);
		getHeroesByLetter(letter)
			.then((data) => {
				setHeroes(data);
			})
			.catch((err) => {
				console.log(err);
				setIsError(true);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	// API call forbiden here

	useEffect(() => {
		// console.log("Rendering Heroes Page - Only runs on first mount");
		const constroller = new AbortController();
		const signal = constroller.signal;
		// I only set loading to false if my API call was successfull
		getHeroesByLetter("a", { signal: signal })
			.then((data) => {
				setHeroes(data);
				setIsLoading(false);
			})
		return () => {
			constroller.abort();
			// console.log(
			// 	"Clean up effect - Empty dependency array - Will run only once, on unmount",
			// );
		};
	}, []);

	useEffect(() => {
		// Fetch data from backend
		// roomId - subscribe to room with id 101
		// console.log(
		// 	"Rendering Heroes Page - On first mount AND each time selectedLetter changes",
		// );
		return () => {
			// unsubscribe from room id 101
			// console.log(
			// 	"Clean up effect - Will run each time selectedLetter changes",
			// 	selectedLetter,
			// );
		};
	}, [selectedLetter]);

	return (
		<section>
			<h1>Heroes List</h1>
			<ul className="flex justify-center gap-2 uppercase font-semibold text-xl">
				{arrayOfLetters.map((letter) => (
					<li
						key={letter}
						onClick={() => callback(letter)}
						className={
							selectedLetter === letter
								? "text-red-600 cursor-pointer"
								: "cursor-pointer"
						}
					>
						{letter}
					</li>
				))}
			</ul>
			<div className="flex flex-wrap gap-4 justify-center">
				{isLoading && <p>Loading...</p>}
				{isError && (
					<p className="text-red-500">We have an error while fetching heroes</p>
				)}
				{!isLoading && !isError && (
					heroes.map((hero) => <HeroCard key={hero.id} hero={hero} />)
				)}
			</div>
		</section>
	);
};

export default Heroes;
