import { Outlet, NavLink } from "react-router-dom";
import { useAuthContext } from "../context/auth-context";

const Layout = () => {
	const getActiveClassname = ({
		isActive,
	}: {
		isActive: boolean;
		isPending: boolean;
	}) => (isActive ? "text-red-600" : "");
	// I should only see profile if i'm connected - if the value of connected( inside my AuthContext) is TRUE
	// I should only see register if i'm NOT connected - if the value of connected( inside my AuthContext) is FALSE

	const { connected } = useAuthContext();

	return (
		<div className="flex flex-col min-h-screen">
			<header className="mb-4">
				<nav>
					<ul className="flex justify-center gap-4 font-bold text-xl">
						<li>
							<NavLink className={getActiveClassname} to="/">
								Home
							</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to="/battle">
								Battle
							</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to="/heroes">
								Heroes
							</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to="/search">
								Search
							</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to="/counter">
								Counter
							</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to="/users">
								Users
							</NavLink>
						</li>

						{connected ? (
							<li>
								<NavLink className={getActiveClassname} to="/profile">
									Profile
								</NavLink>
							</li>
						) : (
							<>
							<li>
								<NavLink className={getActiveClassname} to="/register">
									Register
								</NavLink>
							</li>
							<li>
								<NavLink className={getActiveClassname} to="/login">
									Login
								</NavLink>
							</li>
							</>
						)}
					</ul>
				</nav>
			</header>
			<main className="grow">
				<Outlet />
			</main>
		</div>
	);
};

export default Layout;
