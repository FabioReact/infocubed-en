import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";

type Props = {
	children: React.ReactNode
}

const PrivateRoute = ({ children }: Props) => {
	const { connected } = useAuthContext();

	if (!connected) return <Navigate to="/register" />;

	return children;
};

export default PrivateRoute;
