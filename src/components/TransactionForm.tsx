import { FC, useState } from 'react'
import { FaPlus } from 'react-icons/fa'
import { Form, useLoaderData } from 'react-router-dom'
import { IResponseTransactionLoader } from '../types/types'
import CategoryModal from './CategoryModal'

const TransactionForm: FC = () => {
	const { categories } = useLoaderData() as IResponseTransactionLoader
	const [visibleModal, setVisibleModal] = useState(false)

	return <div className='rounded-md bg-slate-800 p-4'>
		<Form className='grid gap-2'
			method='post'
			action='/transactions'
		>
			<label className='grid' htmlFor="tite">
				<span>Title</span>
				<input
					type="text"
					className='input border-slate-700'
					placeholder='Title...'
					name='title'
					required
				/>
			</label>

			<label className='grid' htmlFor="tite">
				<span>Amount</span>
				<input
					type="number"
					className='input border-slate-700'
					placeholder='Amount...'
					name='amount'
					required
				/>
			</label>

			{/* Select */}
			{categories.length ? (
				<label htmlFor="category" className='grid'>
					<span>Category</span>
					<select name="category" className='input border-slate-700' required>
						{categories.map((ctg, idx) => (
							<option
								key={idx}
								value={ctg.id}
								className='bg-slate-800'
							>{ctg.title}</option>
						))}
					</select>
				</label>
			) : (
				<h1 className='mt-1 text-red-300'>To continue create a category first</h1>
			)}

			{/* Manage button */}
			<button
				className='max-w-fit flex items-center gap-2 text-white/50 hover:text-white'
				onClick={() => setVisibleModal(true)}
			>
				<FaPlus />
				<span>Manage categories</span>
			</button>

			{/* Radio buttons */}
			<fieldset className="flex gap-4 items-center border rounded-md border-gray-700 w-min">
				<legend className='mx-1 px-2'>Amount</legend>
				<label className='ml-2 mt-1 mb-3 flex items-center gap-2'>
					<input type="radio"
						name='type'
						value={'income'}
						className='text-blue-600'
						required
					/>
					<span>Income</span>
				</label>
				<label className='mr-3 mt-1 mb-3 flex items-center gap-2'>
					<input type="radio"
						name='type'
						value={'expense'}
						className='text-blue-600'
						required
					/>
					<span>Expense</span>
				</label>
			</fieldset>

			{/* Submit button */}
			<button className='btn btn-green max-w-fit mt-2'>Submit</button>
		</Form>

		{/* Add Transaction modal */}
		{visibleModal && (
			<CategoryModal type='post' setVisibleModal={setVisibleModal} />
		)}
	</div>
}

export default TransactionForm