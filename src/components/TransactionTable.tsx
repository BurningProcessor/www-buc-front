import { FC } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import { formatDate } from '../helpers/date.hepler'
import { formatToUSD } from '../helpers/currency.helper'

const TransactionTable: FC = () => {
	const { transactions } = useLoaderData() as IResponseTransactionLoader
	console.log(transactions)
	return <>
		<div className='bg-slate-800 px-4 py-3 mt-4 rountet-md'>
			<table className='w-full'>
				<thead>
					<tr>
						<td className='font-bold'>#</td>
						<td className='font-bold'>Title</td>
						<td className='font-bold text-center'>Amount($)</td>
						<td className='font-bold'>Category</td>
						<td className='font-bold'>Date</td>
						<td className='font-bold text-right'>Action</td>
					</tr>
				</thead>
				<tbody>
					{transactions.map((transaction, idx) => (
						<tr key={idx}>
							<td>{idx + 1}</td>
							<td>{transaction.title}</td>
							<td className={`
								text-green-500 text-right pr-5
								${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}
							`}>{`
								${transaction.type === 'income' ? '+' : '−'}
								${formatToUSD.format(transaction.amount)}
							`}</td>
							<td>{transaction.category?.title || '[ NONE OR DELETED ]'}</td>
							<td>{formatDate(transaction.createAt)}</td>
							<td><Form method='delete' action='/transactions'>
								<input type="hidden" name='id' value={transaction.id} />
								<button className='btn hover:btn-red ml-auto'>
									<FaTrash />
								</button>
							</Form></td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	</>
}

export default TransactionTable