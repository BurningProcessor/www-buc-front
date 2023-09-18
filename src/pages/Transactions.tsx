import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import { instance } from '../api/axios.api'
import { ICategory, IResponseTransactionLoader } from '../types/types'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'
import { useLoaderData } from 'react-router-dom'
import { formatToUSD } from '../helpers/currency.helper'
import Chart from '../components/Chart'

export const transactionsLoader = async () => {
	const categories = await instance.get<ICategory[]>('/categories')
	const totalIncome = await await instance.get<number>('/transactions/income/find')
	const totalExpense = await await instance.get<number>('/transactions/expense/find')
	const totalTransactions = await instance.get<number>('/transactions/size')

	const data = {
		categories: categories.data,
		totalIncome: totalIncome.data,
		totalExpense: totalExpense.data,
		totalTransactions: totalTransactions.data
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
	const { totalIncome, totalExpense } = useLoaderData() as IResponseTransactionLoader

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
							{formatToUSD.format(totalIncome)}
						</p>
					</div>
					<div>
						<p className='uppercase text-center font-bold'
						>
							Total Expense:
						</p>
						<p className='mt-2 rounded-sm bg-red-500 p-1 text-center'
						>
							{formatToUSD.format(totalExpense)}
						</p>

					</div>
					<Chart totalIncome={totalIncome} totalExpense={totalExpense} />
				</div>
			</div>
		</div>

		{/* transactions table */}
		<h1 className='my-5'><TransactionTable limit={5} /></h1>
	</>
}

export default Transactions