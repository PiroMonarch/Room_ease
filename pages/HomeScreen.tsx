
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Expense, Roommate, Category } from '../types';

interface HomeScreenProps {
  expenses: Expense[];
  roommates: Roommate[];
}

const HomeScreen: React.FC<HomeScreenProps> = ({ expenses, roommates }) => {
  const latestExpense = expenses[0];
  
  const totalSpent = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const userOwes = roommates.reduce((sum, r) => r.status === 'Pay' ? sum + r.balance : sum, 0);
  const userIsOwed = roommates.reduce((sum, r) => r.status === 'Friendly Nudge' ? sum + r.balance : sum, 0);
  const netBalance = userIsOwed - userOwes;

  const categoryTotals = expenses.reduce((acc, exp) => {
    const cat = exp.category as Category;
    acc[cat] = (acc[cat] || 0) + exp.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Layout>
      <header className="flex h-[80px] items-end pb-4 justify-between px-6 shrink-0 bg-background-light dark:bg-background-dark z-10 sticky top-0">
        <Link to="/settings" className="flex h-10 w-10 items-center justify-center rounded-full text-text-dark dark:text-white transition hover:bg-black/5 dark:hover:bg-white/10 active:scale-90">
          <span className="material-symbols-outlined text-[24px]">settings</span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-[28px] filled">spa</span>
          <h1 className="text-xl font-extrabold tracking-tight text-primary dark:text-white">RoomEase</h1>
        </div>
        <Link to="/notifications" className="flex h-10 w-10 items-center justify-center rounded-full text-text-dark dark:text-white transition hover:bg-black/5 dark:hover:bg-white/10 relative active:scale-90">
          <span className="material-symbols-outlined text-[24px]">notifications</span>
          <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-background-light dark:border-background-dark"></span>
        </Link>
      </header>

      <main className="px-6 pt-2 space-y-8 pb-32">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Hi Ananya,</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-0.5">Everything is in harmony today.</p>
          </div>
        </div>

        {/* Balance Card */}
        <div className="w-full rounded-[2.5rem] bg-gradient-to-br from-primary to-primary-dark p-7 text-white shadow-2xl shadow-primary/30 ring-1 ring-white/10 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 h-32 w-32 rounded-full bg-white/10 blur-2xl"></div>
          <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-black/5 blur-xl"></div>
          <div className="relative z-10 flex flex-col gap-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-xs font-bold text-white/70 uppercase tracking-[0.15em]">Settlement Balance</span>
                <div className="flex items-baseline gap-1 mt-1.5">
                  <span className="text-4xl font-extrabold tracking-tight">
                    {netBalance >= 0 ? '+' : '-'}₹ {Math.abs(netBalance).toLocaleString()}
                  </span>
                  <span className="text-lg font-medium opacity-60">.00</span>
                </div>
                <span className="text-[10px] text-white/50 font-semibold tracking-wider uppercase mt-1 block">Your Net Flow</span>
              </div>
              <Link to="/utilities" className="h-11 w-11 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md active:scale-95 transition-transform">
                <span className="material-symbols-outlined text-white text-[22px]">account_balance_wallet</span>
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-[11px] font-bold text-white/80 uppercase tracking-widest">
                <span>Spent ₹ {totalSpent.toLocaleString()}</span>
                <span>Limit ₹ 15,000</span>
              </div>
              <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-black/20">
                <div 
                  className="absolute left-0 top-0 h-full rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] transition-all duration-1000 ease-out"
                  style={{ width: `${Math.min((totalSpent/15000)*100, 100)}%` }}
                ></div>
              </div>
              <div className="flex items-center gap-1 text-[10px] text-white/60 italic font-medium">
                <span className="material-symbols-outlined text-sm">energy_savings_leaf</span>
                <span>Smart split active for {roommates.length} roomies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <section className="grid grid-cols-2 gap-4">
           <Link to="/invite" className="bg-white dark:bg-surface-dark p-5 rounded-[2rem] border border-black/5 shadow-sm flex flex-col items-center gap-2 group active:scale-95 transition-all">
              <div className="size-12 bg-primary/10 text-primary rounded-2xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                 <span className="material-symbols-outlined">person_add</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Invite Roomie</span>
           </Link>
           <Link to="/add-expense" className="bg-white dark:bg-surface-dark p-5 rounded-[2rem] border border-black/5 shadow-sm flex flex-col items-center gap-2 group active:scale-95 transition-all">
              <div className="size-12 bg-secondary/10 text-secondary rounded-2xl flex items-center justify-center group-hover:bg-secondary group-hover:text-white transition-colors">
                 <span className="material-symbols-outlined">add_shopping_cart</span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-widest">Add Expense</span>
           </Link>
        </section>

        {/* Categories Grid */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white tracking-tight">Top Categories</h3>
            <Link to="/insights" className="text-sm font-bold text-primary">Details</Link>
          </div>
          <div className="grid grid-cols-2 gap-4"> 
            <div className="col-span-2 group flex flex-col justify-between gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-xl dark:bg-surface-dark dark:ring-white/10">
              <div className="flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF0EB] text-secondary dark:bg-secondary/20">
                  <span className="material-symbols-outlined text-[24px]">restaurant</span>
                </div>
                <span className="text-xs font-bold text-gray-500 bg-gray-100 px-3 py-1 rounded-full dark:bg-white/5 dark:text-gray-400">
                  ₹{(categoryTotals[Category.Food] || 0).toLocaleString()} spent
                </span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Food & Drinks</h4>
                <div className="relative h-1.5 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-white/5 mt-2">
                  <div 
                    className="absolute left-0 top-0 h-full rounded-full bg-secondary"
                    style={{ width: `${Math.min(((categoryTotals[Category.Food] || 0)/5000)*100, 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-xl dark:bg-surface-dark dark:ring-white/10">
              <div className="flex items-center justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#EBF5F0] text-accent dark:bg-accent/20">
                  <span className="material-symbols-outlined text-[24px]">bolt</span>
                </div>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Utilities</h4>
                <p className="text-[10px] text-gray-500 mt-1">₹{(categoryTotals[Category.Utility] || 0).toLocaleString()}</p>
              </div>
            </div>
            <div className="flex flex-col justify-between gap-4 rounded-[2rem] bg-white p-5 shadow-sm ring-1 ring-black/5 transition-all hover:shadow-xl dark:bg-surface-dark dark:ring-white/10">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20">
                <span className="material-symbols-outlined text-[24px]">directions_bus</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Travel</h4>
                <p className="text-[10px] text-gray-500 mt-1">₹{(categoryTotals[Category.Travel] || 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Recent Transaction */}
        {latestExpense && (
          <section className="pb-8">
            <h3 className="mb-4 text-lg font-bold text-gray-900 dark:text-white tracking-tight">Latest Expense</h3>
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-black/5 flex items-center gap-4 dark:bg-surface-dark dark:ring-white/10 group transition-all active:scale-[0.98]">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary dark:bg-primary/20">
                <span className="material-symbols-outlined text-[24px]">
                  {latestExpense.category === Category.Food ? 'restaurant' : 
                   latestExpense.category === Category.Utility ? 'bolt' : 'payments'}
                </span>
              </div>
              <div className="flex flex-1 flex-col">
                <span className="text-[15px] font-bold text-gray-900 dark:text-white">{latestExpense.title}</span>
                <span className="text-xs text-gray-500 font-medium">{latestExpense.date}</span>
              </div>
              <span className="text-base font-black text-gray-900 dark:text-white tracking-tight">-₹ {latestExpense.amount.toLocaleString()}</span>
            </div>
          </section>
        )}
      </main>

      <Link to="/add-expense" className="absolute bottom-28 right-6 z-40">
        <button className="flex h-16 w-16 items-center justify-center rounded-[2rem] bg-secondary text-white shadow-2xl shadow-secondary/50 transition-all hover:scale-105 active:scale-95 group">
          <span className="material-symbols-outlined text-[32px] group-hover:rotate-90 transition-transform">add</span>
        </button>
      </Link>
    </Layout>
  );
};

export default HomeScreen;
