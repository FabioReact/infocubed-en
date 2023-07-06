import { useState } from 'react'
import SelectBattleHero from '../components/SelectBattleHero'
import { Hero } from '../types/hero'
import HeroCard from '../components/HeroCard'

const Battle = () => {
	const [playerOne, setPlayerOne] = useState<Hero | null>(null)
	const [playerTwo, setPlayerTwo] = useState<Hero | null>(null)
	return (
		<>
			<div>Battles</div>
			<div className='flex justify-center gap-24'>
				<SelectBattleHero label='One' selectPlayer={setPlayerOne} />
				<SelectBattleHero label='Two' selectPlayer={setPlayerTwo} />
			</div>
			<div className='flex justify-center gap-24'>
				{playerOne && <HeroCard hero={playerOne} />}
				{playerTwo && <HeroCard hero={playerTwo} />}
			</div>
			{playerOne && playerTwo && (
				<button>Start Battle</button>
			)}
		</>
	)
}

export default Battle