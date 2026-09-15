import { useState } from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';

const modalStyle = {
  overlay: {
    backgroundColor: 'rgba(15, 23, 42, 0.55)',
    zIndex: 1000,
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    padding: 0,
    border: 'none',
    borderRadius: '16px',
    width: '90%',
    maxWidth: '380px',
  },
};

function AddIncomeModal({ isOpen, onClose, onAddIncome }) {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');

  function handleClose() {
    setAmount('');
    setError('');
    onClose();
  }

  function handleSubmit(e) {
    e.preventDefault();
    const numericAmount = Number(amount);
    if (!amount || Number.isNaN(numericAmount) || numericAmount <= 0) {
      setError('Please enter a valid income amount.');
      return;
    }
    onAddIncome(numericAmount);
    setAmount('');
    setError('');
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyle}
      contentLabel="Add Income"
      ariaHideApp={false}
    >
      <div className="modal">
        <div className="modal__header">
          <h2>Add Income</h2>
          <button type="button" className="icon-btn" onClick={handleClose} aria-label="Close">
            <FiX />
          </button>
        </div>
        <form className="modal__body" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">Income Amount</span>
            <input
              type="number"
              name="amount"
              placeholder="Income Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              min="0"
              step="0.01"
            />
          </label>
          {error && <p className="field__error">{error}</p>}
          <button type="submit" className="btn btn--primary btn--full">
            Add Balance
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddIncomeModal;
