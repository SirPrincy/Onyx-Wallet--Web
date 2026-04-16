import React from 'react';
import { 
  TrendingUp, CreditCard, Wallet, Bitcoin, 
  Send, Download, ArrowLeftRight, Snowflake,
  Stars, LineChart, Building2
} from 'lucide-react';

export default function WalletScreen() {
  return (
    <div className="space-y-10 pb-12">
      {/* Title & Hero */}
      <section>
        <h2 className="font-headline text-4xl text-on-surface mb-2">Account Wallet</h2>
        <div className="flex items-baseline gap-2">
          <span className="text-on-surface-variant text-sm font-sans uppercase tracking-widest">Net Worth</span>
        </div>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-5xl font-headline tracking-tight text-on-surface">
            $1,248,392.<span className="text-2xl text-on-surface-variant">50</span>
          </span>
          <div className="flex items-center bg-primary/10 px-2 py-1 rounded-lg">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="text-primary text-xs font-bold ml-1">4.2%</span>
          </div>
        </div>
      </section>

      {/* Wallet Carousel */}
      <section className="-mx-6">
        <div className="flex overflow-x-auto no-scrollbar snap-x snap-mandatory gap-4 px-6">
          {/* Main Vault Card */}
          <div className="snap-center shrink-0 w-[85%] bg-gradient-to-br from-surface-container-highest to-surface-container-low rounded-2xl p-6 relative overflow-hidden shadow-2xl border border-white/5">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-on-surface-variant mb-1">Main Vault</p>
                <p className="text-2xl font-headline text-primary">$420,000.00</p>
              </div>
              <CreditCard className="w-6 h-6 text-on-surface-variant" />
            </div>
            <div className="flex justify-between items-end">
              <p className="font-mono text-sm tracking-[0.2em] text-on-surface/60">**** **** **** 8829</p>
              <p className="text-xs font-sans text-on-surface-variant">12/28</p>
            </div>
          </div>

          {/* Investment Portfolio Card */}
          <div className="snap-center shrink-0 w-[85%] bg-surface-container/70 backdrop-blur-xl rounded-2xl p-6 border border-outline-variant/20 shadow-2xl">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-on-surface-variant mb-1">Investment Portfolio</p>
                <p className="text-2xl font-headline text-on-surface">$728,392.50</p>
              </div>
              <Wallet className="w-6 h-6 text-primary" />
            </div>
            <div className="flex gap-2">
              <span className="bg-surface-variant px-2 py-1 rounded text-[10px] uppercase font-bold text-on-surface-variant">Equity</span>
              <span className="bg-surface-variant px-2 py-1 rounded text-[10px] uppercase font-bold text-on-surface-variant">Global Tech</span>
            </div>
          </div>

          {/* Crypto Card */}
          <div className="snap-center shrink-0 w-[85%] bg-surface-container-highest rounded-2xl p-6 border border-primary/10">
            <div className="flex justify-between items-start mb-12">
              <div>
                <p className="text-xs font-sans uppercase tracking-widest text-on-surface-variant mb-1">Crypto Ledger</p>
                <p className="text-2xl font-headline text-on-surface">$100,000.00</p>
              </div>
              <Bitcoin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex -space-x-2">
              <div className="w-6 h-6 rounded-full bg-[#F7931A] flex items-center justify-center ring-2 ring-surface-container-highest">
                <span className="text-[10px] font-bold text-white">₿</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-[#627EEA] flex items-center justify-center ring-2 ring-surface-container-highest">
                <span className="text-[10px] font-bold text-white">Ξ</span>
              </div>
              <div className="w-6 h-6 rounded-full bg-surface-variant flex items-center justify-center ring-2 ring-surface-container-highest">
                <span className="text-[10px] font-bold text-on-surface-variant">+3</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="grid grid-cols-4 gap-4">
        {[
          { icon: Send, label: 'Send' },
          { icon: Download, label: 'Receive' },
          { icon: ArrowLeftRight, label: 'Swap' },
          { icon: Snowflake, label: 'Freeze' }
        ].map((action, i) => (
          <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
            <div className="w-14 h-14 rounded-2xl border border-outline-variant/30 flex items-center justify-center group-active:scale-95 transition-all group-hover:border-primary/50 bg-surface-container-low">
              <action.icon className="w-6 h-6 text-primary" />
            </div>
            <span className="text-[10px] font-sans uppercase tracking-widest text-on-surface-variant">{action.label}</span>
          </div>
        ))}
      </section>

      {/* Assets List */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="font-headline text-2xl">Holdings</h3>
          <span className="text-primary text-xs font-sans uppercase tracking-widest hover:underline cursor-pointer">View Analytics</span>
        </div>
        <div className="space-y-4">
          {[
            { icon: Stars, label: 'Gold Spot (XAU)', sub: '14.50 oz', value: '$29,482.10', change: '+1.2%', positive: true },
            { icon: LineChart, label: 'Vanguard S&P 500', sub: 'VOO • 240 Units', value: '$114,832.00', change: '-0.4%', positive: false },
            { icon: Building2, label: 'Real Estate Trust', sub: 'REIT • 1,200 Shares', value: '$84,100.00', change: '+0.8%', positive: true }
          ].map((asset, i) => (
            <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-colors group border border-white/5">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center">
                  <asset.icon className={`w-5 h-5 ${asset.positive ? 'text-primary' : 'text-on-surface-variant'}`} />
                </div>
                <div>
                  <p className="font-medium text-on-surface">{asset.label}</p>
                  <p className="text-xs text-on-surface-variant">{asset.sub}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline text-lg">{asset.value}</p>
                <p className={`text-[10px] ${asset.positive ? 'text-primary' : 'text-red-400'}`}>{asset.change}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
