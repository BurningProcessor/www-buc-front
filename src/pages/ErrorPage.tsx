import { FC } from 'react'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-10 bg-slate-900 font-roboto text-white min-h-screen">
			<div>
				<h1 className='text-9xl'>404</h1>
				<p className='text-xl text-center'>Page not found</p>
			</div>
			<Link
				to={'/'}
				className="rounded-md bg-sky-500 px-6 py-2 hover:bg-sky-600"
			>
				На главную
			</Link>
		</div>
	)
}

export default ErrorPage