import { FC, useState } from 'react'
import { Form } from 'react-router-dom'

interface ICategoryModal {
	type: 'post' | 'patch'
	id?: number
	setVisibleModal: (visible: boolean) => void
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal }) => {
	const [inval, setInval] = useState(false)

	return (
		<div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/50">
			<Form
				className="card grid w-[300px] gap-2"
				action="/categories"
				method={type}
				onSubmit={() => setVisibleModal(false)}
			>
				<label htmlFor="title">
					<span>Category Title</span>
					<input
						className="input w-full"
						type="text"
						name="title"
						placeholder="Title..."
						required
						onInvalid={() => {
							setInval(true)
						}}
					/>
					<input name="id" type="hidden" value={id} />
				</label>

				<div className="flex items-center gap-2">
					<button className="btn btn-green" type="submit">
						{type === 'patch' ? 'Save' : 'Create'}
					</button>
					<button onClick={() => setVisibleModal(false)} className="btn btn-red">
						Close
					</button>

					<div className="relative flex h-full w-full justify-end">
						<span
							className={`error_msg relative top-[-1rem] mr-2 bg-white dark:bg-slate-800 px-1 ${
								inval ? 'block' : 'hidden'
							}`}
						>
							not empty
						</span>
					</div>
				</div>
			</Form>
		</div>
	)
}

export default CategoryModal
