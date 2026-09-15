function WalletBalance({ balance, onAddIncomeClick, onAddExpenseClick }) {
  return (
    <div className="card wallet-card">
      <div className="wallet-card__info">
        <h2 className="wallet-card__label">Wallet Balance</h2>
        <p className="wallet-card__balance">Wallet Balance: ${Number(balance).toFixed(2)}</p>
      </div>
      <div className="wallet-card__actions">
        <button type="button" className="btn btn--secondary" onClick={onAddIncomeClick}>
          + Add Income
        </button>
        <button type="button" className="btn btn--primary" onClick={onAddExpenseClick}>
          + Add Expense
        </button>
      </div>
    </div>
  );
}

export default WalletBalance;
