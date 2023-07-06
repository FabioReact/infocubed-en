import { useLoaderData } from 'react-router-dom'
import { User } from '../types/user'
import { getUsers } from '../api/users'

const Users = () => {
	const users = useLoaderData() as User[]
	return (
		<section>
			<h1>Users</h1>
			<ul>
				{users.map(user => <li key={user.id}>{user.email}</li>)}
			</ul>
		</section>
	)
}

export const usersLoader = () => getUsers()

export default Users