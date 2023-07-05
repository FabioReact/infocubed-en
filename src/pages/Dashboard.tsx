import { Link, Outlet, useLocation } from 'react-router-dom'

export const Products = () => <p className='bg-red-400'>Products Info</p>
export const Services = () => <p className='bg-green-400'>Services Component</p>
export const Information = () => <p className='bg-blue-400'>Information Component</p>

const Dashboard = () => {
	const location = useLocation()
	return (
		<section>
			<h1>Dashboard</h1>
			<p>{location.pathname}</p>
			<ul>
				<Link to="products">Products</Link>
				<Link to="services">Services</Link>
				<Link to="information">Information</Link>
			</ul>
			<div className='flex grow'>
				<div className='bg-slate-400'>Shared part with all sub components</div>
				<Outlet />
			</div>
		</section>
	)
}

export default Dashboard