import { useEffect, useState } from "react";
import { Hero } from '../types/hero'

const arrayOfLetters: Array<string> = [];
for (let i = 97; i <= 122; i++) {
	arrayOfLetters.push(String.fromCharCode(i));
}

const Heroes = () => {
	const [selectedLetter, setSelectedLetter] = useState<string>("a");
	const [heroes, setHeroes] = useState<Hero[]>([]);
	// When i click on a letter, the li tag have to turn red
	const callback = (letter: string) => {
		console.log("A list item was clicked", letter);
		setSelectedLetter(letter);
	};

	// API call forbiden here

	useEffect(() => {
		// API call
		fetch(`http://localhost:4000/heroes?name_like=^a`, {
			method: "GET", // POST, PATCH, PUT, DELETE
		})
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
				setHeroes(data)
			});

		console.log("Rendering Heroes Page - Only runs on first mount");
		return () => {
			console.log(
				"Clean up effect - Empty dependency array - Will run only once, on unmount",
			);
		};
	}, []);

	useEffect(() => {
		// Fetch data from backend
		// roomId - subscribe to room with id 101
		console.log(
			"Rendering Heroes Page - On first mount AND each time selectedLetter changes",
		);
		return () => {
			// unsubscribe from room id 101
			console.log(
				"Clean up effect - Will run eacg time selectedLetter changes",
				selectedLetter,
			);
		};
	}, [selectedLetter]);

	return (
		<section>
			<h1>Heroes List</h1>
			<ul className="flex justify-center gap-2 uppercase font-semibold text-xl">
				{arrayOfLetters.map((letter) => (
					<li
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
			<div>
				{heroes.map(hero => <p key={hero.id}>{hero.name}</p> )}
			</div>
		</section>
	);
};

export default Heroes;
