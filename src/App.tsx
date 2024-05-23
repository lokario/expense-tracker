import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpensesList from "./components/ExpensesList";
import Expense from "./components/expense";

function App() {
	const [lastExpenseId, setLastExpenseId] = useState(0);
	const [expenses, setExpenses] = useState<Expense[]>([]);

	const handleNewExpense = (expense: Expense) => {
		const expenseId = lastExpenseId + 1;
		setLastExpenseId(expenseId);
		setExpenses([...expenses, { ...expense, id: expenseId }]);
	};

	const handleExpenseRemove = expenseId => {};

	return (
		<div className="container d-flex flex-column row-gap-5 p-4">
			<ExpenseForm onExpenseSubmit={handleNewExpense} />
			<ExpensesList
				expenses={expenses}
				onExpenseRemove={handleExpenseRemove}
			/>
		</div>
	);
}

export default App;
