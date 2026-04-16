import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import TopBar from './components/TopBar';
import BottomNav from './components/BottomNav';
import Home from './components/Home';
import History from './components/History';
import Budget from './components/Budget';
import Growth from './components/Growth';
import Settings from './components/Settings';
import WalletScreen from './components/WalletScreen';
import Profile from './components/Profile';
import DebtScreen from './components/DebtScreen';
import Goals from './components/Goals';
import Savings from './components/Savings';
import NewTransaction from './components/NewTransaction';
import NavigationDrawer from './components/NavigationDrawer';
import { TransactionProvider } from './context/TransactionContext';

type Screen = 'home' | 'history' | 'budget' | 'growth' | 'settings' | 'wallet' | 'profile' | 'debt' | 'goals' | 'savings';

const PROFILE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCcc7sVLbIEsC6jX2qV0QnosQxuaMBipKUciaVSyEjoFWvKacXxdAhtcJksFdTrkEcM9ZyoO1TZQ5utfhy2GSmu_ZBAPsaEvyHYbGHqKU9qkeW4LJi8FsjYTCTP0IpUYYxA-PY3JZOf1jKL_5_dCubD5hDqlDMFSonirymzzqEIXp45AxNSCoA7888jm5szoufJTJb0sJFllM4djAOta2Fh96j8ZxSOtosAmIhDc_HceulCBd29kiOZIqXl86aYARqt3gtY8JhKMoo";

export default function App() {
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);

  const handleNavigation = (screen: Screen, source: 'bottom-nav' | 'drawer' | 'internal') => {
    setActiveScreen(screen);
    // Hide bottom nav for deep screens (not home or profile)
    if (['history', 'budget', 'growth', 'settings', 'wallet', 'debt', 'goals', 'savings'].includes(screen) && source === 'drawer') {
      setIsBottomNavVisible(false);
    } else if (screen === 'profile') {
      // Profile screen also hides bottom nav as per previous request
      setIsBottomNavVisible(false);
    } else {
      setIsBottomNavVisible(true);
    }
  };

  const getTitle = () => {
    switch (activeScreen) {
      case 'home': return 'Home';
      case 'history': return 'History';
      case 'budget': return 'Budget';
      case 'growth': return 'Growth';
      case 'settings': return 'Settings';
      case 'wallet': return 'Wallet';
      case 'profile': return 'My Profile';
      case 'debt': return 'Liabilities';
      case 'goals': return 'Financial Goals';
      case 'savings': return 'Savings';
      default: return 'Home';
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <Home onNavigate={(s) => handleNavigation(s, 'internal')} />;
      case 'history': return <History />;
      case 'budget': return <Budget />;
      case 'growth': return <Growth />;
      case 'settings': return <Settings profileImage={PROFILE_IMAGE} />;
      case 'wallet': return <WalletScreen />;
      case 'profile': return <Profile profileImage={PROFILE_IMAGE} />;
      case 'debt': return <DebtScreen />;
      case 'goals': return <Goals />;
      case 'savings': return <Savings />;
      default: return <Home onNavigate={(s) => handleNavigation(s, 'internal')} />;
    }
  };

  return (
    <TransactionProvider>
      <div className="min-h-screen bg-background text-on-surface">
        <TopBar 
          title={getTitle()} 
          onMenuClick={() => setIsDrawerOpen(true)} 
          profileImage={PROFILE_IMAGE}
        />

        <NavigationDrawer 
          isOpen={isDrawerOpen} 
          onClose={() => setIsDrawerOpen(false)} 
          profileImage={PROFILE_IMAGE} 
          onNavigate={handleNavigation}
        />
        
        <main className={`pt-24 px-6 max-w-2xl mx-auto min-h-screen ${isBottomNavVisible ? 'pb-32' : 'pb-12'}`}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {isBottomNavVisible && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 w-full z-50"
            >
              <BottomNav 
                active={activeScreen} 
                onChange={(s) => handleNavigation(s, 'bottom-nav')} 
                onPlusClick={() => setShowNewTransaction(true)} 
              />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showNewTransaction && (
            <NewTransaction 
              onClose={() => setShowNewTransaction(false)} 
            />
          )}
        </AnimatePresence>
      </div>
    </TransactionProvider>
  );
}
