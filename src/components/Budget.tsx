import React, { useState, useMemo } from 'react';
import { TrendingUp, ArrowRight, Wallet, Check, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTransactions } from '../context/TransactionContext';

const WALLETS = [
  { name: 'Main Vault', id: 'main' },
  { name: 'Offshore Account', id: 'offshore' },
  { name: 'Crypto Cold Room', id: 'crypto' },
];

export default function Budget() {
  const { transactions, budgets, updateBudgetWallets } = useTransactions();
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);

  const budgetData = useMemo(() => {
    return budgets.map(budget => {
      // Calculate dynamic spent based on linked wallets
      const dynamicSpent = transactions
        .filter(tx => 
          tx.type === 'expense' && 
          tx.category === budget.category && 
          (!budget.linkedWallets || budget.linkedWallets.length === 0 || (tx.walletId && budget.linkedWallets.includes(tx.walletId)))
        )
        .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

      return {
        ...budget,
        dynamicSpent: dynamicSpent || budget.spent // Fallback to initial spent if no dynamic transactions
      };
    });
  }, [budgets, transactions]);

  const totalSpent = useMemo(() => {
    return budgetData.reduce((sum, b) => sum + b.dynamicSpent, 0);
  }, [budgetData]);

  const totalLimit = useMemo(() => {
    return budgets.reduce((sum, b) => sum + b.limit, 0);
  }, [budgets]);

  const activeBudget = useMemo(() => {
    return budgetData.find(b => b.category === selectedBudget);
  }, [budgetData, selectedBudget]);

  const toggleWallet = (walletId: string) => {
    if (!activeBudget) return;
    const currentWallets = activeBudget.linkedWallets || [];
    const newWallets = currentWallets.includes(walletId)
      ? currentWallets.filter(id => id !== walletId)
      : [...currentWallets, walletId];
    updateBudgetWallets(activeBudget.category, newWallets);
  };

  return (
    <div className="space-y-12 pb-12">
      <section className="flex flex-col items-center justify-center space-y-8">
        <h1 className="font-headline text-5xl leading-none text-left w-full tracking-tight italic">Budget Planning</h1>
        <div className="relative w-[220px] h-[220px] flex items-center justify-center">
          <svg className="transform -rotate-90 w-full h-full" viewBox="0 0 220 220">
            <circle cx="110" cy="110" r="100" fill="transparent" stroke="rgba(77, 70, 53, 0.3)" strokeWidth="6" />
            <circle 
              cx="110" cy="110" r="100" 
              fill="transparent" 
              stroke="#f2ca50" 
              strokeWidth="6" 
              strokeDasharray="628.32" 
              strokeDashoffset={628.32 - (628.32 * (totalSpent / totalLimit))} 
              strokeLinecap="round" 
              className="transition-all duration-1000 ease-out"
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="font-sans text-[10px] tracking-[0.2em] uppercase text-on-surface-variant mb-1">Total Spent</span>
            <span className="font-headline text-5xl text-primary">${totalSpent.toLocaleString()}</span>
            <div className="w-12 h-[1px] bg-outline-variant/30 my-3"></div>
            <span className="font-sans text-xs text-on-surface-variant">Limit: ${totalLimit.toLocaleString()}</span>
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h2 className="font-headline text-3xl italic tracking-tight">Budgets by Category</h2>
          <span className="font-sans text-[10px] tracking-widest uppercase text-primary border-b border-primary/30 pb-1">Detailed View</span>
        </div>
        <div className="space-y-8 mt-4">
          {budgetData.map((budget) => (
            <div 
              key={budget.category} 
              className="group cursor-pointer"
              onClick={() => setSelectedBudget(budget.category)}
            >
              <div className="flex justify-between items-center mb-3">
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <span className="font-sans text-lg text-on-surface">{budget.category}</span>
                    <ChevronRight className="w-4 h-4 text-on-surface-variant/40 group-hover:text-primary transition-colors" />
                  </div>
                  <span className="font-sans text-[10px] uppercase tracking-wider text-on-surface-variant">{budget.subtext}</span>
                </div>
                <div className="text-right">
                  <span className="font-sans text-md text-primary">${budget.dynamicSpent.toLocaleString()}</span>
                  <span className="text-on-surface-variant mx-1">/</span>
                  <span className="font-sans text-xs text-on-surface-variant">${(budget.limit / 1000)}k</span>
                </div>
              </div>
              <div className="h-[2px] w-full bg-surface-container-highest overflow-hidden rounded-full">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((budget.dynamicSpent / budget.limit) * 100, 100)}%` }}
                  className="h-full bg-gradient-to-r from-primary to-primary-container" 
                ></motion.div>
              </div>
              {budget.linkedWallets && budget.linkedWallets.length > 0 && (
                <div className="mt-2 flex gap-1">
                  {budget.linkedWallets.map(wid => (
                    <div key={wid} className="px-2 py-0.5 rounded-full bg-primary/5 border border-primary/20 text-[8px] uppercase tracking-widest text-primary font-bold">
                      {WALLETS.find(w => w.id === wid)?.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Account Linking Modal */}
      <AnimatePresence>
        {selectedBudget && activeBudget && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBudget(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-surface-container-low rounded-t-[2rem] z-[120] p-8 max-h-[80vh] overflow-y-auto no-scrollbar border-t border-white/10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="font-headline text-3xl text-on-surface italic">{activeBudget.category}</h3>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest mt-1">Link Accounts to this Budget</p>
                </div>
                <button onClick={() => setSelectedBudget(null)} className="p-2 rounded-full bg-white/5 text-on-surface-variant">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-bold">Select Linked Wallets</label>
                <div className="grid gap-3">
                  {WALLETS.map((wallet) => {
                    const isLinked = activeBudget.linkedWallets?.includes(wallet.id);
                    return (
                      <button
                        key={wallet.id}
                        onClick={() => toggleWallet(wallet.id)}
                        className={`flex items-center justify-between p-5 rounded-2xl transition-all border ${isLinked ? 'bg-primary/10 border-primary/40' : 'bg-surface-container-highest/30 border-transparent hover:bg-surface-container-highest/50'}`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isLinked ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                            <Wallet className="w-5 h-5" />
                          </div>
                          <span className={`font-medium ${isLinked ? 'text-primary' : 'text-on-surface'}`}>{wallet.name}</span>
                        </div>
                        <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${isLinked ? 'bg-primary border-primary' : 'border-outline-variant'}`}>
                          {isLinked && <Check className="w-4 h-4 text-background" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-10 p-6 rounded-2xl bg-primary/5 border border-primary/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Current Impact</span>
                  <span className="text-xl font-headline text-primary">${activeBudget.dynamicSpent.toLocaleString()}</span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Only transactions from the selected accounts will be counted towards this budget's spending limit.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section>
        <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary to-primary-container opacity-10 blur-3xl -mr-16 -mt-16 group-hover:opacity-20 transition-opacity"></div>
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="text-primary w-5 h-5" />
            <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-on-surface-variant">Smart Forecast</h3>
          </div>
          <p className="font-headline text-2xl leading-relaxed text-on-surface">
            You are currently <span className="italic text-primary">on track</span> to exceed your monthly savings goal by <span className="text-primary">$2,400</span>.
          </p>
          <div className="mt-6 flex items-center justify-between">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-surface flex items-center justify-center text-[10px] font-bold">JD</div>
              <div className="w-8 h-8 rounded-full bg-surface-container-highest border border-surface flex items-center justify-center text-[10px] font-bold">AS</div>
            </div>
            <button className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2">
              Adjust Goals <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
