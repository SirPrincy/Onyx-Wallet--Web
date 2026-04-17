import React from 'react';

export interface Transaction {
  id: string;
  title: string;
  category: string;
  subcategory?: string;
  subcategoryIcon?: string;
  amount: number;
  type: 'expense' | 'income' | 'transfer';
  date: string;
  time: string;
  icon: string;
  timestamp: number;
  walletId?: string;
}

export interface Mission {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  icon: string;
  type: 'growth' | 'audit' | 'appraisal';
}

export interface Budget {
  category: string;
  subtext: string;
  spent: number;
  limit: number;
  linkedWallets?: string[]; // IDs of linked wallets
}

export interface Achievement {
  id: string;
  title: string;
  icon: string;
  earned: boolean;
}

export interface Wallet {
  id: string;
  name: string;
  type: 'Credit Card' | 'Bank Account' | 'Cash' | 'Crypto' | 'Investment' | 'Property';
  balance: number;
  currency: string;
  color: string;
  icon?: string;
  lastFour?: string;
  provider?: string;
  isVisible: boolean;
}

export interface Liability {
  id: string;
  name: string;
  type: 'Mortgage' | 'Personal Loan' | 'Student Loan' | 'Credit Card' | 'Other' | 'Leasing';
  totalAmount: number;
  remainingAmount: number;
  interestRate: number;
  monthlyPayment: number;
  dueDate: string;
  provider: string;
}
