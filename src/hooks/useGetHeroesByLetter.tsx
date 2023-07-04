import { useEffect, useState } from "react";
import { Hero } from "../types/hero";
import Fetcher, { BASE_URL } from '../api/fetcher'

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
	return Fetcher.get<Hero[]>(`${BASE_URL}?name_like=^${letter}`, {
		method: "GET", // POST, PATCH, PUT, DELETE
		signal: signal,
	});
};

const useGetHeroesByLetter = () => {
	const [heroes, setHeroes] = useState<Hero[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);

	const refetch = (letter: string) => {
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

	useEffect(() => {
		// console.log("Rendering Heroes Page - Only runs on first mount");
		const constroller = new AbortController();
		const signal = constroller.signal;
		// I only set loading to false if my API call was successfull
		getHeroesByLetter("a", { signal: signal }).then((data) => {
			setHeroes(data);
			setIsLoading(false);
		});
		return () => {
			constroller.abort();
			// console.log(
			// 	"Clean up effect - Empty dependency array - Will run only once, on unmount",
			// );
		};
	}, []);

	return {
		isLoading: isLoading,
		isError: isError,
		heroes: heroes,
		refetch: refetch,
	};
};

export { useGetHeroesByLetter };
