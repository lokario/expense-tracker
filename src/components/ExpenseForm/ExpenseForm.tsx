import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import CATEGORIES from "../categories";
import Expense from "../expense";

const schema = z.object({
	description: z.string({ message: "Description must be a string" }).min(3, { message: "Description must be at least 3 characters" }),
	amount: z.number({ required_error: "Amount is required", invalid_type_error: "Amount must be a number" }).min(1, { message: "Amount must be at 1 or higher" }),
	category: z.enum(CATEGORIES),
});

type FormData = z.infer<typeof schema>;

interface ExpenseFormProps {
	onExpenseSubmit: (expense: Expense) => void;
}

function ExpenseForm({ onExpenseSubmit }: ExpenseFormProps) {
	const {
		register,
		reset,
		handleSubmit,
		formState: { errors, isValid },
	} = useForm<FormData>({ resolver: zodResolver(schema) });

	const onSubmit = (data: FieldValues) => {
		reset();
		onExpenseSubmit(data as Expense);
	};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className="card p-4"
		>
			<h3 className="text-center mb-2">Add Expenses</h3>

			<div className="form-group mb-3">
				<label
					htmlFor="description"
					className="form-label"
				>
					Description
				</label>
				<input
					{...register("description")}
					type="text"
					className="form-control"
					id="description"
				/>
				{errors.description && <div className="text-danger small mt-2">{errors.description.message}</div>}
			</div>
			<div className="form-group mb-3">
				<label
					htmlFor="amount"
					className="form-label"
				>
					Amount
				</label>
				<input
					{...register("amount", { valueAsNumber: true })}
					type="number"
					className="form-control"
					id="amount"
				/>
				{errors.amount && <div className="text-danger small mt-2">{errors.amount.message}</div>}
			</div>
			<div className="form-group mb-3">
				<label
					htmlFor="category"
					className="form-label"
				>
					Category
				</label>
				<select
					{...register("category")}
					className="form-select"
					id="category"
					defaultValue="0"
				>
					<option
						disabled
						value="0"
					>
						Select a Category
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
				{errors.category && <div className="text-danger small mt-2">{errors.category.message}</div>}
			</div>
			<button
				disabled={!isValid}
				type="submit"
				className="btn btn-primary"
			>
				Submit
			</button>
		</form>
	);
}

export default ExpenseForm;
