
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Category } from '../types';

interface AddExpenseScreenProps {
  onAdd: (expense: any) => void;
}

const AddExpenseScreen: React.FC<AddExpenseScreenProps> = ({ onAdd }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.Food);
  const [note, setNote] = useState('');

  const handleSave = () => {
    if (!amount) return;
    onAdd({
      title: note || selectedCategory,
      amount: parseFloat(amount),
      date: 'Just now',
      category: selectedCategory,
      payerId: '1'
    });
    navigate('/');
  };

  const categories = [
    { icon: 'restaurant', label: Category.Food },
    { icon: 'bolt', label: Category.Utility },
    { icon: 'directions_bus', label: Category.Travel },
    { icon: 'wifi', label: Category.WiFi },
    { icon: 'shopping_basket', label: Category.Groceries },
  ];

  return (
    <div className="flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden transition-colors">
      <header className="flex items-center px-6 pt-12 pb-4 justify-between sticky top-0 z-10 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md flex-shrink-0">
        <button onClick={() => navigate(-1)} className="text-[#101919] dark:text-white flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white dark:bg-white/10 hover:bg-gray-100 transition-all shadow-sm active:scale-90 border border-black/5 dark:border-white/5">
          <span className="material-symbols-outlined text-xl">close</span>
        </button>
        <h2 className="text-lg font-black tracking-tight uppercase">New Expense</h2>
        <div className="w-11"></div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pb-40">
        <div className="flex flex-col items-center mt-6 mb-12">
          <h1 className="text-xl font-black mb-8 opacity-60 uppercase tracking-[0.2em]">How much?</h1>
          <div className="relative w-full max-w-[280px]">
            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary/40 text-4xl font-black">₹</div>
            <input
              autoFocus
              className="w-full bg-white dark:bg-white/5 border-none rounded-[2.5rem] py-10 pl-14 pr-6 text-center text-[54px] font-black text-primary placeholder:text-primary/10 focus:ring-8 focus:ring-primary/5 transition-all outline-none"
              inputMode="numeric"
              placeholder="0"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-10">
          <h2 className="text-xs font-black mb-6 text-gray-400 uppercase tracking-[0.2em] ml-2">Choose Category</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 -mx-6 px-6 snap-x">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat.label;
              return (
                <button 
                  key={cat.label} 
                  onClick={() => setSelectedCategory(cat.label)} 
                  className="flex flex-col items-center gap-3 shrink-0 snap-start active:scale-95 transition-transform"
                >
                  <div className={`size-[4.5rem] flex items-center justify-center rounded-[1.75rem] transition-all ${isActive ? 'bg-primary text-white shadow-2xl shadow-primary/30 scale-110' : 'bg-white dark:bg-white/10 text-gray-400 border border-black/5 dark:border-white/5 shadow-sm hover:bg-gray-50'}`}>
                    <span className="material-symbols-outlined text-[28px]">{cat.icon}</span>
                  </div>
                  <span className={`text-[10px] font-black uppercase tracking-widest transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-8">
            <label className="flex flex-col w-full">
                <span className="text-xs font-black mb-4 text-gray-400 uppercase tracking-[0.2em] ml-2">Note</span>
                <div className="relative group">
                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 material-symbols-outlined group-focus-within:text-primary transition-colors">edit_note</span>
                    <input 
                      className="w-full bg-white dark:bg-white/5 border border-transparent focus:border-primary/20 rounded-[2rem] py-5 pl-16 pr-6 text-gray-900 dark:text-white placeholder:text-gray-300 focus:ring-8 focus:ring-primary/5 transition-all shadow-sm font-bold text-sm" 
                      placeholder="e.g. Late night snacks" 
                      type="text"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                </div>
            </label>
        </div>
      </main>

      <div className="fixed bottom-0 left-0 right-0 p-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-black/5 dark:border-white/5 pb-10">
        <div className="max-w-[393px] mx-auto w-full">
          <button 
            onClick={handleSave}
            disabled={!amount}
            className="w-full h-16 bg-primary hover:bg-primary-dark disabled:opacity-30 disabled:grayscale text-white rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 active:scale-[0.98] transition-all group"
          >
            <span className="material-symbols-outlined group-hover:animate-bounce">check_circle</span>
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExpenseScreen;
