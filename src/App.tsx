import { RouterProvider } from 'react-router-dom'
import { router } from './router/router'
import { useAppDispatch } from './hooks'
import { getTokenFromCookies } from './helpers/cookies.helper'
import { AuthService } from './services/auth.service'
import { login, logout } from './store/user/userSlice'
import { useEffect } from 'react'

function App() {
	const dispatch = useAppDispatch()

	const checkAuth = async () => {
		const token = getTokenFromCookies()
		try {
			if (token) {
				const data = await AuthService.getProfile()

				data ? dispatch(login(data)) : dispatch(logout())
			}
		} catch (error) { console.log(error) }
	}

	useEffect(() => {
		checkAuth()
	}, [])

	return <RouterProvider router={router} />
}

export default App