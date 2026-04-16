import React from 'react';
import { 
  TrendingDown, Home, Building2, CreditCard, 
  Award, ChevronRight, ArrowDown
} from 'lucide-react';

export default function DebtScreen() {
  return (
    <div className="space-y-12 pb-12">
      {/* Section 1: Total Debt Overview */}
      <section className="space-y-6">
        <div className="flex flex-col items-center text-center">
          <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-on-surface-variant mb-2">Total Indebtedness</span>
          <h2 className="font-headline text-6xl md:text-7xl text-on-surface tracking-tight mb-4">$248,500.00</h2>
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-surface-container-low border border-outline-variant/10">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(242,202,80,0.6)]"></span>
            <p className="font-sans text-xs text-on-surface-variant">Debt-to-Income Ratio: <span className="text-primary font-medium">18% (Healthy)</span></p>
          </div>
        </div>

        {/* Asymmetric Stat Grid */}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-7 bg-surface-container-low/40 backdrop-blur-xl p-6 rounded-xl border border-white/5 flex flex-col justify-between h-32">
            <span className="font-sans text-[10px] uppercase tracking-widest text-on-surface-variant">Available Liquidity</span>
            <span className="font-headline text-3xl text-on-surface">$142,000</span>
          </div>
          <div className="col-span-5 bg-primary/5 p-6 rounded-xl border border-primary/20 flex flex-col justify-between h-32">
            <span className="font-sans text-[10px] uppercase tracking-widest text-primary/80">Monthly Service</span>
            <span className="font-headline text-3xl text-primary">$4,120</span>
          </div>
        </div>
      </section>

      {/* Section 2: Active Liabilities List */}
      <section className="space-y-6">
        <h3 className="font-headline text-2xl text-on-surface italic">Portfolio Structure</h3>
        <div className="space-y-4">
          {/* Item 1: Mortgage */}
          <div className="group p-6 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container border-l-2 border-primary">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="font-sans text-base font-medium text-on-surface">Mortgage - West Kensington</h4>
                <p className="font-sans text-xs text-on-surface-variant mt-1">Interest: 3.2% Fixed APR</p>
              </div>
              <Home className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] uppercase tracking-wider font-medium">
                <span className="text-on-surface-variant">Paid: $265,000</span>
                <span className="text-on-surface">Remaining: $185,000</span>
              </div>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
          </div>

          {/* Item 2: Business Expansion Loan */}
          <div className="group p-6 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container border-l-2 border-primary">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h4 className="font-sans text-base font-medium text-on-surface">Business Expansion Loan</h4>
                <p className="font-sans text-xs text-on-surface-variant mt-1">Interest: 5.5% Variable</p>
              </div>
              <Building2 className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-[11px] uppercase tracking-wider font-medium">
                <span className="text-on-surface-variant">Paid: $57,500</span>
                <span className="text-on-surface">Remaining: $42,500</span>
              </div>
              <div className="h-1 w-full bg-surface-container-highest rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>

          {/* Item 3: Luxe Credit Line */}
          <div className="group p-6 rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container border-l-2 border-primary">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-sans text-base font-medium text-on-surface">Luxe Credit Line</h4>
                  <p className="font-sans text-xs text-on-surface-variant mt-0.5">Next payment in 12 days</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-headline text-xl text-on-surface">$21,000</span>
                <span className="text-[10px] uppercase tracking-widest text-primary">Pending</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Repayment Strategy */}
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
                  <p className="font-sans font-medium text-on-surface">Luxe Credit Line</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Projected Payoff</span>
                  <p className="font-sans font-medium text-primary">Nov 2024</p>
                </div>
              </div>
            </div>

            <button className="w-full bg-gradient-to-br from-primary to-primary-container text-on-primary py-4 rounded-xl font-sans font-semibold text-sm uppercase tracking-[0.2em] shadow-lg shadow-primary/10 active:scale-[0.98] transition-transform">
              Boost Payment
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
