import CATEGORIES from "../categories";
import Expense from "../expense";

interface ExpensesListProps {
	expenses: Expense[];
	onExpenseRemove: (expenseId: number) => void;
}

function ExpensesList({ expenses, onExpenseRemove }: ExpensesListProps) {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return (
		<div>
			<select
				className="form-select mb-3"
				id="category"
				defaultValue="all"
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
					{expenses.map(expense => {
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
		</div>
	);
}

export default ExpensesList;
