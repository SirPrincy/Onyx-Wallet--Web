import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Transaction, Budget, Wallet, Liability } from '../types';
import { TRANSACTIONS as INITIAL_TRANSACTIONS, BUDGETS as INITIAL_BUDGETS } from '../constants';

export interface SavingsGoal {
  id: string;
  title: string;
  desc: string;
  current: number;
  target: number;
  isCompleted: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'income' | 'expense';
  subcategories: { name: string, icon: string }[];
}

export interface RecurringTransaction {
  id: string;
  name: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  frequency: 'Monthly' | 'Quarterly' | 'Annually';
}

interface TransactionContextType {
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  categories: Category[];
  recurringTransactions: RecurringTransaction[];
  wallets: Wallet[];
  liabilities: Liability[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp' | 'date' | 'time'> & { date?: string; time?: string; timestamp?: number }) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  updateBudgetWallets: (category: string, walletIds: string[]) => void;
  updateBudgetLimit: (category: string, limit: number) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'isCompleted'>) => void;
  updateSavingsGoal: (id: string, updates: Partial<SavingsGoal>) => void;
  deleteSavingsGoal: (id: string) => void;
  contributeToGoal: (goalId: string, amount: number, walletId?: string) => void;
  addCategory: (category: Omit<Category, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<Category>) => void;
  deleteCategory: (id: string) => void;
  addRecurringTransaction: (recurring: Omit<RecurringTransaction, 'id'>) => void;
  updateRecurringTransaction: (id: string, updates: Partial<RecurringTransaction>) => void;
  deleteRecurringTransaction: (id: string) => void;
  addWallet: (wallet: Omit<Wallet, 'id'>) => void;
  updateWallet: (id: string, updates: Partial<Wallet>) => void;
  deleteWallet: (id: string) => void;
  reorderWallets: (newWallets: Wallet[]) => void;
  addLiability: (liability: Omit<Liability, 'id'>) => void;
  updateLiability: (id: string, updates: Partial<Liability>) => void;
  deleteLiability: (id: string) => void;
  payLiability: (id: string, amount: number) => void;
  isPasscodeEnabled: boolean;
  setIsPasscodeEnabled: (enabled: boolean) => void;
}

const INITIAL_SAVINGS: SavingsGoal[] = [
  {
    id: '1',
    title: 'New Property Fund',
    desc: 'Primary residence acquisition',
    current: 250000,
    target: 500000,
    isCompleted: false
  },
  {
    id: '2',
    title: 'Vintage Car Collection',
    desc: '1967 Porsche 911 curation',
    current: 85000,
    target: 120000,
    isCompleted: false
  },
  {
    id: '3',
    title: 'Emergency Vault',
    desc: '12-month luxury burn rate coverage',
    current: 50000,
    target: 50000,
    isCompleted: true
  }
];

