import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onEdit, onDelete }) {
  return (
    <div className="card expense-list">
      <h2 className="card__title">Expenses</h2>
      <h3 className="expense-list__subtitle">Transactions</h3>
      {expenses.length === 0 ? (
        <p className="empty-state">No expenses yet. Add your first expense to get started.</p>
      ) : (
        <ul className="expense-list__items">
          {expenses
            .slice()
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .map((expense) => (
              <ExpenseItem
                key={expense.id}
                expense={expense}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
        </ul>
      )}
    </div>
  );
}

export default ExpenseList;
