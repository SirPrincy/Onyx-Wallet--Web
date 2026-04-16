import React from 'react';

export interface Transaction {
  id: string;
  title: string;
  category: string;
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