const INITIAL_CATEGORIES: Category[] = [
  { id: '1', name: 'Luxury Goods', icon: 'shopping_bag', color: '#B4947C', type: 'expense', subcategories: [{ name: 'Watches', icon: 'award' }, { name: 'Jewelry', icon: 'diamond' }, { name: 'Apparel', icon: 'shopping_bag' }] },
  { id: '2', name: 'Tech', icon: 'smartphone', color: '#60A5FA', type: 'expense', subcategories: [{ name: 'Hardware', icon: 'smartphone' }, { name: 'Software', icon: 'code' }, { name: 'Gadgets', icon: 'cpu' }] },
  { id: '3', name: 'Dining', icon: 'restaurant', color: '#F87171', type: 'expense', subcategories: [{ name: 'Fine Dining', icon: 'utensils' }, { name: 'Bar & Spirits', icon: 'glass-water' }, { name: 'Casual', icon: 'coffee' }] },
  { id: '4', name: 'Monthly', icon: 'payments', color: '#34D399', type: 'income', subcategories: [{ name: 'Salary', icon: 'banknote' }, { name: 'Bonus', icon: 'sparkles' }, { name: 'Dividend', icon: 'trending-up' }] },
  { id: '5', name: 'Private Aviation', icon: 'plane', color: '#A78BFA', type: 'expense', subcategories: [{ name: 'Fuel', icon: 'fuel' }, { name: 'Maintenance', icon: 'settings' }, { name: 'Charter', icon: 'plane' }] },
  { id: '6', name: 'Transport', icon: 'car', color: '#FBBF24', type: 'expense', subcategories: [{ name: 'Uber Premium', icon: 'car' }, { name: 'Private Driver', icon: 'user-check' }, { name: 'Gasoline', icon: 'fuel' }] },
  { id: '7', name: 'Hospitality', icon: 'hotel', color: '#F472B6', type: 'expense', subcategories: [{ name: 'Hotels', icon: 'hotel' }, { name: 'Resorts', icon: 'palmtree' }, { name: 'Vacation Rental', icon: 'home' }] },
  { id: '8', name: 'Investment', icon: 'trending-up', color: '#10B981', type: 'income', subcategories: [{ name: 'Stocks', icon: 'bar-chart' }, { name: 'Real Estate', icon: 'building' }, { name: 'Crypto', icon: 'bitcoin' }] },
  { id: '9', name: 'Lifestyle', icon: 'heart', color: '#EC4899', type: 'expense', subcategories: [{ name: 'Wellness', icon: 'heart' }, { name: 'Concierge', icon: 'user' }, { name: 'Health', icon: 'activity' }] },
  { id: '10', name: 'Fine Dining', icon: 'utensils', color: '#EF4444', type: 'expense', subcategories: [{ name: 'Michelin Star', icon: 'star' }, { name: 'Private Chef', icon: 'utensils' }] },
  { id: '11', name: 'First Class Travel', icon: 'award', color: '#8B5CF6', type: 'expense', subcategories: [{ name: 'Aviation', icon: 'plane' }, { name: 'Executive Lounge', icon: 'sofa' }] }
];

const INITIAL_WALLETS: Wallet[] = [
  { id: 'main', name: 'Premier Account', type: 'Bank Account', balance: 142500, currency: 'USD', color: '#B4947C', icon: 'landmark', lastFour: '8821', provider: 'JP Morgan Reserve', isVisible: true },
  { id: 'offshore', name: 'Black Card', type: 'Credit Card', balance: -12400, currency: 'USD', color: '#1a1a1a', icon: 'credit-card', lastFour: '0001', provider: 'Moula Elite', isVisible: true },
  { id: 'crypto', name: 'Digital Vault', type: 'Crypto', balance: 52400, currency: 'USD', color: '#F7931A', icon: 'bitcoin', provider: 'Ledger Cold Storage', isVisible: true },
  { id: 'invest', name: 'Growth Porfolio', type: 'Investment', balance: 842000, currency: 'USD', color: '#10B981', icon: 'trending-up', provider: 'Goldman Sachs', isVisible: true },
];

const INITIAL_LIABILITIES: Liability[] = [
  { id: '1', name: 'Penthouse Mortgage', type: 'Mortgage', totalAmount: 2500000, remainingAmount: 1850000, interestRate: 3.2, monthlyPayment: 8500, dueDate: '2026-05-01', provider: 'Chase Private' },
  { id: '2', name: 'Company Leasing', type: 'Leasing', totalAmount: 120000, remainingAmount: 45000, interestRate: 0, monthlyPayment: 2500, dueDate: '2026-04-28', provider: 'Luxury Fleet' },
];

