
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Utility } from '../types';

interface UtilitiesScreenProps {
  utilities: Utility[];
  onSettle: () => void;
}

const UtilitiesScreen: React.FC<UtilitiesScreenProps> = ({ utilities, onSettle }) => {
  const [loading, setLoading] = useState(false);

  const handleSettle = () => {
    setLoading(true);
    setTimeout(() => {
      onSettle();
      setLoading(false);
    }, 1500);
  };

  const totalDue = utilities.reduce((acc, curr) => acc + curr.mine, 0);

  // High-quality female portraits for aesthetic utility sharing visualization
  const aestheticRoomieAvatars = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop"
  ];

  return (
    <Layout>
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md transition-colors duration-300 pt-8 px-6">
        <div className="flex items-center justify-between h-[60px]"> 
          <Link to="/" className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-800 dark:text-gray-200 active:scale-90">
            <span className="material-symbols-outlined text-[22px]">arrow_back_ios_new</span>
          </Link>
          <h1 className="text-[17px] font-bold text-gray-900 dark:text-white tracking-tight">Shared Utilities</h1>
          <button className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors text-gray-800 dark:text-gray-200 active:scale-90">
            <span className="material-symbols-outlined text-[24px]">more_horiz</span>
          </button>
        </div>
      </header>

      <main className="px-6 pb-40"> 
        <div className="pt-6 pb-8">
          <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white leading-[1.1] mb-2 tracking-tight">Monthly<br/>Essentials</h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">Tracking common comforts transparently.</p>
        </div>

        <div className="space-y-4">
          {utilities.map((item, idx) => (
            <article key={item.id} className="bg-white dark:bg-surface-dark rounded-[2rem] p-5 shadow-sm border border-black/5 dark:border-white/5 relative overflow-hidden transition-all hover:shadow-lg active:scale-[0.99]">
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${item.color}`}></div>
              <div className="pl-2">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-primary shrink-0 bg-gray-50 dark:bg-white/5 border dark:border-white/10`}>
                      <span className="material-symbols-outlined text-[26px]">{item.icon}</span>
                    </div>
                    <div>
                      <h3 className="text-[16px] font-extrabold text-gray-900 dark:text-white leading-tight">{item.title}</h3>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <span className={`w-1.5 h-1.5 rounded-full ${item.mine > 0 ? 'bg-orange-400' : 'bg-green-400'}`}></span>
                        <p className="text-gray-500 dark:text-gray-400 text-[11px] font-bold uppercase tracking-wider">{item.due}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="block text-lg font-black text-gray-900 dark:text-white tracking-tighter">₹{item.cost}</span>
                    <span className="text-[11px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md mt-1 inline-block">You: ₹{item.mine}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex -space-x-2.5">
                      {aestheticRoomieAvatars.map((url, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-gray-200 overflow-hidden shadow-sm">
                          <img src={url} alt={`roomie${i}`} className="w-full h-full object-cover" />
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white dark:border-surface-dark bg-primary text-white flex items-center justify-center text-[9px] font-black z-10 shadow-md">YOU</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[10px] uppercase tracking-[0.2em] font-black text-gray-400">Auto-Split</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input defaultChecked className="sr-only peer" type="checkbox"/>
                      <div className="w-10 h-5.5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[3px] after:left-[3px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {totalDue > 0 && (
        <footer className="fixed bottom-24 left-6 right-6 z-40 bg-surface-light dark:bg-surface-dark rounded-[2.5rem] p-5 shadow-2xl border border-black/5 dark:border-white/5 transition-all animate-bounce-short">
            <div className="flex items-center justify-between gap-4">
                <div className="flex flex-col">
                    <span className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-widest">Total Share Due</span>
                    <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-black text-gray-900 dark:text-white tracking-tighter">₹{totalDue}</span>
                        <span className="text-xs font-bold text-gray-400">.00</span>
                    </div>
                </div>
                <button 
                  onClick={handleSettle}
                  disabled={loading}
                  className="bg-primary hover:bg-primary-dark text-white font-black py-4 px-8 rounded-2xl transition-all active:scale-95 shadow-xl shadow-primary/30 flex-1 flex items-center justify-center gap-2 text-sm uppercase tracking-wider"
                >
                    {loading ? (
                      <span className="material-symbols-outlined animate-spin">sync</span>
                    ) : (
                      <>
                        Settle All
                        <span className="material-symbols-outlined text-[18px]">bolt</span>
                      </>
                    )}
                </button>
            </div>
        </footer>
      )}
    </Layout>
  );
};

export default UtilitiesScreen;
