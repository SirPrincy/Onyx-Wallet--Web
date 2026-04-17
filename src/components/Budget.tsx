import React, { useState, useMemo, useEffect } from 'react';
import { TrendingUp, ArrowRight, Wallet, Check, ChevronRight, X, Sparkles, AlertCircle, Info, Building2, Coins } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTransactions } from '../context/TransactionContext';

export default function Budget() {
  const { transactions, budgets, updateBudgetWallets, updateBudgetLimit, wallets } = useTransactions();
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null);
  const [editingLimit, setEditingLimit] = useState<string>('');
  const [projectionAdjustment, setProjectionAdjustment] = useState<number>(0);
  const [showForecastDetail, setShowForecastDetail] = useState(false);
  const [showWalletPicker, setShowWalletPicker] = useState(false);

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

  // Forecasting Logic
  const advancedForecast = useMemo(() => {
    const today = new Date();
    const dayOfMonth = today.getDate();
    const totalDays = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
    
    // Linear projection: (Spent / Days Passed) * Total Days in Month
    const linearProjection = (totalSpent / dayOfMonth) * totalDays;
    
    // Adjusted projection includes user-defined deviation
    const adjustedProjection = linearProjection + projectionAdjustment;
    
    const remainingDays = totalDays - dayOfMonth;
    const dailyAvailable = Math.max(0, (totalLimit - totalSpent) / (remainingDays || 1));
    
    const trend = ((adjustedProjection - totalLimit) / totalLimit) * 100;
    
    return {
      linearProjection,
      adjustedProjection,
      trend,
      dailyAvailable,
      isOverProjected: adjustedProjection > totalLimit,
      projectedOverAmount: Math.max(0, adjustedProjection - totalLimit),
      daysRemaining: remainingDays
    };
  }, [totalSpent, totalLimit, projectionAdjustment]);

  const activeBudget = useMemo(() => {
    return budgetData.find(b => b.category === selectedBudget);
  }, [budgetData, selectedBudget]);

  const forecast = useMemo(() => {
    const diff = totalLimit - totalSpent;
    const isOver = diff < 0;
    return {
      status: isOver ? 'over budget' : 'on track',
      amount: Math.abs(diff),
      isOver
    };
  }, [totalSpent, totalLimit]);

  const toggleWallet = (walletId: string) => {
    if (!activeBudget) return;
    const currentWallets = activeBudget.linkedWallets || [];
    const newWallets = currentWallets.includes(walletId)
      ? currentWallets.filter(id => id !== walletId)
      : [...currentWallets, walletId];
    updateBudgetWallets(activeBudget.category, newWallets);
  };

  const handleUpdateLimit = () => {
    if (!activeBudget || !editingLimit) return;
    updateBudgetLimit(activeBudget.category, parseFloat(editingLimit));
    setEditingLimit('');
  };

  useEffect(() => {
    if (activeBudget) {
      setEditingLimit(activeBudget.limit.toString());
    }
  }, [selectedBudget]);

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
                      {wallets.find(w => w.id === wid)?.name}
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

              <div className="space-y-6">
                <div className="flex flex-col bg-surface-container-highest/20 p-6 rounded-2xl border border-white/5">
                  <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant mb-4">Monthly Limit</label>
                  <div className="flex items-center gap-4">
                    <div className="relative flex-1">
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 font-headline text-2xl text-primary/60">$</span>
                      <input 
                        type="number"
                        value={editingLimit}
                        onChange={(e) => setEditingLimit(e.target.value)}
                        className="w-full bg-transparent border-none p-0 pl-6 font-headline text-4xl focus:ring-0 text-on-surface"
                      />
                    </div>
                    <button 
                      onClick={handleUpdateLimit}
                      className="px-6 py-3 rounded-xl bg-primary text-background text-[10px] font-bold uppercase tracking-widest hover:opacity-90 transition-opacity"
                    >
                      Update
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] uppercase tracking-[0.25em] text-on-surface-variant font-bold">Account Connectivity</label>
                  <div 
                    onClick={() => setShowWalletPicker(true)}
                    className="flex flex-col bg-surface-container-highest/20 p-6 rounded-2xl hover:bg-surface-container-highest/40 transition-colors cursor-pointer group border border-white/5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                          <Wallet className="text-primary w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-on-surface font-medium block">Linked Wallets</span>
                          <span className="text-[10px] text-primary uppercase tracking-widest font-bold">
                            {activeBudget.linkedWallets?.length || 0} Accounts Active
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="text-on-surface-variant group-hover:translate-x-1 transition-transform w-5 h-5" />
                    </div>
                  </div>
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

      {/* Wallet Picker Sub-Modal */}
      <AnimatePresence>
        {showWalletPicker && activeBudget && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowWalletPicker(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md z-[130]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-surface-container-low rounded-t-[2rem] z-[140] p-8 max-h-[70vh] overflow-y-auto no-scrollbar border-t border-white/10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              <div className="flex justify-between items-center mb-8">
                <h3 className="font-headline text-3xl text-on-surface italic">Select Wallets</h3>
                <button onClick={() => setShowWalletPicker(false)} className="p-2 rounded-full bg-white/5 text-on-surface-variant">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {wallets.map((wallet) => {
                  const isLinked = activeBudget.linkedWallets?.includes(wallet.id);
                  return (
                    <button
                      key={wallet.id}
                      onClick={() => toggleWallet(wallet.id)}
                      className={`flex items-center gap-4 p-4 rounded-2xl transition-all text-left ${isLinked ? 'bg-primary/10 border border-primary/40' : 'bg-surface-container-highest/50 border border-transparent hover:bg-surface-container-highest'}`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isLinked ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                        <Wallet className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`font-medium truncate ${isLinked ? 'text-primary' : 'text-on-surface'}`}>{wallet.name}</p>
                        <p className="text-[8px] uppercase tracking-widest text-on-surface-variant">
                          {isLinked ? 'Linked' : 'Available'}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>

              <button 
                onClick={() => setShowWalletPicker(false)}
                className="w-full mt-8 py-4 bg-primary text-background rounded-xl font-bold uppercase tracking-widest text-[10px]"
              >
                Done
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section>
        <div className="bg-surface-container-low p-8 rounded-xl border border-outline-variant/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary to-primary-container opacity-5 blur-3xl -mr-32 -mt-32 group-hover:opacity-10 transition-opacity"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="text-primary w-5 h-5" />
              <h3 className="font-sans text-[10px] tracking-[0.25em] uppercase text-on-surface-variant">Spending Forecast</h3>
            </div>
            <div className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${advancedForecast.isOverProjected ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-primary/10 text-primary border border-primary/20'}`}>
              {advancedForecast.isOverProjected ? 'Risk Alert' : 'Healthy Trend'}
            </div>
          </div>

          <div className="space-y-10">
            <div>
              <div className="flex justify-between items-end mb-4">
                <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant">Projected Monthly Total</span>
                <span className={`font-headline text-4xl ${advancedForecast.isOverProjected ? 'text-red-400' : 'text-primary'}`}>
                  ${Math.round(advancedForecast.adjustedProjection).toLocaleString()}
                </span>
              </div>
              
              <div className="h-[2px] w-full bg-surface-container-highest rounded-full relative">
                {/* Current Spent */}
                <div 
                  className="absolute h-full bg-primary z-10" 
                  style={{ width: `${Math.min((totalSpent / totalLimit) * 100, 100)}%` }} 
                />
                {/* Projected Line */}
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min((advancedForecast.adjustedProjection / totalLimit) * 100, 120)}%` }}
                  className={`absolute h-full border-r-2 border-dashed z-20 ${advancedForecast.isOverProjected ? 'border-red-400' : 'border-primary'}`}
                />
              </div>
              <div className="mt-2 flex justify-between text-[8px] uppercase tracking-widest text-on-surface-variant">
                <span>Current</span>
                <span>Limit: ${totalLimit.toLocaleString()}</span>
                <span>Projected</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-xl bg-surface-container-highest/30 border border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Safe Daily Spend</span>
                <span className="font-headline text-xl text-on-surface">${Math.round(advancedForecast.dailyAvailable).toLocaleString()}</span>
                <p className="text-[8px] text-on-surface-variant mt-1 italic">For {advancedForecast.daysRemaining} days remaining</p>
              </div>
              <div className="p-4 rounded-xl bg-surface-container-highest/30 border border-white/5">
                <span className="text-[10px] uppercase tracking-widest text-on-surface-variant block mb-1">Monthly Variance</span>
                <span className={`font-headline text-xl ${advancedForecast.trend > 0 ? 'text-red-400' : 'text-primary'}`}>
                  {advancedForecast.trend > 0 ? '+' : ''}{advancedForecast.trend.toFixed(1)}%
                </span>
                <p className="text-[8px] text-on-surface-variant mt-1 italic">Vs. overall limit</p>
              </div>
            </div>

            {/* Adjustment Controls */}
            <div className="space-y-4 pt-4 border-t border-outline-variant/10">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Manual Adjustment</span>
                  <div className="group relative">
                    <Info className="w-3 h-3 text-on-surface-variant/50 cursor-help" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-surface-container-high rounded-lg text-white text-[8px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50 shadow-xl border border-white/5">
                      Adjust projection for known upcoming large purchases or savings.
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-primary">
                  {projectionAdjustment >= 0 ? '+' : ''}{projectionAdjustment.toLocaleString()} USD
                </span>
              </div>
              <input 
                type="range"
                min="-5000"
                max="5000"
                step="50"
                value={projectionAdjustment}
                onChange={(e) => setProjectionAdjustment(parseInt(e.target.value))}
                className="w-full h-1.5 bg-surface-container-highest rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <div className="flex justify-between text-[8px] text-on-surface-variant uppercase tracking-widest">
                <span>Save $5k</span>
                <span>Normal Trend</span>
                <span>Extra $5k</span>
              </div>
            </div>

            <button 
              onClick={() => setShowForecastDetail(!showForecastDetail)}
              className="w-full py-4 bg-surface-container-highest/50 border border-white/5 rounded-xl text-[10px] uppercase tracking-[0.2em] text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              {showForecastDetail ? 'Hide Insights' : 'Explain Logic'}
              <ChevronRight className={`w-4 h-4 transition-transform ${showForecastDetail ? 'rotate-90' : ''}`} />
            </button>

            <AnimatePresence>
              {showForecastDetail && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 rounded-xl bg-primary/5 border border-primary/10 space-y-3">
                    <div className="flex gap-3">
                      <TrendingUp className="w-4 h-4 text-primary shrink-0" />
                      <p className="text-[10px] text-on-surface-variant leading-relaxed">
                        Our algorithm uses a <span className="text-on-surface font-medium">linear extrapolation</span> based on your spending velocity in the first {new Date().getDate()} days of the month.
                      </p>
                    </div>
                    {advancedForecast.isOverProjected && (
                      <div className="flex gap-3">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <p className="text-[10px] text-on-surface-variant leading-relaxed">
                          At your current rate, you will exceed your budget by <span className="text-red-400 font-medium">${advancedForecast.projectedOverAmount.toLocaleString()}</span>. Consider reducing daily spend to <span className="text-primary font-medium">${Math.round(advancedForecast.dailyAvailable)}</span> to stay on track.
                        </p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </div>
  );
}
