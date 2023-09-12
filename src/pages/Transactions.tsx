import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import { instance } from '../api/axios.api'
import { ICategory } from '../types/types'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'

export const transactionsLoader = async () => {
	const categories = await instance.get<ICategory[]>('/categories')
	const transactions = await instance.get('/transactions')
	const data = {
		categories: categories.data,
		transactions: transactions.data
	}
	return data
}

export const transactionsAction = async ({ request }: any) => {
	switch (request.method) {
		case 'POST': {
			const formData = await request.formData()
			const newTransaction = {
				title: formData.get('title'),
				amount: +formData.get('amount'),
				category: +formData.get('category'),
				type: formData.get('type')
			}

			await instance.post('/transactions', newTransaction)
			toast.success('Transaction added.')
			return null
		}
		case 'DELETE': {
			const formData = await request.formData()
			const transactionId = formData.get('id')
			await instance.delete(`/transactions/transaction/${transactionId}`)
			toast.success('Transaction deleted.')
			return null
		}
	}
}

const Transactions: FC = () => {
	return <>
		<div className='mt-4 grid grid-cols-3 items-start gap-4'>
			{/* Add transactions form */}
			<div className='col-span-2 grid'><TransactionForm /></div>

			{/* Statistic blocks */}
			<div className="rounded-md bg-slate-800 p-3">
				<div className="grid grid-cols-2 gap-3">
					<div>
						<p className='uppercase text-md text-center font-bold'
						>
							Total Income:
						</p>
						<p className='mt-2 rounded-sm bg-green-600 p-1 text-center'
						>
							1000$
						</p>
					</div>
					<div>
						<p className='uppercase text-center font-bold'
						>
							Total Expense:
						</p>
						<p className='mt-2 rounded-sm bg-red-500 p-1 text-center'
						>
							1000$
						</p>

					</div>
					<>Chart</>
				</div>
			</div>
		</div>

		{/* transactions table */}
		<h1 className='my-5'><TransactionTable /></h1>
	</>
}

export default Transactions