import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import Fetcher, { BASE_URL } from "../api/fetcher";
import HeroCard from "../components/HeroCard";
import { Hero } from "../types/hero";

const Search = () => {
	const inputRef = useRef<HTMLInputElement>(null);
	// When the user click on Search, I should show a loading indicator and them show the result for the give request
	// Example: http://localhost:4000/heroes?name_like=hulk

	// If question, troubles, don't hesitate to ask me (vocally or by chat)
	const {
		data: heroes,
		isFetching,
		refetch,
	} = useQuery({
		queryKey: ["searchHero", inputRef.current?.value],
		queryFn: () =>
			Fetcher.get<Hero[]>(
				`${BASE_URL}/heroes?name_like=${inputRef.current?.value}`,
			),
		enabled: !!inputRef.current?.value,
	});

	const onClickHandler = () => {
		console.log(inputRef.current?.value);
		refetch();
	};

	return (
		<section>
			<h1>Search Hero</h1>
			<input className="border-black border-b-2" type="text" ref={inputRef} />
			<button onClick={onClickHandler}>Search</button>
			<div>
				{isFetching && <p>Loading...</p>}
				{!isFetching &&
					heroes &&
					heroes.map((hero) => <HeroCard key={hero.id} hero={hero} />)}
			</div>
		</section>
	);
};

export default Search;
