import Spinner from '../components/Spinner/Spinner'

type LoadingProps = {
	isLoading: boolean
	children: React.ReactNode
}

const Loading = ({ isLoading, children }: LoadingProps) => {
	if (isLoading)
		return <Spinner />
	return children
	// If i'm loading, i only want to display a spinner
	// if not, i return the child component
}

export default Loading