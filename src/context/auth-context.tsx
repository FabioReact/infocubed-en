import { createContext, useContext, useState } from "react";

type AuthContextType = {
	connected: boolean;
	token: string | null;
	onLogin: (accessToken: string) => void;
	onLogout: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = createContext<AuthContextType>(null!);

type Props = {
	children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
	const [connected, setConnected] = useState(false);
	const [token, setToken] = useState<string | null>(null);

	const onLogin = (accessToken: string) => {
		setConnected(true);
		setToken(accessToken);
	};

	const onLogout = () => {
		setConnected(false);
		setToken(null);
	}

	const values = {
		connected, // connected: connected,
		token,
		onLogin,
		onLogout,
	};

	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
