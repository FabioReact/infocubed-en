import { createContext, useContext } from "react";

type AuthContextType = {
	connected: boolean;
	token: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const AuthContext = createContext<AuthContextType>(null!);

type Props = {
	children: React.ReactNode;
};

export const AuthContextProvider = ({ children }: Props) => {
	const values = {
		connected: false,
		token: null,
	};
	return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};


export const useAuthContext = () => useContext(AuthContext)
