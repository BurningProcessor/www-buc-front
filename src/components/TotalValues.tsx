import { FC } from 'react'
import { formatToUSD } from '../helpers/currency.helper'

interface ITotalValues {
	totalIncome: number
	totalExpense: number
}

const TotalValues: FC<ITotalValues> = ({ totalIncome, totalExpense }) => {
	return (
		<div className="grid grid-cols-2 gap-3">
			<div>
				<p className="text-md text-center font-bold uppercase">Total Income:</p>
				<p className="mt-2 rounded-sm bg-green-600 p-1 text-center text-white dark:text-black">
					{formatToUSD.format(totalIncome)}
				</p>
			</div>
			<div>
				<p className="text-center font-bold uppercase">Total Expense:</p>
				<p className="mt-2 rounded-sm bg-red-500 p-1 text-center text-white dark:text-black">
					{formatToUSD.format(totalExpense)}
				</p>
			</div>
		</div>
	)
}

export default TotalValues
