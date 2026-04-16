import React, { useState } from 'react';
import { X, ArrowUpRight, ArrowDown, ArrowLeftRight, Calendar, Paperclip, CheckCircle, ChevronRight, Wallet, ShoppingBag, Utensils, Banknote, Car, Dumbbell, Hotel, Fuel, Landmark, Briefcase } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTransactions } from '../context/TransactionContext';
import { Transaction } from '../types';

const CATEGORIES = [
  { name: 'Luxury Goods', icon: ShoppingBag, id: 'shopping_bag' },
  { name: 'Dining', icon: Utensils, id: 'restaurant' },
  { name: 'Monthly', icon: Banknote, id: 'payments' },
  { name: 'Transport', icon: Car, id: 'local_taxi' },
  { name: 'Wellness', icon: Dumbbell, id: 'fitness_center' },
  { name: 'Hospitality', icon: Hotel, id: 'hotel' },
  { name: 'Private Aviation', icon: Fuel, id: 'local_gas_station' },
  { name: 'Investment', icon: Landmark, id: 'landmark' },
  { name: 'Business', icon: Briefcase, id: 'briefcase' },
];

const WALLETS = [
  { name: 'Main Vault', balance: 482000, id: 'main' },
  { name: 'Offshore Account', balance: 1250000, id: 'offshore' },
  { name: 'Crypto Cold Room', balance: 84000, id: 'crypto' },
];

