import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Transaction, Budget } from '../types';
import { TRANSACTIONS as INITIAL_TRANSACTIONS, BUDGETS as INITIAL_BUDGETS } from '../constants';

export interface SavingsGoal {
  id: string;
  title: string;
  desc: string;
  current: number;
  target: number;
  isCompleted: boolean;
}

interface TransactionContextType {
  transactions: Transaction[];
  budgets: Budget[];
  savingsGoals: SavingsGoal[];
  addTransaction: (transaction: Omit<Transaction, 'id' | 'timestamp' | 'date' | 'time'>) => void;
  updateTransaction: (id: string, updates: Partial<Transaction>) => void;
  deleteTransaction: (id: string) => void;
  updateBudgetWallets: (category: string, walletIds: string[]) => void;
  addSavingsGoal: (goal: Omit<SavingsGoal, 'id' | 'isCompleted'>) => void;
  contributeToGoal: (goalId: string, amount: number) => void;
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

const TransactionContext = createContext<TransactionContextType | undefined>(undefined);

export function TransactionProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [budgets, setBudgets] = useState<Budget[]>(INITIAL_BUDGETS);
  const [savingsGoals, setSavingsGoals] = useState<SavingsGoal[]>(INITIAL_SAVINGS);

  const addTransaction = (newTx: Omit<Transaction, 'id' | 'timestamp' | 'date' | 'time'>) => {
    const now = new Date();
    const fullTx: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: now.getTime(),
      date: 'Today',
      time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setTransactions(prev => [fullTx, ...prev]);
  };

  const updateTransaction = (id: string, updates: Partial<Transaction>) => {
    setTransactions(prev => prev.map(tx => tx.id === id ? { ...tx, ...updates } : tx));
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(tx => tx.id !== id));
  };

  const updateBudgetWallets = (category: string, walletIds: string[]) => {
    setBudgets(prev => prev.map(b => 
      b.category === category ? { ...b, linkedWallets: walletIds } : b
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

  const contributeToGoal = (goalId: string, amount: number) => {
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
  };

  return (
    <TransactionContext.Provider value={{ 
      transactions, 
      budgets, 
      savingsGoals, 
      addTransaction, 
      updateTransaction,
      deleteTransaction,
      updateBudgetWallets,
      addSavingsGoal,
      contributeToGoal
    }}>
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
