import { FC } from 'react'
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts'

interface IChart {
	totalIncome: number
	totalExpense: number
}

interface IData {
	value: number
	name: string
}

const Chart: FC<IChart> = ({ totalIncome, totalExpense }) => {
	const COLORS = ['#00AA00', '#BB0000']
	const data = new Array<IData>(
		{ value: totalIncome, name: 'Income' },
		{ value: totalExpense, name: 'Expense' }
	)
	return <>
		<PieChart width={240} height={240} >
			<Pie
				data={data}
				cx={'50%'}
				cy={'50%'}
				innerRadius={60}
				outerRadius={80}
				fill="#8884d8"
				paddingAngle={5}
				dataKey='value'
			>
				{data.map((_, idx) => (
					<Cell key={`cell-${idx}`} stroke='#1E293B' fill={COLORS[idx % COLORS.length]} />
				))}
			</Pie>
			<Legend />
			<Tooltip />
		</PieChart>
	</>
}

export default Chart