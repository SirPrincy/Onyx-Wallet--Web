import React from 'react';
import { Star, Flame, Award, Rocket, Diamond, Shield, Globe, Sparkles, Landmark, Wallet } from 'lucide-react';
import { ACHIEVEMENTS, MISSIONS } from '../constants';

const IconMap: Record<string, React.ElementType> = {
  star: Star,
  local_fire_department: Flame,
  workspace_premium: Award,
  rocket_launch: Rocket,
  diamond: Diamond,
  shield: Shield,
  public: Globe,
  auto_awesome: Sparkles,
  account_balance: Landmark,
  savings: Wallet,
};

export default function Growth() {
  return (
    <div className="space-y-8 pb-12">
      <section>
        <div className="bg-surface-container-low rounded-xl p-8 relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[80px] rounded-full"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-on-surface-variant font-sans text-[10px] uppercase tracking-[0.2em] mb-2">Current Standing</span>
            <h2 className="font-headline text-4xl text-primary mb-6">Wealth Tier IV</h2>
            <div className="w-full max-w-xs space-y-3">
              <div className="flex justify-between items-end text-xs font-sans uppercase tracking-widest text-on-surface-variant">
                <span>Progress</span>
                <span className="text-primary">78%</span>
              </div>
              <div className="w-full h-[2px] bg-outline-variant/30 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-primary to-primary-container w-[78%]"></div>
              </div>
              <p className="text-[10px] text-on-surface-variant italic mt-2">12,400 XP to Tier V Ascension</p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-surface-container-lowest border border-outline-variant/10 p-4 rounded-lg flex flex-col items-center justify-center space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Current Streak</span>
          <span className="text-2xl font-semibold text-primary">14 Days</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant/10 p-4 rounded-lg flex flex-col items-center justify-center space-y-1">
          <span className="text-[10px] uppercase tracking-widest text-on-surface-variant">Grace Days</span>
          <span className="text-2xl font-semibold text-on-surface-variant">02</span>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-headline text-xl text-on-surface ml-1">Weekly Missions</h3>
        {MISSIONS.slice(0, 2).map((mission, i) => {
          const Icon = IconMap[mission.icon] || Landmark;
          return (
            <div key={mission.id} className={`group bg-surface-container p-5 rounded-lg flex items-center justify-between border-l-2 ${i === 0 ? 'border-primary' : 'border-outline-variant'} transition-all active:scale-[0.98]`}>
              <div className="space-y-1">
                <h4 className="text-sm font-medium text-on-surface">{mission.title}</h4>
                <p className="text-xs text-on-surface-variant">{mission.description}</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-24 h-1 bg-outline-variant/30 rounded-full overflow-hidden">
                    <div className={`h-full bg-gradient-to-r from-primary to-primary-container ${i === 0 ? 'w-1/3' : 'w-4/5'}`}></div>
                  </div>
                  <span className="text-[10px] text-primary">{i === 0 ? '1/3 Tasks' : '$400/$500'}</span>
                </div>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-highest shadow-[0_0_15px_rgba(242,202,80,0.1)] group-hover:shadow-[0_0_20px_rgba(242,202,80,0.2)] transition-shadow">
                <Icon className={`${i === 0 ? 'text-primary' : 'text-on-surface-variant'} w-5 h-5`} />
              </div>
            </div>
          );
        })}
      </section>

      <section className="space-y-4 pb-12">
        <h3 className="font-headline text-xl text-on-surface ml-1">Achievements</h3>
        <div className="grid grid-cols-4 gap-4">
          {ACHIEVEMENTS.map((badge) => {
            const Icon = IconMap[badge.icon] || Star;
            return (
              <div key={badge.id} className={`flex flex-col items-center space-y-2 ${badge.earned ? '' : 'opacity-40'}`}>
                <div className={`w-14 h-14 rounded-full flex items-center justify-center ${badge.earned ? 'bg-gradient-to-br from-primary to-primary-container shadow-lg shadow-primary/20' : 'bg-surface-container-highest border border-outline-variant/30'}`}>
                  <Icon className={`${badge.earned ? 'text-background' : 'text-outline'} w-6 h-6`} fill={badge.earned ? 'currentColor' : 'none'} />
                </div>
                <span className="text-[9px] uppercase tracking-tighter text-center leading-none text-on-surface font-medium">{badge.title}</span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
