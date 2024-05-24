import { useState } from "react";
import ExpenseForm from "./components/ExpenseForm";
import ExpensesList from "./components/ExpensesList";
import Expense from "./components/expense";

function App() {
	const [expenses, setExpenses] = useState<Expense[]>([
		{ id: 1, description: "Milk", amount: 5, category: "Groceries" },
		{ id: 2, description: "Eggs", amount: 10, category: "Groceries" },
		{ id: 3, description: "Electricity", amount: 100, category: "Utilities" },
		{ id: 4, description: "Movies", amount: 15, category: "Entertainment" },
	]);
	const [lastExpenseId, setLastExpenseId] = useState(expenses.length > 0 ? expenses[expenses.length - 1].id : 0);

	const handleNewExpense = (expense: Expense) => {
		const expenseId = lastExpenseId + 1;
		setLastExpenseId(expenseId);
		setExpenses([...expenses, { ...expense, id: expenseId }]);
	};

	const handleExpenseRemove = (expenseId: number) => {
		setExpenses(expenses.filter(expense => expense.id != expenseId));
	};

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
