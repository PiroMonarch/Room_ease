
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import { Roommate } from '../types';

interface SettlementScreenProps {
  roommates: Roommate[];
  onUpdate: (id: string, status: Roommate['status'], balance?: number) => void;
}

const SettlementScreen: React.FC<SettlementScreenProps> = ({ roommates, onUpdate }) => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<string | null>(null);

  const handleAction = (person: Roommate) => {
    if (person.status === 'Pay') {
      onUpdate(person.id, 'Synced', 0);
      showToast(`Settled with ${person.name}!`);
    } else if (person.status === 'Friendly Nudge') {
      showToast(`Nudge sent to ${person.name}!`);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <Layout>
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 pt-12 pb-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="p-2 -ml-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-2xl font-bold">arrow_back</span>
          </Link>
          <h1 className="text-2xl font-extrabold tracking-tight text-[#1d110c] dark:text-white">Roommates</h1>
        </div>
        <Link to="/settings" className="p-2 -mr-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-[#1d110c] dark:text-white">
          <span className="material-symbols-outlined text-2xl">settings</span>
        </Link>
      </header>

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] animate-bounce-short">
          <div className="bg-primary text-white px-6 py-3 rounded-full shadow-2xl font-bold text-sm flex items-center gap-2">
            <span className="material-symbols-outlined text-sm filled">check_circle</span>
            {toast}
          </div>
        </div>
      )}

      <main className="px-6 space-y-6 pt-4 pb-24">
        {/* Harmony Card */}
        <div className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-surface-dark p-6 shadow-sm ring-1 ring-black/5 transition-transform active:scale-[0.98]">
          <div className="absolute -right-4 -top-4 w-32 h-32 bg-harmony-green/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -left-4 -bottom-4 w-24 h-24 bg-primary/5 rounded-full blur-2xl"></div>
          <div className="relative flex items-center gap-5">
            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 rounded-2xl bg-harmony-green/10 text-harmony-green border border-harmony-green/20">
              <span className="material-symbols-outlined text-[2rem] filled">check_circle</span>
            </div>
            <div className="flex flex-col gap-0.5">
              <h2 className="text-lg font-black text-[#1d110c] dark:text-white leading-tight">Living in Harmony</h2>
              <p className="text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-widest">October Balance</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 px-1">
          <h3 className="text-base font-black text-[#1d110c] dark:text-white uppercase tracking-widest opacity-50">Roomies Status</h3>
          <button className="text-xs font-black text-primary hover:text-primary-dark transition-colors flex items-center gap-1 uppercase tracking-wider">
            History
            <span className="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

        <div className="space-y-4">
          {roommates.map((person) => (
            <div key={person.id} className="group flex items-center gap-5 bg-white dark:bg-surface-dark p-5 rounded-[2rem] shadow-sm hover:shadow-lg transition-all active:scale-[0.99] ring-1 ring-black/5">
              <div className="relative shrink-0">
                <div className="h-14 w-14 rounded-2xl bg-cover bg-center border border-gray-100 dark:border-white/10 shadow-inner overflow-hidden">
                  <img src={person.avatar} alt={person.name} />
                </div>
                {person.status !== 'Pay' && person.status !== 'Synced' && (
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-surface-dark rounded-full p-[2px]">
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-white dark:border-surface-dark bg-primary animate-pulse"></div>
                  </div>
                )}
                {person.status === 'Synced' && (
                  <div className="absolute -bottom-1 -right-1 bg-white dark:bg-surface-dark rounded-full p-[2px]">
                    <div className="h-3.5 w-3.5 rounded-full border-2 border-white dark:border-surface-dark bg-harmony-green"></div>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <p className="text-[#1d110c] dark:text-white text-[17px] font-black tracking-tight">{person.name}</p>
                <p className={`text-xs font-bold flex items-center gap-1.5 mt-0.5 ${person.status === 'Synced' ? 'text-harmony-green' : person.status === 'Friendly Nudge' ? 'text-primary' : 'text-coral-salmon'}`}>
                  {person.status === 'Synced' ? 'No balance' : `Balance: ₹${person.balance}`}
                </p>
              </div>
              <div className="shrink-0">
                {person.status === "Synced" ? (
                  <div className="h-10 w-10 flex items-center justify-center text-harmony-green opacity-50">
                    <span className="material-symbols-outlined text-[1.5rem] filled">verified</span>
                  </div>
                ) : (
                  <button 
                    onClick={() => handleAction(person)}
                    className={`flex items-center justify-center gap-2 active:scale-90 transition-all rounded-2xl h-11 px-5 text-xs font-black uppercase tracking-widest ${person.status === "Pay" ? "bg-coral-salmon text-white shadow-lg shadow-coral-salmon/30" : "bg-primary text-white shadow-lg shadow-primary/30"}`}
                  >
                    {person.status === "Friendly Nudge" ? "Nudge" : "Pay"}
                  </button>
                )}
              </div>
            </div>
          ))}

          <button 
            onClick={() => navigate('/invite')}
            className="w-full group flex items-center gap-5 bg-transparent p-5 rounded-[2rem] border-2 border-dashed border-gray-200 dark:border-white/10 hover:border-primary/40 hover:bg-primary/5 transition-all"
          >
            <div className="relative shrink-0 flex items-center justify-center h-14 w-14 rounded-2xl bg-gray-50 dark:bg-white/5 text-gray-400 group-hover:text-primary group-hover:bg-primary/10 transition-colors">
              <span className="material-symbols-outlined text-2xl">person_add</span>
            </div>
            <div className="flex-1 text-left">
              <p className="text-gray-400 group-hover:text-primary dark:text-gray-500 text-[17px] font-black tracking-tight transition-colors">Empty Bed</p>
              <p className="text-gray-400 dark:text-gray-600 font-bold text-xs uppercase tracking-wider">Invite a new roommate</p>
            </div>
          </button>
        </div>
      </main>
    </Layout>
  );
};

export default SettlementScreen;
