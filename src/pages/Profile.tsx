import { useAuthContext } from "../context/auth-context";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { removeFavoriteHero } from '../redux/reducers/favoriteHeroesSlice'

// I should have a button to remove each hero from my favorite

const Profile = () => {
	const { connected, token, onLogout } = useAuthContext();
	const favoritesHeroes = useAppSelector(
		(state) => state.favoriteHeroes.heroes,
	);
	const dispatch = useAppDispatch()

	const onRemoveHandler = (id: number) => {
		dispatch(removeFavoriteHero(id))
	}

	return (
		<section>
			<h1>Profile</h1>
			<p>Value of connected: {String(connected)}</p>
			<p>Value of token: {String(token)}</p>
			<p>You have {favoritesHeroes.length} favorite heroes.</p>
			{favoritesHeroes.length !== 0 && (
				<ul>
					{favoritesHeroes.map((hero) => (
						<li key={hero.id}>
							{hero.id} - {hero.name}
							<button onClick={() => onRemoveHandler(hero.id)}>Remove</button>
						</li>
					))}
				</ul>
			)}
			<button onClick={onLogout}>Logout</button>
		</section>
	);
};

export default Profile;
