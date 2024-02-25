import { FC, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromCookies } from '../helpers/cookies.helper'
import { toast } from 'react-toastify'

const Header: FC = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [openMenu, setOpenMenu] = useState(Boolean)

	function logoutHandler() {
		dispatch(logout()), removeTokenFromCookies(), toast.success('You logged out.'), navigate('/')
	}

	const menuCheckbox = document.querySelector<HTMLInputElement>('#menu_checkbox')

	function closeMenu() {
		menuCheckbox ? (menuCheckbox.checked = false) : null
		setOpenMenu(false)
	}

	return (
		<header className="fixed left-0 right-0 top-0 z-10 flex items-center justify-between rounded-lg bg-white p-4 shadow-sm backdrop-blur-sm dark:bg-slate-800">
			{isAuth && (
				<div className="menu-btn mr-2 space-y-2 md:hidden">
					<input
						className="z-10"
						id="menu_checkbox"
						type="checkbox"
						onChange={() => (!openMenu ? setOpenMenu(true) : setOpenMenu(false))}
					/>
					<span />
				</div>
			)}

			{/* Logo */}
			<Link className="flex-none text-gray-700 dark:text-white" to="/">
				<FaBtc size={20} />
			</Link>
			<div className="grow"></div>

			{/* Menu */}
			{isAuth && (
				<nav className="menu">
					<ul className={`md:flex md:gap-5 ${openMenu ? '' : 'hidden'}`}>
						<li className="m-4 md:m-auto">
							<NavLink
								to={'/'}
								className={({ isActive }) => (isActive ? '' : 'inactive-text')}
								onClick={() => closeMenu()}
							>
								Home
							</NavLink>
						</li>

						<li className="m-4 md:m-auto">
							<NavLink
								to={'/transactions'}
								className={({ isActive }) => (isActive ? '' : 'inactive-text')}
								onClick={() => closeMenu()}
							>
								Transactions
							</NavLink>
						</li>

						<li className="m-4 md:m-auto">
							<NavLink
								to={'/categories'}
								className={({ isActive }) => (isActive ? '' : 'inactive-text')}
								onClick={() => closeMenu()}
							>
								Categories
							</NavLink>
						</li>
					</ul>
				</nav>
			)}

			{/* Actions */}
			{isAuth ? (
				<button className="btn btn-red ml-5" onClick={() => logoutHandler()}>
					<span>Logout</span>
					<FaSignOutAlt />
				</button>
			) : (
				<Link
					className="inactive-text ml-auto py-2 hover:text-current dark:text-white/50 dark:hover:text-white"
					to={'auth'}
				>
					Login / Signin
				</Link>
			)}
		</header>
	)
}

export default Header
