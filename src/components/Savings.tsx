import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, CheckCircle, Calendar, 
  Sparkles, BarChart3, ChevronRight, Plus, X, Wallet, ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTransactions } from '../context/TransactionContext';

export default function Savings() {
  const { savingsGoals, addSavingsGoal, contributeToGoal } = useTransactions();
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedGoalId, setSelectedGoalId] = useState<string | null>(null);
  
  // New Goal State
  const [newGoalTitle, setNewGoalTitle] = useState('');
  const [newGoalTarget, setNewGoalTarget] = useState('');
  const [newGoalDesc, setNewGoalDesc] = useState('');

  // Contribution State
  const [contribAmount, setContribAmount] = useState('');

  const activeGoals = useMemo(() => savingsGoals.filter(g => !g.isCompleted), [savingsGoals]);
  const completedGoals = useMemo(() => savingsGoals.filter(g => g.isCompleted), [savingsGoals]);

  const totalSaved = useMemo(() => savingsGoals.reduce((sum, g) => sum + g.current, 0), [savingsGoals]);

  const handleAddGoal = () => {
    if (!newGoalTitle || !newGoalTarget) return;
    addSavingsGoal({
      title: newGoalTitle,
      desc: newGoalDesc || 'New financial objective',
      target: parseFloat(newGoalTarget),
      current: 0
    });
    setShowAddModal(false);
    setNewGoalTitle('');
    setNewGoalTarget('');
    setNewGoalDesc('');
  };

  const handleContribute = () => {
    if (!selectedGoalId || !contribAmount) return;
    contributeToGoal(selectedGoalId, parseFloat(contribAmount));
    setSelectedGoalId(null);
    setContribAmount('');
  };

  return (
    <div className="space-y-12 pb-12">
      {/* Hero Section: Total Savings */}
      <header>
        <div className="flex items-center justify-between mb-2">
          <span className="text-on-surface-variant text-[10px] uppercase tracking-[0.2em] font-medium">Total Liquidity</span>
          <div className="flex items-center gap-1 bg-primary/10 px-2 py-0.5 rounded-full">
            <TrendingUp className="w-3 h-3 text-primary" />
            <span className="text-primary text-[10px] font-bold">+3.2%</span>
          </div>
        </div>
        <h2 className="font-headline text-6xl text-on-surface tracking-tight leading-none mb-1">${totalSaved.toLocaleString()}</h2>
        <p className="text-on-surface-variant text-sm font-light">Last updated 2 minutes ago</p>
      </header>

      {/* Projects Section */}
      <section className="space-y-8">
        <div className="flex items-end justify-between">
          <h3 className="font-headline text-3xl text-on-surface italic">Projets</h3>
          <button 
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-[10px] uppercase tracking-widest font-bold hover:bg-primary/20 transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Project
          </button>
        </div>

        <div className="space-y-6">
          {activeGoals.map((project) => {
            const progress = (project.current / project.target) * 100;
            const remaining = project.target - project.current;
            
            return (
              <div 
                key={project.id} 
                onClick={() => setSelectedGoalId(project.id)}
                className="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group border border-white/5 cursor-pointer hover:bg-surface-container transition-colors"
              >
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h4 className="text-on-surface text-lg font-medium mb-1">{project.title}</h4>
                    <p className="text-on-surface-variant text-xs">{project.desc}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-on-surface font-medium">
                      ${(project.current / 1000).toFixed(0)}k <span className="text-on-surface-variant/50 text-xs">/ ${(project.target / 1000).toFixed(0)}k</span>
                    </span>
                    <ChevronRight className="w-4 h-4 text-on-surface-variant/30 ml-2 inline-block group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
                <div className="relative w-full h-[2px] bg-outline-variant/20 rounded-full mb-2">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-primary to-primary-container rounded-full" 
                  ></motion.div>
                </div>
                <div className="flex justify-between text-[10px] text-on-surface-variant font-medium uppercase tracking-wider">
                  <span>{progress.toFixed(0)}% Completed</span>
                  <span>${(remaining / 1000).toFixed(0)}k Remaining</span>
                </div>
              </div>
            );
          })}

          {completedGoals.map((project) => (
            <div key={project.id} className="bg-surface-container-low p-6 rounded-xl relative overflow-hidden group border border-primary/20">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-on-surface text-lg font-medium">{project.title}</h4>
                    <CheckCircle className="w-5 h-5 text-primary" />
                  </div>
                  <p className="text-on-surface-variant text-xs">{project.desc}</p>
                </div>
                <div className="text-right">
                  <span className="text-primary font-medium block">${(project.target / 1000).toFixed(0)}k</span>
                  <span className="text-primary/60 text-[10px] uppercase tracking-widest font-bold">Fulfilled</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Project Modal */}
      <AnimatePresence>
        {showAddModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddModal(false)}
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
                <h3 className="font-headline text-3xl text-on-surface italic">New Project</h3>
                <button onClick={() => setShowAddModal(false)} className="p-2 rounded-full bg-white/5 text-on-surface-variant">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Project Title</label>
                  <input 
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                    className="w-full bg-surface-container-highest border border-white/5 rounded-xl py-4 px-4 text-on-surface focus:ring-1 focus:ring-primary/40"
                    placeholder="e.g. Swiss Chalet Fund"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Target Amount ($)</label>
                  <input 
                    type="number"
                    value={newGoalTarget}
                    onChange={(e) => setNewGoalTarget(e.target.value)}
                    className="w-full bg-surface-container-highest border border-white/5 rounded-xl py-4 px-4 text-on-surface focus:ring-1 focus:ring-primary/40"
                    placeholder="500000"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Description</label>
                  <textarea 
                    value={newGoalDesc}
                    onChange={(e) => setNewGoalDesc(e.target.value)}
                    className="w-full bg-surface-container-highest border border-white/5 rounded-xl py-4 px-4 text-on-surface focus:ring-1 focus:ring-primary/40 resize-none"
                    placeholder="Briefly describe your objective..."
                    rows={3}
                  />
                </div>
                <button 
                  onClick={handleAddGoal}
                  className="w-full py-5 metallic-gradient rounded-xl text-background font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20"
                >
                  Create Project
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Contribute Modal */}
      <AnimatePresence>
        {selectedGoalId && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGoalId(null)}
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
                  <h3 className="font-headline text-3xl text-on-surface italic">Contribute</h3>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest mt-1">Add funds to your objective</p>
                </div>
                <button onClick={() => setSelectedGoalId(null)} className="p-2 rounded-full bg-white/5 text-on-surface-variant">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-8">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">Amount to Save ($)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary font-headline text-2xl">$</span>
                    <input 
                      type="number"
                      value={contribAmount}
                      onChange={(e) => setContribAmount(e.target.value)}
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl py-6 pl-10 pr-4 text-on-surface text-3xl font-headline focus:ring-1 focus:ring-primary/40"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[10px] uppercase tracking-widest text-primary font-bold">Source Wallet</span>
                    <span className="text-xs text-on-surface font-medium">Main Vault</span>
                  </div>
                  <div className="flex items-center gap-3 text-on-surface-variant">
                    <Wallet className="w-4 h-4" />
                    <span className="text-[10px] uppercase tracking-widest">Available: $482,000</span>
                  </div>
                </div>

                <button 
                  onClick={handleContribute}
                  className="w-full py-5 metallic-gradient rounded-xl text-background font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 flex items-center justify-center gap-2"
                >
                  Confirm Transfer <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Smart Forecast Section */}
      <section className="bg-surface-container-highest rounded-2xl p-8 relative overflow-hidden shadow-2xl border border-white/5">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <BarChart3 className="w-16 h-16" />
        </div>
        <h3 className="font-headline text-2xl text-on-surface mb-6 italic">Smart Forecast</h3>
        <div className="space-y-6">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-on-surface-variant text-[10px] font-medium uppercase tracking-wider">Estimated Goal Completion</p>
              <p className="text-on-surface text-sm">Property Fund expected: <span className="text-primary font-bold">Oct 2026</span></p>
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-on-surface-variant text-[10px] font-medium uppercase tracking-wider">Flow Recommendation</p>
              <p className="text-on-surface text-sm">Increase monthly allocation by <span className="text-primary font-bold">12%</span> to reach car goal 4 months earlier.</p>
            </div>
          </div>
        </div>

        {/* Forecast Visualization */}
        <div className="mt-8 flex items-end gap-1.5 h-12">
          <div className="flex-1 bg-outline-variant/20 rounded-t-sm h-1/4"></div>
          <div className="flex-1 bg-outline-variant/20 rounded-t-sm h-1/3"></div>
          <div className="flex-1 bg-outline-variant/30 rounded-t-sm h-1/2"></div>
          <div className="flex-1 bg-primary/40 rounded-t-sm h-2/3"></div>
          <div className="flex-1 bg-primary/60 rounded-t-sm h-3/4"></div>
          <div className="flex-1 bg-primary rounded-t-sm h-full"></div>
        </div>
      </section>
    </div>
  );
}