const INITIAL_RECURRING: RecurringTransaction[] = [
  { id: '101', name: 'Penthouse Rent', amount: 8500, type: 'expense', category: 'Monthly', frequency: 'Monthly' },
  { id: '102', name: 'Consulting Fee', amount: 45000, type: 'income', category: 'Investment', frequency: 'Monthly' },
  { id: '103', name: 'Private Jet Club', amount: 12000, type: 'expense', category: 'Private Aviation', frequency: 'Annually' },
];

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('moula_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });
  const [budgets, setBudgets] = useState<Budget[]>(() => {
    const saved = localStorage.getItem('moula_budgets');
    return saved ? JSON.parse(saved) : INITIAL_BUDGETS;
  });
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(() => {
    const saved = localStorage.getItem('moula_savings_goals');
    return saved ? JSON.parse(saved) : INITIAL_SAVINGS;
  });
  const [categories, setCategories] = useState<Category[]>(() => {
    const saved = localStorage.getItem('moula_categories');
    return saved ? JSON.parse(saved) : INITIAL_CATEGORIES;
  });
  const [recurringTransactions, setRecurringTransactions] = useState<RecurringTransaction[]>(INITIAL_RECURRING);
  const [wallets, setWallets] = useState<Wallet[]>(() => {
    const saved = localStorage.getItem('moula_wallets');
    return saved ? JSON.parse(saved) : INITIAL_WALLETS;
  });
  const [liabilities, setLiabilities] = useState<Liability[]>(() => {
    const saved = localStorage.getItem('moula_liabilities');
    return saved ? JSON.parse(saved) : INITIAL_LIABILITIES;
  });

  const [isPasscodeEnabled, setIsPasscodeEnabledState] = useState<boolean>(() => {
    return localStorage.getItem('isMoulaPasscodeEnabled') !== 'false'; // Default to true
  });

  // Save to localStorage whenever state changes
  useEffect(() => localStorage.setItem('moula_transactions', JSON.stringify(transactions)), [transactions]);
  useEffect(() => localStorage.setItem('moula_budgets', JSON.stringify(budgets)), [budgets]);
  useEffect(() => localStorage.setItem('moula_savings_goals', JSON.stringify(savingsGoals)), [savingsGoals]);
  useEffect(() => localStorage.setItem('moula_categories', JSON.stringify(categories)), [categories]);
  useEffect(() => localStorage.setItem('moula_wallets', JSON.stringify(wallets)), [wallets]);
  useEffect(() => localStorage.setItem('moula_liabilities', JSON.stringify(liabilities)), [liabilities]);

  const setIsPasscodeEnabled = (enabled: boolean) => {
    setIsPasscodeEnabledState(enabled);
    localStorage.setItem('isMoulaPasscodeEnabled', enabled.toString());
  };

  const addTransaction = (newTx: Omit<Transaction, 'id' | 'timestamp' | 'date' | 'time'> & { date?: string; time?: string; timestamp?: number }) => {
    const now = new Date();
    const txDate = newTx.date || 'Today';
    
    const fullTx: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: newTx.timestamp || now.getTime(),
      date: txDate,
      time: newTx.time || now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
    };

    setTransactions(prev => [fullTx, ...prev]);

    // Update wallet balance if applicable
    if (newTx.walletId) {
      setWallets(prev => prev.map(w => {
        if (w.id === newTx.walletId) {
          const adj = newTx.type === 'income' ? newTx.amount : -Math.abs(newTx.amount);
          return { ...w, balance: w.balance + adj };
        }
        return w;
      }));
    }
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, ...updates } : tx));
  };

  const deleteTransaction = (id: string) => {
    const txToDelete = transactions.find(t => t.id === id);
    if (txToDelete && txToDelete.walletId) {
       // Reverse balance change
       setWallets(prev => prev.map(w => {
        if (w.id === txToDelete.walletId) {
          const adj = txToDelete.type === 'income' ? -txToDelete.amount : Math.abs(txToDelete.amount);
          return { ...w, balance: w.balance + adj };
        }
        return w;
      }));
    }
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const updateBudgetWallets = (category: string, walletIds: string[]) => {
    setBudgets(prev => prev.map(b => 
      b.category === category ? { ...b, linkedWallets: walletIds } : b
    ));
  };

  const updateBudgetLimit = (category: string, limit: number) => {
    setBudgets(prev => prev.map(b => 
      b.category === category ? { ...b, limit } : b
    ));
  };

  const addSavingsGoal = (goal: Omit<SavingsGoal, 'id' | 'isCompleted'>) => {
    const newGoal: SavingsGoal = {
      ...goal,
      id: Math.random().toString(36).substr(2, 9),
      isCompleted: goal.current >= goal.target
    };
    setSavingsGoals(prev => [...prev, newGoal]);
  };

  const updateSavingsGoal = (id: string, updates: Partial<SavingsGoal>) => {
    setSavingsGoals(prev => prev.map(g => g.id === id ? { ...g, ...updates } : g));
  };

  const deleteSavingsGoal = (id: string) => {
    setSavingsGoals(prev => prev.filter(g => g.id !== id));
  };

  const contributeToGoal = (goalId: string, amount: number, walletId?: string) => {
    setSavingsGoals(prev => prev.map(goal => {
      if (goal.id === goalId) {
        const newCurrent = goal.current + amount;
        return {
          ...goal,
          current: newCurrent,
          isCompleted: newCurrent >= goal.target
        };
      }
      return goal;
    }));

    if (walletId) {
      const goal = savingsGoals.find(g => g.id === goalId);
      addTransaction({
        title: `Injection: ${goal?.title || 'Savings Goal'}`,
        amount: -amount,
        type: 'expense',
        category: 'Investment',
        walletId: walletId,
        icon: 'savings'
      });
    }
  };

  const addCategory = (category: Omit<Category, 'id'>) => {
    const newCat = { ...category, id: Math.random().toString(36).substr(2, 9) };
    setCategories(prev => [...prev, newCat]);
  };

  const updateCategory = (id: string, updates: Partial<Category>) => {
    setCategories(prev => {
      const updated = prev.map(cat => cat.id === id ? { ...cat, ...updates } : cat);
      if (updates.name) {
        const oldName = prev.find(cat => cat.id === id)?.name;
        if (oldName && oldName !== updates.name) {
          setTransactions(txs => txs.map(tx => tx.category === oldName ? { ...tx, category: updates.name! } : tx));
          setBudgets(bgs => bgs.map(bg => bg.category === oldName ? { ...bg, category: updates.name! } : bg));
        }
      }
      return updated;
    });
  };

  const deleteCategory = (id: string) => {
    setCategories(prev => prev.filter(cat => cat.id !== id));
  };

  const addRecurringTransaction = (recurring: Omit<RecurringTransaction, 'id'>) => {
    const newRecurring = { ...recurring, id: Math.random().toString(36).substr(2, 9) };
    setRecurringTransactions(prev => [...prev, newRecurring]);
  };

  const updateRecurringTransaction = (id: string, updates: Partial<RecurringTransaction>) => {
    setRecurringTransactions(prev => prev.map(rec => rec.id === id ? { ...rec, ...updates } : rec));
  };

  const deleteRecurringTransaction = (id: string) => {
    setRecurringTransactions(prev => prev.filter(rec => rec.id !== id));
  };

  const addWallet = (wallet: Omit<Wallet, 'id'>) => {
    const newWallet = { ...wallet, id: Math.random().toString(36).substr(2, 9) };
    setWallets(prev => [...prev, newWallet]);
  };

  const updateWallet = (id: string, updates: Partial<Wallet>) => {
    setWallets(prev => prev.map(w => w.id === id ? { ...w, ...updates } : w));
  };

  const deleteWallet = (id: string) => {
    setWallets(prev => prev.filter(w => w.id !== id));
  };

  const reorderWallets = (newWallets: Wallet[]) => {
    setWallets(newWallets);
  };

  const addLiability = (liability: Omit<Liability, 'id'>) => {
    const newLiability = { ...liability, id: Math.random().toString(36).substr(2, 9) };
    setLiabilities(prev => [...prev, newLiability]);
  };

  const updateLiability = (id: string, updates: Partial<Liability>) => {
    setLiabilities(prev => prev.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const deleteLiability = (id: string) => {
    setLiabilities(prev => prev.filter(l => l.id !== id));
  };

  const payLiability = (id: string, amount: number) => {
    setLiabilities(prev => prev.map(l => {
      if (l.id === id) {
        return { ...l, remainingAmount: Math.max(0, l.remainingAmount - amount) };
      }
      return l;
    }));
  };

  const contextValue: TransactionContextType = {
    transactions,
    budgets,
    savingsGoals,
    categories,
    recurringTransactions,
    wallets,
    liabilities,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    updateBudgetWallets,
    updateBudgetLimit,
    addSavingsGoal,
    updateSavingsGoal,
    deleteSavingsGoal,
    contributeToGoal,
    addCategory,
    updateCategory,
    deleteCategory,
    addRecurringTransaction,
    updateRecurringTransaction,
    deleteRecurringTransaction,
    addWallet,
    updateWallet,
    deleteWallet,
    reorderWallets,
    addLiability,
    updateLiability,
    deleteLiability,
    payLiability,
    isPasscodeEnabled,
    setIsPasscodeEnabled,
  };

  return (
    <TransactionContext.Provider value={contextValue}>
      {children}
    </TransactionContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionProvider');
  }
  return context;
}
