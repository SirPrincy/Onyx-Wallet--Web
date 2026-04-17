import React, { useState, useMemo } from 'react';
import { 
  TrendingDown, Home, Building2, CreditCard, 
  Award, ChevronRight, ArrowDown, X, Wallet, ArrowRight, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTransactions } from '../context/TransactionContext';

export default function DebtScreen() {
  const { liabilities, payLiability } = useTransactions();
  const [selectedDebtId, setSelectedDebtId] = useState<string | null>(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const totalRemaining = useMemo(() => 
    liabilities.reduce((sum, d) => sum + d.remainingAmount, 0), 
  [liabilities]);

  const totalPaid = useMemo(() => 
    liabilities.reduce((sum, d) => sum + (d.totalAmount - d.remainingAmount), 0), 
  [liabilities]);

  const totalOriginal = useMemo(() => 
    liabilities.reduce((sum, d) => sum + d.totalAmount, 0), 
  [liabilities]);

  const handlePayment = () => {
    if (!selectedDebtId || !paymentAmount) return;
    
    payLiability(selectedDebtId, parseFloat(paymentAmount));

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setSelectedDebtId(null);
      setPaymentAmount('');
    }, 1500);
  };

  const selectedDebt = useMemo(() => 
    liabilities.find(d => d.id === selectedDebtId), 
  [liabilities, selectedDebtId]);

  const sortedBySmallest = useMemo(() => 
    [...liabilities].sort((a, b) => a.remainingAmount - b.remainingAmount),
  [liabilities]);

  const debtToIncomeRatio = 18; // Mock for now

  return (
    <div className="space-y-12 pb-12">
      {/* Section 1: Total Debt Overview */}
      <section className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2">Total Indebtedness</span>
          <h2 className="font-headline text-6xl md:text-7xl text-on-surface tracking-tight mb-4">${totalRemaining.toLocaleString()}</h2>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-low border border-outline-variant/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(242,202,80,0.6)]"></span>
            <p className="font-sans text-xs text-on-surface-variant">Debt-to-Income Ratio: <span className="text-primary font-medium">{debtToIncomeRatio}% (Healthy)</span></p>
          </div>
        </div>

        {/* Asymmetric Stat Grid */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7 bg-surface-container-low/40 backdrop-blur-xl p-6 rounded-xl border border-white/5 flex flex-col justify-between h-32">
            <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant">Total Capital Repaid</span>
            <span className="font-headline text-3xl text-on-surface">${totalPaid.toLocaleString()}</span>
          </div>
          <div className="col-span-5 bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-col justify-between h-32">
            <span className="font-sans text-[10px] uppercase tracking-widest text-primary/80">Monthly Service</span>
            <span className="font-headline text-3xl text-primary">${liabilities.reduce((sum, l) => sum + l.monthlyPayment, 0).toLocaleString()}</span>
          </div>
        </div>
      </section>

      {/* Section 2: Active Liabilities List */}
      <section className="space-y-6">
        <h3 className="font-headline text-2xl text-on-surface italic">Portfolio Structure</h3>
        <div className="space-y-4">
          {liabilities.map((debt) => {
            const paid = debt.totalAmount - debt.remainingAmount;
            const progress = (paid / debt.totalAmount) * 100;
            const Icon = debt.type === 'Mortgage' ? Home : debt.type === 'Credit Card' ? CreditCard : Building2;

            return (
              <div 
                key={debt.id}
                onClick={() => setSelectedDebtId(debt.id)}
                className={`group p-6 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container border-l-2 border-primary cursor-pointer`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="font-sans text-base font-medium text-on-surface">{debt.name}</h4>
                    <p className="font-sans text-xs text-on-surface-variant mt-1">Interest: {debt.interestRate}% APR • {debt.provider}</p>
                  </div>
                  <Icon className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[11px] uppercase tracking-wider font-medium">
                    <span className="text-on-surface-variant">Paid: ${paid.toLocaleString()}</span>
                    <span className="text-on-surface">Remaining: ${debt.remainingAmount.toLocaleString()}</span>
                  </div>
                  <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      className="h-full bg-primary rounded-full"
                    ></motion.div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Section 3: Repayment Strategy */}
      {liabilities.length > 0 && (
        <section>
          <div className="relative overflow-hidden p-8 rounded-2xl bg-surface-container-high border border-outline-variant/10">
            {/* Background Pattern */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-primary/5"></div>
            <div className="absolute top-24 -right-6 w-32 h-32 rounded-full border border-primary/10"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-primary mb-1 block">Repayment Strategy</span>
                  <h3 className="font-headline text-3xl text-on-surface">The Snowball</h3>
                </div>
                <TrendingDown className="w-8 h-8 text-primary" />
              </div>

              <div className="bg-surface-container-low/40 backdrop-blur-xl p-6 rounded-xl border border-white/5 mb-8">
                <p className="font-sans text-xs text-on-surface-variant mb-4">Focused elimination of the smallest balances to maximize psychological momentum and cash flow.</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Next Target</span>
                    <p className="font-sans font-medium text-on-surface">{sortedBySmallest[0].name}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Projected Payoff</span>
                    <p className="font-sans font-medium text-primary">Est. {new Date(new Date().setMonth(new Date().getMonth() + Math.ceil(sortedBySmallest[0].remainingAmount / sortedBySmallest[0].monthlyPayment))).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => setSelectedDebtId(sortedBySmallest[0].id)}
                className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-xl font-sans font-semibold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/10 active:scale-[0.98] transition-transform"
              >
                Boost Payment
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Payment Modal */}
      <AnimatePresence>
        {selectedDebtId && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedDebtId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-surface-container-low rounded-t-[2rem] z-[120] p-8 max-h-[80vh] overflow-y-auto no-scrollbar border-t border-white/10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-headline text-3xl text-on-surface italic">Boost Payment</h3>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest mt-1">Accelerate your financial freedom</p>
                </div>
                <button onClick={() => setSelectedDebtId(null)} className="p-2 rounded-full bg-white/5 text-on-surface-variant">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="p-6 rounded-2xl bg-surface-container-highest/30 border border-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold mb-2">Targeting</p>
                  <p className="text-on-surface font-medium">{selectedDebt?.title}</p>
                  <p className="text-primary text-xs mt-1">Remaining: ${(selectedDebt ? selectedDebt.target - selectedDebt.paid : 0).toLocaleString()}</p>
                </div>

                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Payment Amount ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-headline text-2xl">$</span>
                    <input 
                      type="number"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(e.target.value)}
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl py-6 pl-10 pr-4 text-on-surface text-3xl font-headline focus:ring-1 focus:ring-primary/40"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Source Liquidity</span>
                    <span className="text-xs text-on-surface font-medium">Main Vault</span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Wallet className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest">Available: $482,000</span>
                  </div>
                </div>

                <button 
                  onClick={handlePayment}
                  disabled={isSuccess}
                  className="w-full py-5 metallic-gradient rounded-xl text-background font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {isSuccess ? (
                    <>Success <CheckCircle className="w-4 h-4" /></>
                  ) : (
                    <>Confirm Payment <ArrowRight className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
