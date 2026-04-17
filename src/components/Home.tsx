import React, { useMemo } from 'react';
import { TrendingUp, CreditCard, ShoppingBag, Car, Hotel, Fuel, Landmark, Diamond, BarChart3, Clock, Wallet } from 'lucide-react';
import { MISSIONS } from '../constants';
import { motion } from 'motion/react';
import { useTransactions } from '../context/TransactionContext';
import IncomeStatement from './IncomeStatement';

const IconMap: Record<string, React.ElementType> = {
  shopping_bag: ShoppingBag,
  restaurant: (props) => (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" /><path d="M7 2v20" /><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  ),
  payments: TrendingUp,
  local_gas_station: Fuel,
  local_taxi: Car,
  hotel: Hotel,
  auto_graph: BarChart3,
  account_balance: Landmark,
  diamond: Diamond,
};

export default function Home({ onNavigate }: { onNavigate: (screen: 'home' | 'history' | 'budget' | 'growth' | 'investing') => void }) {
  const { transactions, recurringTransactions, savingsGoals, budgets, wallets } = useTransactions();

  const totalLiquidity = useMemo(() => {
    return wallets.reduce((sum, w) => sum + (w.type === 'Credit Card' ? -Math.abs(w.balance) : w.balance), 0);
  }, [wallets]);

  const safeToSpend = useMemo(() => {
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const daysRemaining = daysInMonth - now.getDate() + 1;

    // 1. Expected Income this month (Recurring + Income already received)
    const monthlyIncome = recurringTransactions
      .filter(rt => rt.type === 'income' && rt.frequency === 'Monthly')
      .reduce((sum, rt) => sum + rt.amount, 0);
    
    // 2. Already received income this month
    const curMonthIncomeResult = transactions
      .filter(tx => tx.type === 'income' && new Date(tx.timestamp).getMonth() === now.getMonth())
      .reduce((sum, tx) => sum + tx.amount, 0);

    // 3. Fixed Expenses (Recurring)
    const fixedExpenses = recurringTransactions
      .filter(rt => rt.type === 'expense' && rt.frequency === 'Monthly')
      .reduce((sum, rt) => sum + rt.amount, 0);

    // 4. Savings Targets (Simulated monthly target: 10% of remaining if not specified, 
    // or we can use the difference between target and current divided by some months)
    // For simplicity: let's say we want to put $5,000 aside for savings goals this month.
    const savingsTarget = 5000; 

    // 5. Already spent this month (Expenses)
    const curMonthSpent = Math.abs(transactions
      .filter(tx => tx.type === 'expense' && new Date(tx.timestamp).getMonth() === now.getMonth())
      .reduce((sum, tx) => sum + tx.amount, 0));

    const totalAvailable = monthlyIncome + curMonthIncomeResult - fixedExpenses - savingsTarget;
    const remainingForMonth = totalAvailable - curMonthSpent;
    
    // Safe to spend today
    const perDay = remainingForMonth / daysRemaining;

    return {
      monthly: Math.max(0, remainingForMonth),
      daily: Math.max(0, perDay),
      percent: Math.min(100, Math.max(0, (curMonthSpent / totalAvailable) * 100))
    };
  }, [transactions, recurringTransactions]);

  return (
    <div className="space-y-10 pb-12">
      {/* Total Liquidity Section */}
      <header className="flex flex-col items-center text-center space-y-2 pt-4">
        <span className="text-on-surface-variant tracking-[0.1em] uppercase font-semibold text-[0.75rem]">Total Liquidity</span>
        <div className="flex items-baseline gap-2 relative">
          <div className="absolute inset-0 -z-10 flex items-center justify-center opacity-10">
            <svg className="w-full h-12 text-primary" viewBox="0 0 100 20">
              <path d="M0 15 Q 25 5, 50 12 T 100 8" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
          <span className="text-primary-container font-headline text-5xl md:text-7xl">$</span>
          <span className="text-on-surface font-headline text-6xl md:text-8xl tracking-tight">
            {totalLiquidity.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-low text-primary text-sm font-medium">
          <TrendingUp className="w-4 h-4" />
          <span>+2.4% this month</span>
        </div>
      </header>

      {/* Private Reserve Card */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-primary/20 to-transparent rounded-2xl blur opacity-30"></div>
        <div className="relative h-56 w-full rounded-2xl bg-gradient-to-br from-[#2a2a2a] to-[#0e0e0e] p-8 flex flex-col justify-between overflow-hidden border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="font-headline text-2xl text-primary leading-none">Private Reserve</p>
              <p className="text-on-surface-variant text-[10px] tracking-widest uppercase">Wealth Tier IV</p>
            </div>
            <CreditCard className="w-10 h-10 text-primary/40" />
          </div>
          <div className="flex justify-between items-end">
            <div className="space-y-4">
              <p className="font-mono text-lg tracking-[0.25em] text-on-surface/80">•••• •••• •••• 8892</p>
              <div className="flex gap-8">
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-on-surface-variant">Card Holder</p>
                  <p className="text-xs font-medium uppercase tracking-wider">Julian Vane</p>
                </div>
                <div>
                  <p className="text-[8px] uppercase tracking-widest text-on-surface-variant">Expires</p>
                  <p className="text-xs font-medium tracking-wider">12/28</p>
                </div>
              </div>
            </div>
            <div className="w-12 h-8 rounded-md bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center">
              <div className="flex -space-x-2">
                <div className="w-5 h-5 rounded-full bg-primary/80"></div>
                <div className="w-5 h-5 rounded-full bg-primary-container/80"></div>
              </div>
            </div>
          </div>
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary/5 rounded-full blur-3xl"></div>
        </div>
      </div>

      {/* Safe-to-Spend Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-headline text-2xl uppercase tracking-wider text-on-surface-variant flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            Safe-to-Spend
          </h3>
          <span className="text-[10px] text-on-surface-variant uppercase tracking-[0.2em]">Rest of month</span>
        </div>
        <div className="bg-surface-container p-8 rounded-3xl border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -z-10 group-hover:bg-primary/10 transition-colors"></div>
          
          <div className="flex items-center justify-between mb-8">
            <div className="space-y-1">
              <p className="text-5xl font-headline text-on-surface tracking-tight">${safeToSpend.monthly.toLocaleString()}</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-[0.3em] font-bold">Remaining in your vault</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-headline text-primary">${safeToSpend.daily.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
              <p className="text-[10px] text-primary/60 uppercase tracking-widest font-bold">Per day limit</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-end text-[10px] font-bold uppercase tracking-widest">
              <span className="text-on-surface-variant">Consumption Pulse</span>
              <span className={safeToSpend.percent > 90 ? 'text-error' : 'text-primary'}>{safeToSpend.percent.toFixed(0)}%</span>
            </div>
            <div className="w-full h-2 bg-surface-container-highest rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${safeToSpend.percent}%` }}
                className={`h-full ${safeToSpend.percent > 90 ? 'bg-error' : 'bg-primary'} transition-all`}
              />
            </div>
          </div>

          <p className="mt-6 text-[10px] text-on-surface-variant/60 italic leading-relaxed">
            Basé sur vos flux récurrents et vos objectifs d'épargne. Dépensez moins de <span className="text-primary font-bold">${safeToSpend.daily.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span> aujourd'hui pour rester sur la trajectoire de votre patrimoine.
          </p>
        </div>
      </section>

      {/* Active Portfolio Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-headline text-2xl">Active Portfolio</h3>
          <span 
            onClick={() => onNavigate('investing')}
            className="text-primary font-sans text-[10px] uppercase tracking-widest cursor-pointer hover:underline"
          >
            Details
          </span>
        </div>
        <div className="bg-surface-container-low p-6 rounded-xl border border-outline-variant/5">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-on-surface-variant text-[10px] uppercase tracking-widest mb-1">Total Invested Assets</p>
              <h4 className="text-3xl font-headline">$2,840,500.00</h4>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Daily Yield</p>
              <p className="text-primary font-medium flex items-center justify-end gap-1">
                <TrendingUp className="w-4 h-4" />
                +$14,230.12
              </p>
            </div>
          </div>
          <div className="h-16 w-full flex items-end gap-1">
            {[30, 45, 35, 60, 55, 80, 100].map((h, i) => (
              <div 
                key={i} 
                className={`flex-1 rounded-t-sm ${i >= 5 ? 'bg-primary' : 'bg-surface-container-highest/30'}`} 
                style={{ height: `${h}%`, opacity: i === 5 ? 0.4 : 1 }}
              ></div>
            ))}
          </div>
        </div>
      </section>

      {/* Weekly Missions */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-headline text-2xl">Weekly Missions</h3>
          <span 
            onClick={() => onNavigate('growth')}
            className="text-primary font-sans text-[10px] uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity"
          >
            View All
          </span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="col-span-2 bg-surface-container-low p-6 rounded-xl border border-outline-variant/5 flex items-center justify-between">
            <div className="space-y-2">
              <p className="text-on-surface-variant text-[10px] uppercase tracking-widest">Growth Objective</p>
              <h4 className="text-lg font-headline">Rebalance Luxury Portfolio</h4>
              <div className="flex items-center gap-3">
                <div className="h-1 w-32 bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[65%]"></div>
                </div>
                <span className="text-[10px] text-on-surface/60 italic">65% complete</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-full border border-primary/20 flex items-center justify-center text-primary">
              <BarChart3 className="w-6 h-6" />
            </div>
          </div>
          {MISSIONS.slice(1).map((mission) => {
            const Icon = IconMap[mission.icon] || Landmark;
            return (
              <div key={mission.id} className="bg-surface-container-low p-5 rounded-xl border border-outline-variant/5 space-y-3">
                <Icon className="text-primary w-6 h-6" />
                <p className="text-sm font-medium leading-tight">{mission.title}</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-tighter">{mission.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <IncomeStatement />

      {/* Spending Trends */}
      <section className="space-y-4">
        <h3 className="font-headline text-2xl">Spending Trends</h3>
        <div className="glass-card rounded-2xl p-6 border border-white/5 space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-1">
              <p className="text-2xl font-headline">$12,400.00</p>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">This Month</p>
            </div>
            <div className="flex gap-1.5 h-12 items-end">
              {[40, 60, 35, 80, 50, 90].map((h, i) => (
                <div 
                  key={i} 
                  className={`w-2 rounded-t-sm ${i === 3 || i === 5 ? 'bg-primary' : 'bg-surface-container-highest'}`} 
                  style={{ height: `${h}%`, opacity: i === 5 ? 0.6 : 1 }}
                ></div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                  <IconMap.restaurant className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Fine Dining</span>
              </div>
              <span className="text-sm">$4,250</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-surface-container-highest flex items-center justify-center">
                  <IconMap.local_taxi className="w-4 h-4" />
                </div>
                <span className="text-sm">First Class Travel</span>
              </div>
              <span className="text-sm">$6,100</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activities Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-headline text-2xl">Recent Activities</h3>
          <span 
            onClick={() => onNavigate('history')}
            className="text-primary font-sans text-[10px] uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity"
          >
            History
          </span>
        </div>
        <div className="space-y-3">
          {transactions.slice(0, 3).map((tx) => {
            const Icon = IconMap[tx.icon] || ShoppingBag;
            return (
              <div key={tx.id} className="bg-surface-container-low/50 p-4 rounded-xl border border-outline-variant/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center text-primary">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{tx.title}</p>
                    <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{tx.category}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">{tx.amount < 0 ? '-' : '+'}${Math.abs(tx.amount).toLocaleString()}</p>
                  <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">{tx.date}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
