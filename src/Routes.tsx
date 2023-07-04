import {
  Route,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Heroes from "./pages/Heroes";

export const router = createBrowserRouter(createRoutesFromElements(
  <Route>
    <Route index element={<p>Home Page</p>} />
    <Route path='heroes' element={<Heroes />} />
  </Route>
));