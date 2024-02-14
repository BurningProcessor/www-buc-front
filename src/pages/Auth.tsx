import { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { getHeaderTokenFromCookies, setTokenToCookies } from '../helpers/cookies.helper'
import { useAppDispatch } from '../hooks'
import { login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { IResponceLoginData } from '../types/types'
import { instance } from '../api/axios.api'

const Auth: FC = () => {
	const [email, setEmail] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [isLogin, setIsLogin] = useState<boolean>(true)
	const dispatch = useAppDispatch()
	const navigate = useNavigate()

	const registrationHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()

			const data = await AuthService.registration({ email, password })
			if (data) {
				saveLogin(data)
				toast.success('Account has been created.')
			}
		} catch (err: any) {
			toast.error(String(err.response?.data.message))
		}
	}

	const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		try {
			e.preventDefault()

			const loginData = await AuthService.login({ email, password })

			if (loginData) saveLogin(loginData)
			else toast.error('Failed to get profile information')
		} catch (err: any) {
			console.log(err)

			const error = err.response?.data.message
			toast.error(error)
		}
	}

	async function saveLogin(loginData: IResponceLoginData) {
		setTokenToCookies(loginData.token)
		instance.defaults.headers.authorization = getHeaderTokenFromCookies()

		dispatch(login(loginData.user))
		toast.success('You logged id.')
		navigate('/')
	}

	return (
		<div className="card mt-40 flex flex-col items-center justify-center ">
			<h1 className=" mb-10 text-center text-xl ">{isLogin ? 'Login' : 'Registration'}</h1>

			<form
				name=" login / registration "
				onSubmit={isLogin ? loginHandler : registrationHandler}
				className=" mx-auto flex w-1/3 flex-col gap-5 "
			>
				<input
					type="text"
					className="input"
					placeholder="Email"
					onChange={(e) => setEmail(e.target.value)}
				/>
				<input
					type="password"
					className="input"
					placeholder="Password"
					onChange={(p) => setPassword(p.target.value)}
				/>

				<button className="btn btn-green mx-auto">Submit</button>
			</form>

			<div className=" mt-6 flex justify-center ">
				{isLogin ? (
					<button
						name="choiseRegistration"
						onClick={() => setIsLogin(!isLogin)}
						className="inactive-text hover:text-current dark:text-slate-300 dark:hover:text-white"
					>
						You don't have account?
					</button>
				) : (
					<button
						name="choiseLogin"
						onClick={() => setIsLogin(!isLogin)}
						className="inactive-text hover:text-current dark:text-slate-300 dark:hover:text-white"
					>
						Already have an account?
					</button>
				)}
			</div>
		</div>
	)
}

export default Auth
