import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { FiX } from 'react-icons/fi';
import { CATEGORIES } from '../utils/constants';

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
    maxWidth: '420px',
  },
};

const emptyForm = { title: '', price: '', category: '', date: '' };

function AddExpenseModal({ isOpen, onClose, onSubmit, editingExpense }) {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setForm({
        title: editingExpense.title,
        price: String(editingExpense.price),
        category: editingExpense.category,
        date: editingExpense.date,
      });
    } else {
      setForm(emptyForm);
    }
    setErrors({});
  }, [editingExpense, isOpen]);

  function handleClose() {
    setForm(emptyForm);
    setErrors({});
    onClose();
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const nextErrors = {};
    if (!form.title.trim()) nextErrors.title = 'Title is required.';
    if (!form.price || Number(form.price) <= 0) nextErrors.price = 'Enter a valid amount.';
    if (!form.category) nextErrors.category = 'Category is required.';
    if (!form.date) nextErrors.date = 'Date is required.';
    return nextErrors;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const nextErrors = validate();
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }
    onSubmit({
      title: form.title.trim(),
      price: Number(form.price),
      category: form.category,
      date: form.date,
    });
    setForm(emptyForm);
    setErrors({});
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      style={modalStyle}
      contentLabel="Add Expense"
      ariaHideApp={false}
    >
      <div className="modal">
        <div className="modal__header">
          <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
          <button type="button" className="icon-btn" onClick={handleClose} aria-label="Close">
            <FiX />
          </button>
        </div>
        <form className="modal__body" onSubmit={handleSubmit}>
          <label className="field">
            <span className="field__label">Title</span>
            <input
              type="text"
              name="title"
              placeholder="Expense title"
              value={form.title}
              onChange={handleChange}
            />
            {errors.title && <p className="field__error">{errors.title}</p>}
          </label>

          <label className="field">
            <span className="field__label">Amount</span>
            <input
              type="number"
              name="price"
              placeholder="Amount"
              value={form.price}
              onChange={handleChange}
              min="0"
              step="0.01"
            />
            {errors.price && <p className="field__error">{errors.price}</p>}
          </label>

          <label className="field">
            <span className="field__label">Category</span>
            <select name="category" value={form.category} onChange={handleChange}>
              <option value="">Select category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            {errors.category && <p className="field__error">{errors.category}</p>}
          </label>

          <label className="field">
            <span className="field__label">Date</span>
            <input type="date" name="date" value={form.date} onChange={handleChange} />
            {errors.date && <p className="field__error">{errors.date}</p>}
          </label>

          <button type="submit" className="btn btn--primary btn--full">
            Add Expense
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddExpenseModal;
