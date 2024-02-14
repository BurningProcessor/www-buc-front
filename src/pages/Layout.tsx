import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const Layout: FC = () => {
	return (
		<div className="b-p20 min-h-screen font-roboto dark:text-white">
			<Header />
			<div className="pt-10 md:container">
				<Outlet />
			</div>
		</div>
	)
}

export default Layout