export default function NewTransaction({ onClose, editTransaction }: { onClose: () => void, editTransaction?: Transaction }) {
  const { addTransaction, updateTransaction } = useTransactions();
  
  // Initialize state based on editTransaction if present
  const [type, setType] = useState<'expense' | 'income' | 'transfer'>(editTransaction?.type || 'expense');
  const [amount, setAmount] = useState(editTransaction ? Math.abs(editTransaction.amount).toString() : '');
  const [selectedCategory, setSelectedCategory] = useState(
    editTransaction ? (CATEGORIES.find(c => c.name === editTransaction.category) || CATEGORIES[0]) : CATEGORIES[0]
  );
  const [selectedWallet, setSelectedWallet] = useState(
    editTransaction ? (WALLETS.find(w => w.id === editTransaction.walletId) || WALLETS[0]) : WALLETS[0]
  );
  const [toWallet, setToWallet] = useState(WALLETS[1]);
  const [description, setDescription] = useState(editTransaction?.title || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [showCategoryPicker, setShowCategoryPicker] = useState(false);
  const [walletPickerMode, setWalletPickerMode] = useState<'single' | 'from' | 'to'>('single');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = () => {
    if (!amount || parseFloat(amount) <= 0) return;
    
    setIsSubmitting(true);
    
    const txData = type === 'transfer' ? {
      title: description || `Transfer: ${selectedWallet.name} → ${toWallet.name}`,
      amount: parseFloat(amount),
      category: 'Transfer',
      icon: 'swap_horiz',
      type: 'transfer' as const,
      walletId: selectedWallet.id,
    } : {
      title: description || selectedCategory.name,
      amount: type === 'expense' ? -parseFloat(amount) : parseFloat(amount),
      category: selectedCategory.name,
      icon: selectedCategory.id,
      type: type,
      walletId: selectedWallet.id,
    };

    if (editTransaction) {
      updateTransaction(editTransaction.id, txData);
    } else {
      addTransaction(txData);
    }

    // Simulate API call for UI feedback
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        onClose();
      }, 1500);
    }, 1000);
  };

  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-[100] bg-background flex flex-col overflow-hidden"
    >
      {/* Background Canvas */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-primary/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-surface-container-highest/10 blur-[120px] rounded-full"></div>
      </div>

      <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl flex justify-between items-center px-6 h-20 border-b border-white/5">
        <button onClick={onClose} className="text-primary hover:text-primary-container transition-colors">
          <X className="w-6 h-6" />
        </button>
        <h1 className="font-headline italic tracking-tighter text-2xl text-primary absolute left-1/2 -translate-x-1/2">
          {editTransaction ? 'Edit Transaction' : 'New Transaction'}
        </h1>
        <div className="w-6" />
      </header>

      <main className="relative z-10 pb-32 px-6 max-w-2xl mx-auto min-h-screen flex flex-col pt-24 overflow-y-auto no-scrollbar w-full">
        <section className="mb-10">
          <h2 className="font-headline text-5xl md:text-6xl text-on-surface leading-tight">
            {editTransaction ? 'Edit Transaction' : 'New Transaction'}
          </h2>
          <p className="text-on-surface-variant mt-4 text-lg font-light max-w-md">
            {editTransaction 
              ? 'Refine your financial records with precision and absolute discretion.' 
              : 'Document your financial evolution with precision and discretion.'}
          </p>
        </section>

        <section className="grid grid-cols-3 gap-3 mb-10">
          <button 
            onClick={() => setType('expense')}
            className={`group flex flex-col items-center justify-center py-6 rounded-xl transition-all duration-300 border ${type === 'expense' ? 'bg-surface-container border-primary/40 shadow-lg shadow-primary/5' : 'bg-surface-container-low border-outline-variant/10 hover:bg-surface-container'}`}
          >
            <ArrowUpRight className={`${type === 'expense' ? 'text-primary' : 'text-on-surface-variant'} mb-2 w-8 h-8 group-hover:scale-110 transition-transform`} />
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${type === 'expense' ? 'text-primary' : 'text-on-surface-variant'}`}>Expense</span>
          </button>
          <button 
            onClick={() => setType('income')}
            className={`group flex flex-col items-center justify-center py-6 rounded-xl transition-all duration-300 border ${type === 'income' ? 'bg-surface-container border-primary/40 shadow-lg shadow-primary/5' : 'bg-surface-container-low border-outline-variant/10 hover:bg-surface-container'}`}
          >
            <ArrowDown className={`${type === 'income' ? 'text-primary' : 'text-on-surface-variant'} mb-2 w-8 h-8 group-hover:scale-110 transition-transform`} fill={type === 'income' ? 'currentColor' : 'none'} />
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${type === 'income' ? 'text-primary' : 'text-on-surface-variant'}`}>Income</span>
          </button>
          <button 
            onClick={() => setType('transfer')}
            className={`group flex flex-col items-center justify-center py-6 rounded-xl transition-all duration-300 border ${type === 'transfer' ? 'bg-surface-container border-primary/40 shadow-lg shadow-primary/5' : 'bg-surface-container-low border-outline-variant/10 hover:bg-surface-container'}`}
          >
            <ArrowLeftRight className={`${type === 'transfer' ? 'text-primary' : 'text-on-surface-variant'} mb-2 w-8 h-8 group-hover:scale-110 transition-transform`} />
            <span className={`text-[10px] uppercase tracking-widest font-semibold ${type === 'transfer' ? 'text-primary' : 'text-on-surface-variant'}`}>Transfer</span>
          </button>
        </section>

        <div className="space-y-10">
          <div className="flex flex-col">
            <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant mb-2">Amount</label>
            <div className="relative flex items-baseline">
              <span className="font-headline text-4xl text-primary/60 mr-2">$</span>
              <input 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full bg-transparent border-none p-0 font-headline text-7xl md:text-8xl focus:ring-0 text-on-surface placeholder:text-surface-variant selection:bg-primary/20" 
                placeholder="0.00" 
                type="number" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {type !== 'transfer' ? (
              <div 
                onClick={() => setShowCategoryPicker(true)}
                className="flex flex-col bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer group border border-white/5"
              >
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant mb-4">Category</label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <div className="text-primary-container"><selectedCategory.icon className="w-5 h-5" /></div>
                    </div>
                    <span className="text-on-surface font-medium">{selectedCategory.name}</span>
                  </div>
                  <ChevronRight className="text-on-surface-variant group-hover:translate-x-1 transition-transform w-5 h-5" />
                </div>
              </div>
            ) : (
              <div 
                onClick={() => setWalletPickerMode('from')}
                className="flex flex-col bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer group border border-white/5"
              >
                <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant mb-4">From Wallet</label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                      <Wallet className="text-primary-container w-5 h-5" />
                    </div>
                    <span className="text-on-surface font-medium">{selectedWallet.name}</span>
                  </div>
                  <ChevronRight className="text-on-surface-variant group-hover:translate-x-1 transition-transform w-5 h-5" />
                </div>
              </div>
            )}

            <div 
              onClick={() => setWalletPickerMode(type === 'transfer' ? 'to' : 'single')}
              className="flex flex-col bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container transition-colors cursor-pointer group border border-white/5"
            >
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant mb-4">
                {type === 'transfer' ? 'To Wallet' : 'Wallet'}
              </label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                    <Wallet className="text-primary-container w-5 h-5" />
                  </div>
                  <span className="text-on-surface font-medium">
                    {type === 'transfer' ? toWallet.name : selectedWallet.name}
                  </span>
                </div>
                <ChevronRight className="text-on-surface-variant group-hover:translate-x-1 transition-transform w-5 h-5" />
              </div>
            </div>

            <div className="flex flex-col bg-surface-container-low p-6 rounded-2xl hover:bg-surface-container transition-colors group border border-white/5">
              <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant mb-4">Date</label>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 w-full">
                  <div className="w-10 h-10 rounded-full bg-surface-container-highest flex items-center justify-center">
                    <Calendar className="text-primary-container w-5 h-5" />
                  </div>
                  <input 
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent border-none p-0 text-on-surface font-medium focus:ring-0 w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col bg-surface-container-low p-6 rounded-2xl border border-white/5">
            <label className="text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant mb-4">Description</label>
            <textarea 
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-transparent border-none p-0 focus:ring-0 text-on-surface placeholder:text-surface-variant resize-none" 
              placeholder="Add a note or reference..." 
              rows={3}
            ></textarea>
          </div>

          <div className="flex items-center justify-between p-6 rounded-2xl border border-dashed border-outline-variant/30 hover:bg-surface-container transition-colors cursor-pointer">
            <div className="flex items-center gap-4">
              <Paperclip className="text-on-surface-variant w-5 h-5" />
              <span className="text-on-surface-variant font-medium">Attach Receipt or Document</span>
            </div>
            <span className="text-[10px] uppercase tracking-widest font-bold text-primary">Upload</span>
          </div>
        </div>

        <div className="py-12">
          <button 
            onClick={handleSubmit}
            disabled={isSubmitting || isSuccess}
            className={`relative w-full metallic-gradient py-6 rounded-xl overflow-hidden group shadow-2xl shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ${isSubmitting ? 'opacity-70 cursor-wait' : ''}`}
          >
            <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative flex items-center justify-center gap-3">
              <span className="text-background font-semibold tracking-[0.1em] uppercase text-sm">
                {isSubmitting ? 'Processing...' : isSuccess ? 'Success' : editTransaction ? 'Update Transaction' : 'Add Transaction'}
              </span>
              {isSuccess ? <CheckCircle className="text-background w-5 h-5" /> : <CheckCircle className="text-background w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </div>
          </button>
        </div>
      </main>

      {/* Category Picker Overlay */}
      <AnimatePresence>
        {showCategoryPicker && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCategoryPicker(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-surface-container-low rounded-t-[2rem] z-[120] p-8 max-h-[70vh] overflow-y-auto no-scrollbar border-t border-white/10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              <h3 className="font-headline text-3xl text-on-surface mb-8 italic">Select Category</h3>
              <div className="grid grid-cols-2 gap-4">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowCategoryPicker(false);
                    }}
                    className={`flex items-center gap-4 p-4 rounded-2xl transition-all ${selectedCategory.id === cat.id ? 'bg-primary/10 border border-primary/40' : 'bg-surface-container-highest/50 border border-transparent hover:bg-surface-container-highest'}`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${selectedCategory.id === cat.id ? 'text-primary' : 'text-on-surface-variant'}`}>
                      <cat.icon className="w-5 h-5" />
                    </div>
                    <span className={`font-medium ${selectedCategory.id === cat.id ? 'text-primary' : 'text-on-surface'}`}>{cat.name}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Wallet Picker Overlay */}
      <AnimatePresence>
        {walletPickerMode !== 'single' && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWalletPickerMode('single')}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[110]"
            />
            <motion.div 
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-surface-container-low rounded-t-[2rem] z-[120] p-8 max-h-[70vh] overflow-y-auto no-scrollbar border-t border-white/10"
            >
              <div className="w-12 h-1.5 bg-white/10 rounded-full mx-auto mb-8" />
              <h3 className="font-headline text-3xl text-on-surface mb-8 italic">
                {walletPickerMode === 'from' ? 'Select Source Wallet' : walletPickerMode === 'to' ? 'Select Destination Wallet' : 'Select Wallet'}
              </h3>
              <div className="space-y-4">
                {WALLETS.map((wallet) => {
                  const isSelected = walletPickerMode === 'from' ? selectedWallet.id === wallet.id : toWallet.id === wallet.id;
                  return (
                    <button
                      key={wallet.id}
                      onClick={() => {
                        if (walletPickerMode === 'from') setSelectedWallet(wallet);
                        else setToWallet(wallet);
                        setWalletPickerMode('single');
                      }}
                      className={`w-full flex items-center justify-between p-6 rounded-2xl transition-all ${isSelected ? 'bg-primary/10 border border-primary/40' : 'bg-surface-container-highest/50 border border-transparent hover:bg-surface-container-highest'}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isSelected ? 'bg-primary/20 text-primary' : 'bg-surface-container-highest text-on-surface-variant'}`}>
                          <Wallet className="w-6 h-6" />
                        </div>
                        <div className="text-left">
                          <p className={`font-medium ${isSelected ? 'text-primary' : 'text-on-surface'}`}>{wallet.name}</p>
                          <p className="text-xs text-on-surface-variant">Available: ${wallet.balance.toLocaleString()}</p>
                        </div>
                      </div>
                      {isSelected && <CheckCircle className="text-primary w-6 h-6" />}
                    </button>
                  );
                })}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="fixed bottom-0 w-full h-1.5 flex gap-1 px-1 z-50">
        <div className="h-full flex-1 bg-primary/20"></div>
        <div className="h-full flex-1 bg-primary/40"></div>
        <div className="h-full flex-1 bg-primary-container"></div>
        <div className="h-full flex-1 bg-primary/40"></div>
        <div className="h-full flex-1 bg-primary/20"></div>
      </div>
    </motion.div>
  );
}

