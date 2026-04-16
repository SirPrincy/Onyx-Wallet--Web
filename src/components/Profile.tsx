import React, { useState } from 'react';
import { 
  Award, ChevronRight, Landmark, Verified, 
  FileText, Shield, ExternalLink, LogOut, X, Plus, Search, CheckCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProfileProps {
  profileImage: string;
}

const MOCK_INSTITUTIONS = [
  { name: 'J.P. Morgan Reserve', icon: Landmark, color: 'bg-blue-500/10 text-blue-500' },
  { name: 'Goldman Sachs Private', icon: Landmark, color: 'bg-yellow-500/10 text-yellow-500' },
  { name: 'UBS Wealth Management', icon: Landmark, color: 'bg-red-500/10 text-red-500' },
  { name: 'Morgan Stanley', icon: Landmark, color: 'bg-indigo-500/10 text-indigo-500' },
  { name: 'Credit Suisse', icon: Landmark, color: 'bg-blue-600/10 text-blue-600' },
  { name: 'Barclays Wealth', icon: Landmark, color: 'bg-sky-500/10 text-sky-500' },
];

export default function Profile({ profileImage }: ProfileProps) {
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLinking, setIsLinking] = useState(false);
  const [linkedSuccess, setLinkedSuccess] = useState(false);

  const institutions = [
    { name: 'Chase Private Client', type: 'Checking •••• 8821', status: 'Active' },
    { name: 'HSBC Premier', type: 'Savings •••• 4409', status: 'Active' }
  ];

  const handleLink = (name: string) => {
    setIsLinking(true);
    // Simulate linking process
    setTimeout(() => {
      setIsLinking(false);
      setLinkedSuccess(true);
      setTimeout(() => {
        setLinkedSuccess(false);
        setShowLinkModal(false);
      }, 1500);
    }, 2000);
  };

  return (
    <div className="space-y-10 pb-12">
      {/* User Identity Profile */}
      <section className="flex flex-col items-center text-center pt-4">
        <div className="relative mb-6">
          <div className="w-28 h-28 rounded-full p-1 bg-gradient-to-tr from-primary to-transparent">
            <div className="w-full h-full rounded-full overflow-hidden border-2 border-background">
              <img 
                className="w-full h-full object-cover" 
                src={profileImage} 
                alt="Julian Thorne"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-gradient-to-br from-primary to-primary-container text-on-primary text-[10px] font-bold tracking-widest uppercase rounded-full whitespace-nowrap shadow-lg">
            Black Card Member
          </div>
        </div>
        <h2 className="font-headline text-4xl mb-1 text-on-surface">Julian Thorne</h2>
        <p className="text-on-surface-variant font-body text-sm tracking-wide">j.thorne@alchemist.ltd</p>
      </section>

      {/* Financial Tier Details */}
      <section>
        <div className="bg-surface-container-low rounded-xl p-6 border border-outline-variant/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 blur-3xl -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-[10px] font-bold tracking-widest uppercase text-primary mb-1">Current Standing</p>
              <h3 className="font-headline text-2xl text-on-surface">Wealth Tier IV</h3>
            </div>
            <Award className="w-6 h-6 text-primary" />
          </div>
          <div className="space-y-2 mb-6">
            <div className="flex justify-between text-[11px] font-medium tracking-wide uppercase">
              <span className="text-on-surface-variant">Progress to Tier V</span>
              <span className="text-primary">85%</span>
            </div>
            <div className="h-[2px] w-full bg-surface-container-highest">
              <div className="h-full bg-primary" style={{ width: '85%' }}></div>
            </div>
          </div>
          <button className="text-primary text-xs font-semibold tracking-wide uppercase flex items-center gap-1 hover:opacity-80 transition-opacity">
            View Tier Benefits <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </section>

      {/* Personal Information Section */}
      <section>
        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/60 mb-4 px-1">Identity Details</h4>
        <div className="bg-surface-container-low rounded-xl border border-outline-variant/5 overflow-hidden">
          <div className="group flex items-center justify-between p-4 border-b border-outline-variant/10 hover:bg-surface-container transition-colors cursor-pointer">
            <div>
              <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider mb-0.5">Full Name</p>
              <p className="text-sm font-medium text-on-surface">Julian Alistair Thorne</p>
            </div>
            <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors" />
          </div>
          <div className="group flex items-center justify-between p-4 border-b border-outline-variant/10 hover:bg-surface-container transition-colors cursor-pointer">
            <div>
              <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider mb-0.5">Date of Birth</p>
              <p className="text-sm font-medium text-on-surface">14 November 1984</p>
            </div>
            <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors" />
          </div>
          <div className="group flex items-center justify-between p-4 hover:bg-surface-container transition-colors cursor-pointer">
            <div>
              <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-wider mb-0.5">Phone Number</p>
              <p className="text-sm font-medium text-on-surface">+44 (0) 20 7946 0124</p>
            </div>
            <ChevronRight className="w-4 h-4 text-outline-variant group-hover:text-primary transition-colors" />
          </div>
        </div>
      </section>

      {/* Connected Accounts */}
      <section>
        <div className="flex justify-between items-end mb-4 px-1">
          <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/60">Connected Institutions</h4>
          <button 
            onClick={() => setShowLinkModal(true)}
            className="text-primary text-[10px] font-bold tracking-wider uppercase hover:underline"
          >
            Link New Account
          </button>
        </div>
        <div className="grid grid-cols-1 gap-3">
          {institutions.map((inst, i) => (
            <div key={i} className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 border border-outline-variant/5 hover:bg-surface-container transition-colors cursor-pointer">
              <div className="w-10 h-10 rounded-lg bg-surface-container-highest flex items-center justify-center border border-outline-variant/10">
                <Landmark className="w-5 h-5 text-on-surface-variant" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-on-surface">{inst.name}</p>
                <p className="text-[10px] text-on-surface-variant uppercase tracking-wide">{inst.type}</p>
              </div>
              <span className="text-[10px] text-green-500 font-bold uppercase tracking-widest">{inst.status}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Legal & Verification */}
      <section>
        <h4 className="text-[10px] font-bold tracking-[0.2em] uppercase text-on-surface-variant/60 mb-4 px-1">Compliance & Legal</h4>
        <div className="bg-surface-container-low rounded-xl border border-outline-variant/5 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-outline-variant/10">
            <div className="flex items-center gap-3">
              <Verified className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-on-surface">KYC Status</span>
            </div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Verified</span>
          </div>
          <div className="flex items-center justify-between p-4 border-b border-outline-variant/10 hover:bg-surface-container transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-on-surface">Terms of Service</span>
            </div>
            <ExternalLink className="w-4 h-4 text-outline-variant" />
          </div>
          <div className="flex items-center justify-between p-4 hover:bg-surface-container transition-colors cursor-pointer group">
            <div className="flex items-center gap-3">
              <Shield className="w-5 h-5 text-on-surface-variant group-hover:text-primary transition-colors" />
              <span className="text-sm font-medium text-on-surface">Privacy Policy</span>
            </div>
            <ExternalLink className="w-4 h-4 text-outline-variant" />
          </div>
        </div>
      </section>

      {/* Link New Account Modal */}
      <AnimatePresence>
        {showLinkModal && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => !isLinking && setShowLinkModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-surface-container-low rounded-t-[2rem] z-[120] p-8 max-h-[85vh] overflow-y-auto no-scrollbar border-t border-white/10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h3 className="font-headline text-3xl text-on-surface italic">Link Account</h3>
                  <p className="text-on-surface-variant text-xs uppercase tracking-widest mt-1">Secure Open Banking Integration</p>
                </div>
                <button 
                  onClick={() => setShowLinkModal(false)} 
                  disabled={isLinking}
                  className="p-2 rounded-full bg-white/5 text-on-surface-variant"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {linkedSuccess ? (
                <div className="py-12 flex flex-col items-center text-center space-y-4">
                  <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-10 h-10 text-primary" />
                  </div>
                  <h4 className="font-headline text-2xl text-on-surface">Connection Successful</h4>
                  <p className="text-on-surface-variant text-sm max-w-xs">Your institution has been securely linked to Alchemist Wealth.</p>
                </div>
              ) : isLinking ? (
                <div className="py-12 flex flex-col items-center text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
                    <Landmark className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-headline text-2xl text-on-surface">Establishing Secure Link</h4>
                    <p className="text-on-surface-variant text-sm">Verifying credentials with institutional servers...</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 w-5 h-5" />
                    <input 
                      type="text"
                      placeholder="Search for your institution..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full bg-surface-container-highest border border-white/5 rounded-xl py-4 pl-12 pr-4 text-on-surface placeholder:text-on-surface-variant/40 focus:ring-1 focus:ring-primary/40"
                    />
                  </div>

                  <div className="space-y-3">
                    <p className="text-[10px] font-bold tracking-widest uppercase text-on-surface-variant/60 px-1">Global Institutions</p>
                    <div className="grid grid-cols-1 gap-3">
                      {MOCK_INSTITUTIONS.filter(inst => inst.name.toLowerCase().includes(searchQuery.toLowerCase())).map((inst, i) => (
                        <button 
                          key={i}
                          onClick={() => handleLink(inst.name)}
                          className="w-full bg-surface-container-highest/50 p-4 rounded-xl flex items-center justify-between border border-white/5 hover:bg-surface-container-highest transition-all group"
                        >
                          <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${inst.color}`}>
                              <inst.icon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-on-surface">{inst.name}</span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:translate-x-1 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex items-start gap-4">
                    <Shield className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-on-surface uppercase tracking-wider">Bank-Grade Security</p>
                      <p className="text-[10px] text-on-surface-variant leading-relaxed">
                        We use 256-bit AES encryption to protect your data. We never store your login credentials.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
