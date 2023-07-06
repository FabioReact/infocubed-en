import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../api/fetcher'
import { Hero } from '../../types/hero'

export const heroesApi = createApi({
  reducerPath: 'heroesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  endpoints: (builder) => ({
		getHeroByName: builder.query<Hero[], string>({
			query: (name) => `heroes/?name_like=${name}`
		})
  }),
})

export const { useGetHeroByNameQuery, useLazyGetHeroByNameQuery } = heroesApi