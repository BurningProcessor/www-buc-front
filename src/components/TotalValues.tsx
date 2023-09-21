import { FC } from 'react'
import { formatToUSD } from '../helpers/currency.helper'

interface ITotalValues {
	totalIncome: number
	totalExpense: number
}

const TotalValues: FC<ITotalValues> = ({ totalIncome, totalExpense }) => {
	return <div className='grid grid-cols-2 gap-3'>
		<div>
			<p className='uppercase text-md text-center font-bold' >
				Total Income:
			</p>
			<p className='mt-2 rounded-sm bg-green-600 p-1 text-center' >
				{formatToUSD.format(totalIncome)}
			</p>
		</div >
		<div>
			<p className='uppercase text-center font-bold' >
				Total Expense:
			</p>
			<p className='mt-2 rounded-sm bg-red-500 p-1 text-center' >
				{formatToUSD.format(totalExpense)}
			</p>
		</div>
	</div>
}

export default TotalValues