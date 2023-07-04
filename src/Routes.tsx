import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Heroes from "./pages/Heroes";
import Layout from "./hoc/Layout";

export const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<Layout />}>
			<Route index element={<p>Home Page</p>} />
			<Route path="heroes" element={<Heroes />} />
			<Route path="*" element={<p>404 - to implement</p>} />
		</Route>,
	),
);
