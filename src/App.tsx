import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthContextProvider } from './context/auth-context'

const queryClient = new QueryClient()

function App() {
	return (
		<AuthContextProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</AuthContextProvider>
	);
}

export default App;
