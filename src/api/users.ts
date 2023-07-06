import { LoginResponse, UserCreateCredentials } from '../types/user'
import Fetcher, { BASE_URL } from './fetcher'

export const registerUser = async (user: UserCreateCredentials) => {
	const data = await Fetcher.post<LoginResponse>(`${BASE_URL}/register`, user)
	return data
}

export const loginUser = async (user: UserCreateCredentials) => {
	const data = await Fetcher.post<LoginResponse>(`${BASE_URL}/login`, user)
	return data
}


export const getUsers = async () => {
	const data = await Fetcher.get<UserCreateCredentials[]>(`${BASE_URL}/users`)
	return data
}