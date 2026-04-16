import React from 'react';
import { 
  Mountain, Brain, Car, BarChart3, 
  Umbrella, HeartHandshake, PlusCircle, ChevronRight 
} from 'lucide-react';

export default function Goals() {
  const activeGoals = [
    {
      category: 'Travel',
      title: 'Swiss Alps Retreat',
      current: 15000,
      target: 25000,
      completion: '14 MONTHS',
      progress: 60,
      icon: Mountain
    },
    {
      category: 'Future',
      title: 'Retirement Seed',
      current: 120000,
      target: 500000,
      completion: '12 YEARS',
      progress: 24,
      icon: Brain
    },
    {
      category: 'Asset',
      title: 'New Tesla Model S',
      current: 45000,
      target: 90000,
      completion: '22 MONTHS',
      progress: 50,
      icon: Car
    }
  ];

  const suggestedGoals = [
    {
      title: 'Emergency Fund',
      desc: 'Recommended: 6 months of expenses',
      icon: Umbrella
    },
    {
      title: 'Philanthropy Fund',
      desc: 'Build your legacy of giving',
      icon: HeartHandshake
    }
  ];

  return (
    <div className="space-y-12 pb-12">
      {/* Page Title */}
      <div>
        <h2 className="font-headline text-5xl mb-2 text-on-surface">Financial Goals</h2>
        <p className="font-sans text-sm text-on-surface-variant tracking-widest uppercase">CURATING YOUR FUTURE WEALTH</p>
      </div>

      {/* Section 1: Active Ambitions */}
      <section>
        <div className="flex justify-between items-end mb-6">
          <h3 className="font-headline text-2xl text-primary italic">Active Ambitions</h3>
          <span className="font-sans text-[10px] tracking-widest text-on-surface-variant uppercase">3 Ongoing</span>
        </div>
        
        <div className="space-y-4">
          {activeGoals.map((goal, i) => (
            <div key={i} className="bg-surface-container-low/40 backdrop-blur-xl rounded-xl p-6 border border-white/5 relative overflow-hidden group">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <p className="font-sans text-[10px] tracking-widest text-primary mb-1 uppercase">{goal.category}</p>
                  <h4 className="font-headline text-2xl text-on-surface">{goal.title}</h4>
                </div>
                
                <div className="relative w-16 h-16">
                  <svg className="w-full h-full -rotate-90">
                    <circle 
                      className="text-surface-container stroke-current" 
                      cx="32" cy="32" r="28" 
                      fill="transparent" 
                      strokeWidth="2"
                    />
                    <circle 
                      className="text-primary stroke-current" 
                      cx="32" cy="32" r="28" 
                      fill="transparent" 
                      strokeWidth="2"
                      strokeDasharray={175.9}
                      strokeDashoffset={175.9 - (175.9 * goal.progress) / 100}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <goal.icon className="w-5 h-5 text-primary" />
                  </div>
                </div>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <span className="block font-sans text-[10px] text-on-surface-variant uppercase tracking-wider mb-1">Current Status</span>
                  <span className="font-headline text-xl text-on-surface">
                    ${goal.current.toLocaleString()} <span className="text-sm text-on-surface-variant font-sans tracking-normal">/ ${goal.target.toLocaleString()}</span>
                  </span>
                </div>
                <div className="text-right">
                  <span className="block font-sans text-[10px] text-on-surface-variant uppercase tracking-tighter">Est. Completion</span>
                  <span className="font-sans text-xs font-bold text-primary">{goal.completion}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section 2: Goal Insights */}
      <section>
        <div className="bg-surface-container-low border border-outline-variant/10 rounded-xl p-8 flex flex-col gap-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-container flex items-center justify-center shadow-lg">
              <BarChart3 className="w-6 h-6 text-on-primary" />
            </div>
            <h3 className="font-headline text-2xl text-on-surface italic">Goal Insights</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="block font-sans text-[10px] tracking-widest text-on-surface-variant mb-2 uppercase">Monthly Contribution</span>
              <p className="font-headline text-3xl text-primary">$3,200</p>
            </div>
            <div className="text-right">
              <span className="block font-sans text-[10px] tracking-widest text-on-surface-variant mb-2 uppercase">Achievement Forecast</span>
              <p className="font-headline text-3xl text-on-surface">Oct 2028</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Suggested Goals */}
      <section>
        <h3 className="font-headline text-2xl text-on-surface mb-6 italic">Suggested Goals</h3>
        <div className="grid grid-cols-1 gap-4">
          {suggestedGoals.map((goal, i) => (
            <div key={i} className="flex items-center justify-between p-5 rounded-xl border border-primary/20 bg-surface-container-low/20 hover:bg-surface-container-low/40 transition-colors group cursor-pointer">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full border border-primary/30 flex items-center justify-center">
                  <goal.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h4 className="font-headline text-xl text-on-surface">{goal.title}</h4>
                  <p className="font-sans text-[11px] text-on-surface-variant">{goal.desc}</p>
                </div>
              </div>
              <PlusCircle className="w-6 h-6 text-on-surface-variant group-hover:text-primary transition-colors" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
