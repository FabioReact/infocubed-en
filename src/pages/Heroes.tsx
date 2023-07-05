import { useEffect, useState } from "react";
import HeroCard from "../components/HeroCard";
import { useGetHeroesByLetter } from "../hooks/useGetHeroesByLetter";
import { Link } from "react-router-dom";
import Loading from "../hoc/Loading";

const arrayOfLetters: Array<string> = [];
for (let i = 97; i <= 122; i++) {
	arrayOfLetters.push(String.fromCharCode(i));
}

const Heroes = () => {
	const [selectedLetter, setSelectedLetter] = useState<string>("a");
	const { heroes, isError, isLoading, refetch } = useGetHeroesByLetter();
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
				<Loading isLoading={isLoading}>
					{isError && (
						<p className="text-red-500">
							We have an error while fetching heroes
						</p>
					)}
					{!isError &&
						heroes.map((hero) => (
							<Link to={`${hero.id}`}>
								<HeroCard key={hero.id} hero={hero} />
							</Link>
						))}
				</Loading>
			</div>
		</section>
	);
};

export default Heroes;
