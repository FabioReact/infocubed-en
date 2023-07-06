// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../api/fetcher'
import { User } from '../../types/user'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${BASE_URL}/` }),
  endpoints: (builder) => ({
		getUsers: builder.query<User[], void>({
			query: () => 'users'
		})
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery, useLazyGetUsersQuery } = usersApi