import { RouterProvider } from "react-router-dom";
import { router } from "./Routes";
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { AuthContextProvider } from './context/auth-context'
import { Suspense } from 'react'
import Spinner from './components/Spinner/Spinner'
import { Provider } from 'react-redux'
import { store } from './redux/store'

const queryClient = new QueryClient()

function App() {
	return (
		<Suspense fallback={<Spinner />}>
			<Provider store={store}>
				<AuthContextProvider>
					<QueryClientProvider client={queryClient}>
						<RouterProvider router={router} />
					</QueryClientProvider>
				</AuthContextProvider>
			</Provider>
		</Suspense>
	);
}

export default App;
