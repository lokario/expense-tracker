import { useState } from "react";
import CATEGORIES from "../categories";
import Expense from "../expense";

interface ExpensesListProps {
	expenses: Expense[];
	onExpenseRemove: (expenseId: number) => void;
}

function ExpensesList({ expenses, onExpenseRemove }: ExpensesListProps) {
	const [filter, setFilter] = useState("all");

	const onChangeFilter = (value: string) => {
		setFilter(value);
	};

	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	const filteredExpenses = expenses.filter(expense => filter == "all" || expense.category == filter);

	return (
		<div>
			<select
				className="form-select mb-3"
				id="category"
				value={filter}
				onChange={event => onChangeFilter(event.target.value)}
			>
				<option
					key="all"
					value="all"
				>
					All Categories
				</option>
				{CATEGORIES.map(category => (
					<option
						key={category}
						value={category}
					>
						{category}
					</option>
				))}
			</select>
			{filteredExpenses.length > 0 && (
				<table className="table table-bordered">
					<thead>
						<tr>
							<th>Description</th>
							<th>Amount</th>
							<th>Category</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{filteredExpenses.map(expense => {
							return (
								<tr
									key={expense.id}
									className="align-middle"
								>
									<td>{expense.description}</td>
									<td>{formatter.format(expense.amount)}</td>
									<td>{expense.category}</td>
									<td>
										<button
											type="button"
											className="btn btn-outline-danger"
											onClick={() => onExpenseRemove(expense.id)}
										>
											Delete
										</button>
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			)}
			{filteredExpenses.length == 0 && <p className="fs-5 text-center">There are no expenses to display</p>}
		</div>
	);
}

export default ExpensesList;
