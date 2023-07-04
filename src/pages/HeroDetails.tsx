import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Fetcher, { BASE_URL } from '../api/fetcher'
import HeroCard from '../components/HeroCard'
import { Hero } from '../types/hero'

const HeroDetails = () => {
	const { id } = useParams();
	// getHeroById/3 -> fetch -> (cached)
	// getHeroById/5 -> fetch -> (cached)
	// getHeroById/5 -> cached
	// getHeroById/3 -> cached
	const { data: hero, isLoading, isError, isSuccess, error } = useQuery({
		queryKey: ["getHeroById", id],
		queryFn: () => Fetcher.get<Hero>(`${BASE_URL}/heroes/${id}`),
		cacheTime: 20,
		// enabled: false
	});

	return (
		<section>
			<h1>Hero Details - {id}</h1>
			{isLoading && <p>Loading...</p>}
			{isError && <p className='text-red-500'>Error: {error?.message}</p>}
			{isSuccess && <HeroCard hero={hero} />}
		</section>
	);
};

export default HeroDetails;
