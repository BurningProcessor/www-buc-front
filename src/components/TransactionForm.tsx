import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState(false)

	return (
		<div className="card">
			<Form className="grid gap-2" method="post" action="/transactions">
				<label className="grid" htmlFor="title">
					<span>Title</span>
					<input type="text" placeholder="Title..." name="title" required />
				</label>

				<label className="grid" htmlFor="title">
					<span>Amount</span>
					<input type="number" placeholder="Amount..." name="amount" required />
				</label>

				{/* Select */}
				{categories.length ? (
					<label htmlFor="category" className="grid">
						<span>Category</span>
						<select name="category" required>
							{categories.map((ctg, idx) => (
								<option key={idx} value={ctg.id} className="bg-slate-800">
									{ctg.title}
								</option>
							))}
						</select>
					</label>
				) : (
					<h1 className="mt-1 text-red-300">To continue create a category first</h1>
				)}

				{/* Manage button */}
				<button
					className="inactive-text flex max-w-fit items-center gap-2 hover:text-current dark:hover:text-white"
					onClick={() => setVisibleModal(true)}
				>
					<FaPlus />
					<span>Manage categories</span>
				</button>

				{/* Radio buttons */}
				<fieldset className="flex w-min items-center gap-4">
					<legend className="mx-1 px-2">Amount</legend>
					<label className="mb-3 ml-2 mt-1 flex items-center gap-2">
						<input type="radio" name="type" value={'income'} className="text-green-600" required />
						<span>Income</span>
					</label>
					<label className="mb-3 mr-3 mt-1 flex items-center gap-2">
						<input
							type="radio"
							name="type"
							value={'expense'}
							className="rounded-none text-red-600"
							required
						/>
						<span>Expense</span>
					</label>
				</fieldset>

				{/* Submit button */}
				<button className="btn btn-green mt-2 max-w-fit" type="submit">
					Submit
				</button>
			</Form>

			{/* Add Transaction modal */}
			{visibleModal && <CategoryModal type="post" setVisibleModal={setVisibleModal} />}
		</div>
	)
}

export default TransactionForm
