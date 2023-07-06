import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
// import HeroCard from '../components/HeroCard'
import { Suspense, lazy } from "react";
import { getHeroById } from '../api/heroes'
import { useAppDispatch } from '../redux/hooks'
import { addFavoriteHero } from '../redux/reducers/favoriteHeroesSlice'

const HeroCard = lazy(
	() =>
		new Promise(resolve => {
			setTimeout(() => resolve(import("../components/HeroCard") as any), 1500)
		}),
);

const HeroDetails = () => {
	const { id } = useParams();
	const dispatch = useAppDispatch()
	// getHeroById/3 -> fetch -> (cached)
	// getHeroById/5 -> fetch -> (cached)
	// getHeroById/5 -> cached
	// getHeroById/3 -> cached
	const {
		data: hero,
		isLoading,
		isError,
		isSuccess,
		error,
	} = useQuery({
		queryKey: ["getHeroById", id],
		queryFn: () => getHeroById(id as string),
		cacheTime: 20,
		// enabled: false
	});

	const onAddToFavorite = () => {
		if (hero) {
			dispatch(addFavoriteHero(hero))
		}
	}

	return (
		<section>
			<h1>Hero Details</h1>
			{isLoading && <p>Loading Data...</p>}
			{isError && (
				<p className="text-red-500">Error: {(error as any)?.message}</p>
			)}
			<Suspense fallback={<p>Loading Hero...</p>}>
				{isSuccess &&
				<>
					<button onClick={onAddToFavorite}>Add to favorite</button>
					<HeroCard hero={hero} />
				</>
				}
			</Suspense>
		</section>
	);
};

export default HeroDetails;
