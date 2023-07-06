import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { Hero } from '../../types/hero'

export interface State {
  heroes: Hero[]
}

const initialState: State = {
  heroes: []
}

export const favoriteHeroesSlice = createSlice({
  name: 'favoriteHeroes',
  initialState,
  reducers: {
		addFavoriteHero: (state, action: PayloadAction<Hero>) => {
			state.heroes.push(action.payload);
		},
		removeFavoriteHero: (state, action: PayloadAction<number>) => {
			const index = state.heroes.findIndex(hero => hero.id === action.payload)
			if (index !== -1) {
				state.heroes.splice(index)
			}
		}
  },
})

// Action creators are generated for each case reducer function
export const { addFavoriteHero, removeFavoriteHero } = favoriteHeroesSlice.actions

export default favoriteHeroesSlice.reducer