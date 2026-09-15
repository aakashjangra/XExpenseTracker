import { DEFAULT_WALLET_BALANCE, EXPENSES_KEY, WALLET_BALANCE_KEY } from './constants';

export function loadExpenses() {
  try {
    const raw = localStorage.getItem(EXPENSES_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveExpenses(expenses) {
  localStorage.setItem(EXPENSES_KEY, JSON.stringify(expenses));
}

export function loadWalletBalance() {
  try {
    const raw = localStorage.getItem(WALLET_BALANCE_KEY);
    return raw !== null ? JSON.parse(raw) : DEFAULT_WALLET_BALANCE;
  } catch {
    return DEFAULT_WALLET_BALANCE;
  }
}

export function saveWalletBalance(balance) {
  localStorage.setItem(WALLET_BALANCE_KEY, JSON.stringify(balance));
}
