import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";
import Fetcher, { BASE_URL } from "../api/fetcher";
import HeroCard from "../components/HeroCard";
import { Hero } from "../types/hero";
import Loading from "../hoc/Loading";

const Search = () => {
	const inputRef = useRef<HTMLInputElement>(null);
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
				<Loading isLoading={isFetching}>
					{heroes &&
						heroes.map((hero) => <HeroCard key={hero.id} hero={hero} />)}
				</Loading>
			</div>
		</section>
	);
};

export default Search;
