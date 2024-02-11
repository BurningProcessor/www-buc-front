import { FC } from 'react'
import TransactionForm from '../components/TransactionForm'
import { instance } from '../api/axios.api'
import { ICategory, IResponseTransactionLoader } from '../types/types'
import { toast } from 'react-toastify'
import TransactionTable from '../components/TransactionTable'
import { useLoaderData } from 'react-router-dom'
import Chart from '../components/Chart'
import TotalValues from '../components/TotalValues'

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
		{/* <div className='mt-4 grid grid-cols-3 gap-4'> */}
		<div className='mx-1 mt-10 flex flex-wrap justify-evenly gap-3 sm:mx-auto'>
			{/* Add transactions form */}
			<div className='flex-grow-[2] '><TransactionForm /></div>

			{/* Statistic blocks */}
			<div className="w-full rounded-md bg-slate-800 p-3 sm:w-auto">
				<TotalValues totalIncome={totalIncome} totalExpense={totalExpense} />
				<div className='flex justify-center'>
					<Chart totalIncome={totalIncome} totalExpense={totalExpense} />
				</div>
			</div>
		</div>

		{/* transactions table */}
		<div className='mt-3'><TransactionTable limit={5} /></div>

		{/* fix visual bug 'white shace in botton screen from mobile layout' */}
		<div className='h-40 sm:hidden'></div>
	</>
}

export default Transactions