import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { CATEGORY_COLORS } from '../utils/constants';

function formatDate(dateString) {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function ExpenseItem({ expense, onEdit, onDelete }) {
  const color = CATEGORY_COLORS[expense.category] || '#9AA5B1';

  return (
    <li className="expense-item">
      <span className="expense-item__category-dot" style={{ backgroundColor: color }} />
      <div className="expense-item__info">
        <p className="expense-item__title">{expense.title}</p>
        <p className="expense-item__meta">
          {expense.category} &middot; {formatDate(expense.date)}
        </p>
      </div>
      <p className="expense-item__amount">-${Number(expense.price).toFixed(2)}</p>
      <div className="expense-item__actions">
        <button
          type="button"
          className="icon-btn"
          aria-label={`Edit ${expense.title}`}
          onClick={() => onEdit(expense)}
        >
          <FiEdit2 />
        </button>
        <button
          type="button"
          className="icon-btn icon-btn--danger"
          aria-label={`Delete ${expense.title}`}
          onClick={() => onDelete(expense.id)}
        >
          <FiTrash2 />
        </button>
      </div>
    </li>
  );
}

export default ExpenseItem;
