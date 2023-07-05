import { Outlet, NavLink } from 'react-router-dom'

const Layout = () => {
	const getActiveClassname = ({ isActive }: {
		isActive: boolean
		isPending: boolean
	}) => (isActive ? 'text-red-600' : '')
	return (
		<div>
			<header className='mb-4'>
				<nav>
					<ul className='flex justify-center gap-4 font-bold text-xl'>
						<li>
							<NavLink className={getActiveClassname} to='/'>Home</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to='/heroes'>Heroes</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to='/search'>Search</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to='/counter'>Counter</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to='/register'>Register</NavLink>
						</li>
						<li>
							<NavLink className={getActiveClassname} to='/profile'>Profile</NavLink>
						</li>
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
