import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Heroes from "./pages/Heroes";
import Layout from "./hoc/Layout";
import Home from './pages/Home'
import Counter from './pages/Counter'

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<Home />} />
			<Route path="heroes" element={<Heroes />} />
			<Route path="counter" element={<Counter />} />
			<Route path="*" element={<p>404 - to implement</p>} />
		</Route>,
	),
);
