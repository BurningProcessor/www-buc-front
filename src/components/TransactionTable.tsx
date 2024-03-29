import { FC, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader, ITransaction } from '../types/types'
import { formatDate } from '../helpers/date.hepler'
import { formatToUSD } from '../helpers/currency.helper'
import { instance } from '../api/axios.api'
import ReactPaginate from 'react-paginate'

interface ITransactionTable {
	limit: number
}

const TransactionTable: FC<ITransactionTable> = ({ limit }) => {
	const { totalTransactions } = useLoaderData() as IResponseTransactionLoader

	const [data, setData] = useState<ITransaction[]>([])
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [totalPages, setTotalPages] = useState<number>(0)

	const fetchTransactions = async (page: number) => {
		const response = await instance.get(`/transactions/pagination?page=${page}&limit=${limit}`)
		setData(response.data)
		setTotalPages(Math.ceil(totalTransactions / limit))
	}

	const handlePageChange = (selectedItem: { selected: number }) => {
		setCurrentPage(selectedItem.selected + 1)
	}

	useEffect(() => {
		fetchTransactions(currentPage)
	}, [currentPage, totalTransactions])

	return (
		<div>
			<ReactPaginate
				className="sm:justify-en mt-3 flex w-full items-center justify-center gap-3 sm:justify-end"
				activeClassName="bg-blue-600 rounded-md text-white"
				pageLinkClassName="text-xs py-1 px-2 rounded-md dark:text-white"
				previousClassName="py-1 px-2 bg-white rounded-md text-xs dark:text-white dark:bg-slate-800"
				nextClassName="py-1 px-2 bg-white rounded-md text-xs dark:text-white dark:bg-slate-800"
				disabledClassName="inactive-text cursor-not-allowed"
				disabledLinkClassName="inactive-text cursor-not-allowed"
				pageCount={totalPages}
				pageRangeDisplayed={1}
				marginPagesDisplayed={2}
				onPageChange={handlePageChange}
			/>

			<div className="mx-1 my-3 grid gap-4 sm:hidden">
				{data?.map((transaction, idx) => (
					<table key={idx} className="card w-full px-4 py-3 ">
						<tbody>
							<tr>
								<td className="p-2"># {idx + 1}</td>
							</tr>
							<tr>
								<td className="p-2">Title</td>
								<td className="p-2">:</td>
								<td className="p-2">{transaction.title}</td>
							</tr>
							<tr>
								<td className="p-2">Amount(s)</td>
								<td className="p-2">:</td>
								<td
									className={`p-2 ${
										transaction.type === 'income' ? 'text-green-500' : 'text-red-500'
									}`}
								>
									{`
									${transaction.type === 'income' ? '+' : '−'}
									${formatToUSD.format(transaction.amount)}
								`}
								</td>
							</tr>
							<tr>
								<td className="p-2">Category</td>
								<td className="p-2">:</td>
								<td className="p-2">{transaction.category?.title || '[ NONE OR DELETED ]'}</td>
							</tr>
							<tr>
								<td className="p-2">Date</td>
								<td className="p-2">:</td>
								<td className="p-2">{formatDate(transaction.createAt)}</td>
							</tr>
						</tbody>
					</table>
				))}
			</div>

			<div className="card mt-3 hidden px-4 py-3 sm:block">
				<table className="w-full">
					<thead>
						<tr>
							<td className="font-bold">#</td>
							<td className="font-bold">Title</td>
							<td className="text-center font-bold">Amount($)</td>
							<td className="font-bold">Category</td>
							<td className="font-bold">Date</td>
							<td className="text-right font-bold">Action</td>
						</tr>
					</thead>
					<tbody>
						{data?.map((transaction, idx) => (
							<tr key={idx}>
								<td>{idx + 1}</td>
								<td>{transaction.title}</td>
								<td
									className={`
										pr-5 text-right text-green-500
										${transaction.type === 'income' ? 'text-green-500' : 'text-red-500'}
									`}
								>
									{`
										${transaction.type === 'income' ? '+' : '−'}
										${formatToUSD.format(transaction.amount)}
									`}
								</td>
								<td>{transaction.category?.title || '[ NONE OR DELETED ]'}</td>
								<td>{formatDate(transaction.createAt)}</td>
								<td>
									<Form method="delete" action="/transactions">
										<input type="hidden" name="id" value={transaction.id} />
										<button className="btn hover:btn-red ml-auto">
											<FaTrash />
										</button>
									</Form>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default TransactionTable
