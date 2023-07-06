export type User = {
	email: string;
	password: string;
}

export type LoginResponse = {
	accessToken: string,
	user: User & {id: number}
}