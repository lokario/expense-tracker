import ExpenseForm from "./components/ExpenseForm";
import ExpensesList from "./components/ExpensesList";

function App() {
	return (
		<div className="container p-4">
			<ExpenseForm />
			<ExpensesList />
		</div>
	);
}

export default App;
