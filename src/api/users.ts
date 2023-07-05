import { User } from '../types/user'
import Fetcher, { BASE_URL } from './fetcher'

export const registerUser = async (user: User) => {
	const data = await Fetcher.post(`${BASE_URL}/register`, user)
	return data
}