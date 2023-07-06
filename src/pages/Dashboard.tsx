import { Link, Outlet, useLocation } from "react-router-dom";

const sharedClassnames = ''

export const Products = () => <p className={sharedClassnames + " bg-red-400"}>Products Info</p>;
export const Services = () => (
	<p className={sharedClassnames + " bg-green-400"}>Services Component</p>
);
export const Information = () => (
	<p className={sharedClassnames + " bg-blue-400"}>Information Component</p>
);

const Dashboard = () => {
	const location = useLocation();
	return (
		<section>
			<h1>Dashboard</h1>
			<p>Current Route: {location.pathname}</p>
			<ul>
				<li>
					<Link to="products">Products</Link>
				</li>
				<li>
					<Link to="services">Services</Link>
				</li>
				<li>
					<Link to="information">Information</Link>
				</li>
			</ul>
			<div className="flex">
				<div className="bg-slate-400">Shared part with all sub components</div>
				<Outlet />
			</div>
		</section>
	);
};

export default Dashboard;