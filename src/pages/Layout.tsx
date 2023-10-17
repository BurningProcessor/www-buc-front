import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout: FC = () => {
	return (<div className="min-h-screen bg-slate-900 b-p20 font-roboto text-white">
		<Header />
		<div className="pt-10 md:container">
			<Outlet />
		</div>
	</div>)
}

export default Layout