import { useState } from "react";
import { Hero } from "../types/hero";
import Fetcher, { BASE_URL } from '../api/fetcher'

const getHeroesByName = (
	letter: string,
	{
		signal,
	}: {
		signal?: any;
	} = {},
) => {
	return Fetcher.get<Hero[]>(`${BASE_URL}/heroes?name_like=${letter}`, {
		method: "GET", // POST, PATCH, PUT, DELETE
		signal: signal,
	});
};

const useGetHeroesByName = () => {
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);

	const fetchHeroesByName = (name: string) => {
		setIsError(false);
		setIsLoading(true);
		getHeroesByName(name)
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

	return {
		isLoading: isLoading,
		isError: isError,
		heroes: heroes,
		fetchHeroesByName: fetchHeroesByName,
	};
};

export { useGetHeroesByName };
