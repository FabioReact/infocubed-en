export type UserCreateCredentials = {
	email: string;
	password: string;
};

export type LoginResponse = {
	accessToken: string;
	user: UserCreateCredentials & { id: number };
};

export type User = {
	id: number;
	email: string;
	password: string;
};
