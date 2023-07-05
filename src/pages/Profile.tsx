// rafce

import { useAuthContext } from '../context/auth-context'

const Profile = () => {
	const { connected, token } = useAuthContext()
	return (
		<section>
			<h1>Profile</h1>
			<p>Value of connected: {String(connected)}</p>
			<p>Value of token: {String(token)}</p>
		</section>
	)
}

export default Profile