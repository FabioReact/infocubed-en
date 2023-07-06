import { useRef } from "react";
import { useLazyGetHeroByNameQuery } from "../redux/services/heroes";
import HeroLabel from "./HeroLabel";
import Loading from "../hoc/Loading";
import { Hero } from "../types/hero";

type Props = {
	label?: string;
	selectPlayer?: (hero: Hero) => void;
};

const SelectBattleHero = ({
	label = "",
	selectPlayer = (hero) => {
		void hero;
	},
}: Props) => {
	const inputRef = useRef<HTMLInputElement>(null);
	const [getHeroesbyName, { isError, isFetching, isLoading, data, isSuccess }] =
		useLazyGetHeroByNameQuery();
	const onSubmitHandler = (event: React.FormEvent) => {
		event.preventDefault();
		if (inputRef.current?.value) getHeroesbyName(inputRef.current?.value);
	};
	return (
		<section>
			<form onSubmit={onSubmitHandler}>
				<label htmlFor={`player${label}`}>Select Player {label}</label>
				<input
					type="text"
					ref={inputRef}
					id={`player${label}`}
					name={`player${label}`}
				/>
				<button type="submit" className='btn'>Search</button>
			</form>
			<Loading isLoading={isLoading || isFetching}>
				{isError && <p className="text-red-500">Error while fetching hero</p>}
				{isSuccess && data && (
					<div className="inline-block">
						{data.map((hero) => (
							<HeroLabel
								key={hero.id}
								id={hero.id}
								name={hero.name}
								onClick={() => selectPlayer(hero)}
							/>
						))}
					</div>
				)}
			</Loading>
		</section>
	);
};

export default SelectBattleHero;
