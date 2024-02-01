import { FC, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { FaBtc, FaSignOutAlt } from 'react-icons/fa'
import { useAuth } from '../hooks/useAuth'
import { useAppDispatch } from '../hooks'
import { logout } from '../store/user/userSlice'
import { removeTokenFromLocalStorage } from '../helpers/cookie.helper'
import { toast } from 'react-toastify'

const Header: FC = () => {
	const isAuth = useAuth()
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const [openMenu, setOpenMenu] = useState(Boolean)

	function logoutHandler() {
		dispatch(logout()),
		removeTokenFromLocalStorage(),
		toast.success('You logged out.'),
		navigate('/')
	}

	const menuCheckbox = document.querySelector<HTMLInputElement>('#menu_checkbox')

	function closeMenu() {
		menuCheckbox ? menuCheckbox.checked = false : null
		setOpenMenu(false)
	}

	return <header className="fixed top-0 left-0 right-0 z-10 rounded-lg flex items-center justify-between bg-slate-800 p-4 shadow-sm backdrop-blur-sm">
		{isAuth && (
			<div className="menu-btn space-y-2 mr-2 md:hidden" >
				<input className='b-menu-c z-10'
					id='menu_checkbox'
					type="checkbox"
					onChange={() =>
						!openMenu ? setOpenMenu(true) : setOpenMenu(false)
					}
				/>
				<span></span>
			</div>
		)}
		
		{/* Logo */}
		<Link className='flex-none' to="/">
			<FaBtc size={20} />
		</Link>
		<div className='grow'></div>

		{/* Menu */}
		{isAuth && (
			<nav className="menu">
				<ul className={`md:flex md:gap-5 ${openMenu ? '' : 'hidden'}`}>
					<li className='m-4 md:m-auto'><NavLink
						to={'/'}
						className={({ isActive }) =>
							isActive ? 'text-white' : 'text-white/60'
						}
						onClick={ () => closeMenu() }
					>Home</NavLink></li>

					<li className='m-4 md:m-auto'><NavLink
						to={'/transactions'}
						className={({ isActive }) =>
							isActive ? 'text-white' : 'text-white/60'
						}
						onClick={ () => closeMenu() }
					>Transactions</NavLink></li>

					<li className='m-4 md:m-auto'><NavLink
						to={'/categories'}
						className={({ isActive }) =>
							isActive ? 'text-white' : 'text-white/60'
						}
						onClick={ () => closeMenu() }
					>Categories</NavLink></li>
				</ul>
			</nav>
		)}

		{/* Actions */}
		{isAuth ? (
			<button
				className="btn btn-red ml-5"
				onClick={ () => logoutHandler() }
			>
				<span>Logout</span>
				<FaSignOutAlt />
			</button>
		) : (
			<Link
				className="py-2 ml-auto text-white/50 hover:text-white"
				to={'auth'}
			>
				Login / Signin
			</Link>
		)}
	</header>
}

export default Header