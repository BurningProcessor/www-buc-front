import { FC, useState } from 'react'
import { AuthService } from '../services/auth.service'
import { toast } from 'react-toastify'
import { setTokenToLocalStorage } from '../helpers/cookie.helper'
import { useAppDispatch } from '../hooks'
import { login } from '../store/user/userSlice'
import { useNavigate } from 'react-router-dom'
import { IResponceLoginData } from '../types/types'

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
		setTokenToLocalStorage(loginData.token)

		dispatch(login(loginData.user))
		toast.success('You logged id.')
		navigate('/')
	}

	return <div className=' mt-40 flex flex-col justify-center items-center bg-slate-900 text-white '>
		<h1 className=' text-center text-xl mb-10 '>
			{isLogin ? 'Login' : 'Registration'}
		</h1>

		<form name=' login / registration '
			onSubmit={isLogin ? loginHandler : registrationHandler}
			className=' flex w-1/3 flex-col mx-auto gap-5 '
		>
			<input
				type='text'
				className='input'
				placeholder='Email'
				onChange={(e) => setEmail(e.target.value)}
			/>
			<input
				type='password'
				className='input'
				placeholder='Password'
				onChange={(p) => setPassword(p.target.value)}
			/>

			<button className='btn btn-green mx-auto'>Submit</button>
		</form>

		<div className=' flex justify-center mt-6 '>
			{
				isLogin ? (
					<button name='choiseRegistration'
						onClick={() => setIsLogin(!isLogin)}
						className=' text-slate-300 hover:text-white '
					>
						You don't have account?
					</button>
				) : (
					<button name='choiseLogin'
						onClick={() => setIsLogin(!isLogin)}
						className=' text-slate-300 hover:text-white '
					>
						Already have an account?
					</button>
				)
			}
		</div>
	</div>
}

export default Auth