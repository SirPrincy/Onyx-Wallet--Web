import React from 'react';
import { TrendingUp, CreditCard, ShoppingBag, Car, Hotel, Fuel, Landmark, Diamond, BarChart3 } from 'lucide-react';
import { MISSIONS } from '../constants';
import { motion } from 'motion/react';
import { useTransactions } from '../context/TransactionContext';

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

export default function Home({ onNavigate }: { onNavigate: (screen: 'home' | 'history' | 'budget' | 'growth') => void }) {
  const { transactions } = useTransactions();
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
          <span className="text-on-surface font-headline text-6xl md:text-8xl tracking-tight">428,950.00</span>
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

      {/* Active Portfolio Section */}
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-headline text-2xl">Active Portfolio</h3>
          <span className="text-primary font-sans text-[10px] uppercase tracking-widest cursor-pointer">Details</span>
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
