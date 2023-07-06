import { Hero } from '../types/hero'
import Fetcher, { BASE_URL } from './fetcher'

export const getHeroById = (id: string) => Fetcher.get<Hero>(`${BASE_URL}/heroes/${id}`)