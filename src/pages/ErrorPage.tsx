import { FC } from 'react'
import img404 from '../assets/404.jpg'
import { Link } from 'react-router-dom'

const ErrorPage: FC = () => {
	return (
		<div className="flex flex-col items-center justify-center gap-10 bg-slate-900 font-roboto text-white">
			<img src={img404} alt="img" className="w-80" />
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