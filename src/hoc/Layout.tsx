import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div>
			<header>
				<nav>
					<ul>
						<li>Home</li>
						<li>Heroes</li>
					</ul>
				</nav>
			</header>
			<main>
				<Outlet />
			</main>
		</div>
	);
};

export default Layout
