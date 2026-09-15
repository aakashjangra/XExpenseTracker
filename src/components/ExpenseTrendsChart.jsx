import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { CATEGORY_COLORS } from '../utils/constants';

function ExpenseTrendsChart({ expenses }) {
  const totalsByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.price);
    return acc;
  }, {});

  const data = Object.entries(totalsByCategory).map(([category, total]) => ({
    category,
    total,
  }));

  return (
    <div className="card chart-card">
      <h2 className="card__title">Expense Trends</h2>
      {data.length === 0 ? (
        <p className="empty-state">Add expenses to see spending trends.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="category" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
            <Bar dataKey="total" radius={[6, 6, 0, 0]}>
              {data.map((entry) => (
                <Cell key={entry.category} fill={CATEGORY_COLORS[entry.category] || '#9AA5B1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseTrendsChart;
