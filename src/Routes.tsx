import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Heroes from "./pages/Heroes";
import Layout from "./hoc/Layout";
// import Home from "./pages/Home";
import Counter from "./pages/Counter";
import HeroDetails from "./pages/HeroDetails";
import Search from "./pages/Search";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Dashboard, { Information, Products, Services } from "./pages/Dashboard";
import PrivateRoute from "./hoc/PrivateRoute";
import Login from "./pages/Login";
import { lazy } from "react";
import Users, { usersLoader } from "./pages/Users";
import { getUsers } from "./api/users";
import Battle from './pages/Battles'

// lazy
const Home = lazy(() => import("./pages/Home"));

// Create a /users Route
// That route shows a page (lazy loaded) that will show the emails of all the users of my app (http://localhost:4000/users)
// You should use the loader prop in the route to access that data

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="heroes" element={<Heroes />} />
			<Route
				path="heroes/:id"
				element={<HeroDetails />}
			/>
			<Route path="search" element={<Search />} />
			<Route
				path="profile"
				element={
					<PrivateRoute>
						<Profile />
					</PrivateRoute>
				}
			/>
			<Route path="users" element={<Users />} loader={usersLoader} />
			<Route path="register" element={<Register />} />
			<Route path="battle" element={<Battle />} />
			<Route path="login" element={<Login />} />
			<Route path="counter" element={<Counter />} />
			<Route path="dashboard" element={<Dashboard />}>
				<Route path="products" element={<Products />} />
				<Route path="services" element={<Services />} />
				<Route path="information" element={<Information />} />
			</Route>
			<Route path="*" element={<p>404 - to implement</p>} />
		</Route>,
	),
);
