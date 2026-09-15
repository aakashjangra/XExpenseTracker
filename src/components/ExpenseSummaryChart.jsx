import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { CATEGORY_COLORS } from '../utils/constants';

function ExpenseSummaryChart({ expenses }) {
  const totalsByCategory = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.price);
    return acc;
  }, {});

  const data = Object.entries(totalsByCategory).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="card chart-card">
      <h2 className="card__title">Expense Summary</h2>
      {data.length === 0 ? (
        <p className="empty-state">Add expenses to see the category breakdown.</p>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name] || '#9AA5B1'} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default ExpenseSummaryChart;
