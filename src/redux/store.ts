import { configureStore } from '@reduxjs/toolkit'
import favoriteHeroesReducer from './reducers/favoriteHeroesSlice'
import { usersApi } from './services/users'

// useReducer((state, action) => {}, initialValues)

export const store = configureStore({
  reducer: {
		favoriteHeroes: favoriteHeroesReducer,
		[usersApi.reducerPath]: usersApi.reducer,
	},
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware().concat(usersApi.middleware)
	},
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch