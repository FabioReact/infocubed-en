import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthContextProvider } from './context/auth-context'
import { Suspense } from 'react'
import Spinner from './components/Spinner/Spinner'

const queryClient = new QueryClient()

function App() {
	return (
		<Suspense fallback={<Spinner />}>
			<AuthContextProvider>
				<QueryClientProvider client={queryClient}>
					<RouterProvider router={router} />
				</QueryClientProvider>
			</AuthContextProvider>
		</Suspense>
	);
}

export default App;
