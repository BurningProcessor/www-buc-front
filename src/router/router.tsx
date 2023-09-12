import { createBrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'
import Transactions, { transactionsAction, transactionsLoader } from '../pages/Transactions'
import Categories, { categoriesAction, categoryLoader } from '../pages/Categories'
import Auth from '../pages/Auth'
import Layout from '../pages/Layout'
import ErrorPage from '../pages/ErrorPage'
import { ProtectedRoute } from '../components/ProtectedRoute'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: 'transactions',
				loader: transactionsLoader,
				action: transactionsAction,
				element: <ProtectedRoute>
					<Transactions />
				</ProtectedRoute>
			},
			{
				path: 'categories',
				action: categoriesAction,
				loader: categoryLoader,
				element: <ProtectedRoute>
					<Categories />
				</ProtectedRoute>
			},
			{
				path: 'auth',
				element: <Auth />,
			},
		],
	},
])
