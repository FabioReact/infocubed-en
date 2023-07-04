import { useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import { useGetHeroesByLetter } from '../hooks/useGetHeroesByLetter'

const arrayOfLetters: Array<string> = [];
for (let i = 97; i <= 122; i++) {
	arrayOfLetters.push(String.fromCharCode(i));
}

const Heroes = () => {
	const [selectedLetter, setSelectedLetter] = useState<string>("a");
	const { isLoading, isError, heroes, refetch } = useGetHeroesByLetter();
	const callback = (letter: string) => {
		setSelectedLetter(letter);
		refetch(letter);
	};

	// API call forbiden here

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
				{!isLoading &&
					!isError &&
					heroes.map((hero) => <HeroCard key={hero.id} hero={hero} />)}
			</div>
		</section>
	);
};

export default Heroes;
