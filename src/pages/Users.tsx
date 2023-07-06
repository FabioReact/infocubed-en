import { useLoaderData } from 'react-router-dom'
import { User } from '../types/user'
import { getUsers } from '../api/users'
import { useGetUsersQuery } from '../redux/services/users'
import Loading from '../hoc/Loading'

// If i'm using Redux AND i need a cache: RTK Query
// If i'm NOT using Redux AND i need a cache: React Query
// If i don't need a cache: React Router

const Users = () => {
	const users = useLoaderData() as User[]
	const { isLoading, isSuccess, data } = useGetUsersQuery()
	return (
		<section>
			<h1>Users</h1>
			<h2>With React Router:</h2>
			<ul>
				{users.map(user => <li key={user.id}>{user.email}</li>)}
			</ul>
			<h2 className='mt-5'>With RTK (React ToolKit) Query:</h2>
			<Loading isLoading={isLoading}>
				<ul>
					{isSuccess && data.map(user => <li key={user.id}>{user.email}</li>)}
				</ul>
			</Loading>
		</section>
	)
}

export const usersLoader = () => getUsers()

export default Users