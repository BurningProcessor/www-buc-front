import { FC } from "react"
import { Form } from "react-router-dom"

interface ICategoryModal {
    type: 'post' | 'patch'
    id?: number
    setVisibleModal: (visible: boolean) => void
}


const CategoryModal: FC<ICategoryModal> = ({ type, id, setVisibleModal }) => {
    return (
			<div className="fixed bottom-0 left-0 right-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/50">
				<Form className="grid w-[300px] gap-2 rounded-md bg-slate-900 p-5" action="/categories" method={type} onSubmit={() => setVisibleModal(false)}>
					<label htmlFor="title">
						<small>Category Title</small>
						<input className="input w-full" type="text" name="title" placeholder="Title..." required/>
						<input name="id" type="hidden" value={id} />
					</label>

					<div className="flex items-center gap-2">
						<button className="btn btn-green" type="submit">
							{type === 'patch' ? 'Save' : 'Create'}
						</button>
						<button onClick={() => setVisibleModal(false)} className="btn btn-red">
							Close
						</button>
					</div>
				</Form>
			</div>
		)
}

export default CategoryModal
