import { useEffect, useState } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';
import WalletBalance from './components/WalletBalance';
import AddIncomeModal from './components/AddIncomeModal';
import AddExpenseModal from './components/AddExpenseModal';
import ExpenseList from './components/ExpenseList';
import ExpenseSummaryChart from './components/ExpenseSummaryChart';
import ExpenseTrendsChart from './components/ExpenseTrendsChart';
import { loadExpenses, loadWalletBalance, saveExpenses, saveWalletBalance } from './utils/storage';
import './App.css';

function createId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function ExpenseTracker() {
  const { enqueueSnackbar } = useSnackbar();
  const [walletBalance, setWalletBalance] = useState(() => loadWalletBalance());
  const [expenses, setExpenses] = useState(() => loadExpenses());
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false);
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  useEffect(() => {
    saveWalletBalance(walletBalance);
  }, [walletBalance]);

  useEffect(() => {
    saveExpenses(expenses);
  }, [expenses]);

  function handleAddIncome(amount) {
    setWalletBalance((prev) => prev + amount);
    enqueueSnackbar(`Added $${amount.toFixed(2)} to your wallet.`, { variant: 'success' });
    setIsIncomeModalOpen(false);
  }

  function openAddExpenseModal() {
    setEditingExpense(null);
    setIsExpenseModalOpen(true);
  }

  function openEditExpenseModal(expense) {
    setEditingExpense(expense);
    setIsExpenseModalOpen(true);
  }

  function closeExpenseModal() {
    setIsExpenseModalOpen(false);
    setEditingExpense(null);
  }

  function handleExpenseSubmit(expenseData) {
    if (editingExpense) {
      const previousPrice = editingExpense.price;
      const priceDelta = expenseData.price - previousPrice;
      if (priceDelta > walletBalance) {
        enqueueSnackbar('Insufficient wallet balance for this update.', { variant: 'error' });
        return;
      }
      setExpenses((prev) =>
        prev.map((expense) =>
          expense.id === editingExpense.id ? { ...expense, ...expenseData } : expense
        )
      );
      setWalletBalance((prev) => prev - priceDelta);
      enqueueSnackbar('Expense updated successfully.', { variant: 'success' });
    } else {
      if (expenseData.price > walletBalance) {
        enqueueSnackbar('Insufficient wallet balance for this expense.', { variant: 'error' });
        return;
      }
      const newExpense = { id: createId(), ...expenseData };
      setExpenses((prev) => [...prev, newExpense]);
      setWalletBalance((prev) => prev - expenseData.price);
      enqueueSnackbar('Expense added successfully.', { variant: 'success' });
    }
    closeExpenseModal();
  }

  function handleDeleteExpense(id) {
    const expenseToDelete = expenses.find((expense) => expense.id === id);
    if (!expenseToDelete) return;
    setExpenses((prev) => prev.filter((expense) => expense.id !== id));
    setWalletBalance((prev) => prev + expenseToDelete.price);
    enqueueSnackbar('Expense deleted.', { variant: 'info' });
  }

  return (
    <div className="app">
      <header className="app__header">
        <h1>Expense Tracker</h1>
      </header>

      <main className="app__main">
        <WalletBalance
          balance={walletBalance}
          onAddIncomeClick={() => setIsIncomeModalOpen(true)}
          onAddExpenseClick={openAddExpenseModal}
        />

        <div className="charts-row">
          <ExpenseSummaryChart expenses={expenses} />
          <ExpenseTrendsChart expenses={expenses} />
        </div>

        <ExpenseList
          expenses={expenses}
          onEdit={openEditExpenseModal}
          onDelete={handleDeleteExpense}
        />
      </main>

      <AddIncomeModal
        isOpen={isIncomeModalOpen}
        onClose={() => setIsIncomeModalOpen(false)}
        onAddIncome={handleAddIncome}
      />

      <AddExpenseModal
        isOpen={isExpenseModalOpen}
        onClose={closeExpenseModal}
        onSubmit={handleExpenseSubmit}
        editingExpense={editingExpense}
      />
    </div>
  );
}

function App() {
  return (
    <SnackbarProvider maxSnack={3} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <ExpenseTracker />
    </SnackbarProvider>
  );
}

export default App;
