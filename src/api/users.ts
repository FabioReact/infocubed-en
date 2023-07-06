import { LoginResponse, User } from '../types/user'
import Fetcher, { BASE_URL } from './fetcher'

export const registerUser = async (user: User) => {
	const data = await Fetcher.post<LoginResponse>(`${BASE_URL}/register`, user)
	return data
}

export const loginUser = async (user: User) => {
	const data = await Fetcher.post<LoginResponse>(`${BASE_URL}/login`, user)
	return data
}