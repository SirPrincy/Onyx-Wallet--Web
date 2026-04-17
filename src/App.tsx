import React, { useState, useEffect } from 'react';
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
import NewTransaction from './components/NewTransaction';
import NavigationDrawer from './components/NavigationDrawer';
import WalletManagement from './components/WalletManagement';
import Login from './components/Login';
import { TransactionProvider, useTransactions } from './context/TransactionContext';

type Screen = 'home' | 'history' | 'budget' | 'growth' | 'settings' | 'investing' | 'wallet' | 'profile' | 'debt';

const PROFILE_IMAGE = "https://lh3.googleusercontent.com/aida-public/AB6AXuCcc7sVLbIEsC6jX2qV0QnosQxuaMBipKUciaVSyEjoFWvKacXxdAhtcJksFdTrkEcM9ZyoO1TZQ5utfhy2GSmu_ZBAPsaEvyHYbGHqKU9qkeW4LJi8FsjYTCTP0IpUYYxA-PY3JZOf1jKL_5_dCubD5hDqlDMFSonirymzzqEIXp45AxNSCoA7888jm5szoufJTJb0sJFllM4djAOta2Fh96j8ZxSOtosAmIhDc_HceulCBd29kiOZIqXl86aYARqt3gtY8JhKMoo";

function AppContent() {
  const { isPasscodeEnabled } = useTransactions();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('isMoulaAuthenticated') === 'true';
  });
  const [currentUser, setCurrentUser] = useState<any>(() => {
    const saved = localStorage.getItem('moula_current_user');
    return saved ? JSON.parse(saved) : null;
  });

  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [showNewTransaction, setShowNewTransaction] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isBottomNavVisible, setIsBottomNavVisible] = useState(true);

  // Show login if no user is selected OR if they need to authenticate
  const shouldShowLogin = !currentUser || (isPasscodeEnabled && !isAuthenticated);

  const handleLogin = (passcode: string | null, profile: any) => {
    // If passcode is required, verify it; otherwise, just log in
    if (!isPasscodeEnabled || passcode === '1234') {
      setIsAuthenticated(true);
      setCurrentUser(profile);
      localStorage.setItem('isMoulaAuthenticated', 'true');
      localStorage.setItem('moula_current_user', JSON.stringify(profile));
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem('isMoulaAuthenticated');
    localStorage.removeItem('moula_current_user');
  };

  const handleNavigation = (screen: Screen, source: 'bottom-nav' | 'drawer' | 'internal') => {
    setActiveScreen(screen);
    if (['history', 'budget', 'growth', 'settings', 'investing', 'wallet', 'debt'].includes(screen) && source === 'drawer') {
      setIsBottomNavVisible(false);
    } else if (screen === 'profile') {
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
      case 'growth': return 'Growth & Reserves';
      case 'settings': return 'Settings';
      case 'investing': return 'Investing';
      case 'wallet': return 'Wallet';
      case 'profile': return 'My Profile';
      case 'debt': return 'Liabilities';
      default: return 'Home';
    }
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home': return <Home onNavigate={(s) => handleNavigation(s, 'internal')} />;
      case 'history': return <History />;
      case 'budget': return <Budget />;
      case 'growth': return <Growth />;
      case 'settings': return <Settings profile={currentUser} onLogout={handleLogout} />;
      case 'investing': return <WalletScreen />;
      case 'wallet': return <WalletManagement />;
      case 'profile': return <Profile profile={currentUser} />;
      case 'debt': return <DebtScreen />;
      default: return <Home onNavigate={(s) => handleNavigation(s, 'internal')} />;
    }
  };

  return (
    <AnimatePresence mode="wait">
      {shouldShowLogin ? (
        <motion.div
          key="login"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Login onLogin={handleLogin} isPasscodeEnabled={isPasscodeEnabled} />
        </motion.div>
      ) : (
        <motion.div
          key="app"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="min-h-screen bg-background text-on-surface"
        >
          <TopBar 
            title={getTitle()} 
            onMenuClick={() => setIsDrawerOpen(true)} 
            profileImage={currentUser?.image || PROFILE_IMAGE}
          />

          <NavigationDrawer 
            isOpen={isDrawerOpen} 
            onClose={() => setIsDrawerOpen(false)} 
            profile={currentUser} 
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
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <TransactionProvider>
      <AppContent />
    </TransactionProvider>
  );
}
