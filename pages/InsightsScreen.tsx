
import React from 'react';
import { Link } from 'react-router-dom';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import Layout from '../components/Layout';
import { Expense } from '../types';

interface InsightsScreenProps {
  expenses: Expense[];
}

const InsightsScreen: React.FC<InsightsScreenProps> = ({ expenses }) => {
  // Aggregate data for chart
  const data = [
    { name: 'Food', value: 4647, color: '#FF7F50', icon: 'restaurant' },
    { name: 'Utilities', value: 2112, color: '#4DB6AC', icon: 'bolt' },
    { name: 'Travel', value: 1691, color: '#66BB6A', icon: 'directions_bus' },
  ];

  return (
    <Layout>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-cream dark:bg-background-dark">
        <header className="sticky top-0 z-50 flex items-center bg-cream/95 dark:bg-background-dark/95 backdrop-blur-md px-6 pt-12 pb-4 justify-between">
          <Link to="/" className="text-text-dark dark:text-white flex size-12 shrink-0 items-center justify-center rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors active:scale-90">
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </Link>
          <h2 className="text-text-dark dark:text-white text-lg font-black tracking-tighter uppercase">Insights</h2>
          <div className="w-12"></div>
        </header>

        <main className="px-6 pt-4 pb-24 space-y-8">
          {/* Month Selector */}
          <div className="flex justify-center items-center gap-6">
            <button className="size-10 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 text-gray-400 hover:text-text-dark transition-all active:scale-90">
              <span className="material-symbols-outlined text-xl">chevron_left</span>
            </button>
            <span className="text-base font-black text-text-dark dark:text-white uppercase tracking-widest">Oct 2024</span>
            <button className="size-10 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 text-gray-400 hover:text-text-dark transition-all active:scale-90">
              <span className="material-symbols-outlined text-xl">chevron_right</span>
            </button>
          </div>

          {/* Chart Section */}
          <div className="flex flex-col items-center relative py-4">
            <div className="w-full h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                  >
                    {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              {/* Inner Circle content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-gray-400 text-[10px] font-black uppercase tracking-[0.25em] mb-1">Total Spent</span>
                <span className="text-4xl font-black text-text-dark dark:text-white tracking-tighter">₹8,450</span>
                <div className="mt-3 text-[10px] text-harmony-green font-black bg-harmony-green/10 dark:bg-green-900/20 px-3 py-1 rounded-full uppercase tracking-widest border border-harmony-green/20">
                  On Target
                </div>
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-6 pb-2">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2.5">
                <div className="size-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest">{item.name}</span>
              </div>
            ))}
          </div>

          {/* Categories List */}
          <div className="space-y-4">
            {data.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-5 bg-white dark:bg-surface-dark rounded-[2rem] border border-black/5 dark:border-white/5 shadow-sm group hover:shadow-md transition-all active:scale-[0.99]">
                <div className="flex items-center gap-4">
                  <div className={`size-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-12`} style={{ backgroundColor: `${item.color}15`, color: item.color }}>
                    <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
                  </div>
                  <div>
                    <p className="font-black text-text-dark dark:text-white text-[15px] tracking-tight">{item.name}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                      {((item.value / 8450) * 100).toFixed(0)}% of total
                    </p>
                  </div>
                </div>
                <p className="font-black text-text-dark dark:text-white tracking-tight text-lg">₹{item.value.toLocaleString()}</p>
              </div>
            ))}
          </div>

          {/* Tip Card */}
          <div className="bg-gradient-to-br from-harmony-green/20 to-transparent border border-harmony-green/20 rounded-[2rem] p-6 flex items-start gap-4 shadow-sm mt-4">
            <div className="bg-harmony-green text-white p-2 rounded-2xl shrink-0 flex items-center justify-center shadow-lg shadow-harmony-green/20">
              <span className="material-symbols-outlined text-xl">auto_awesome</span>
            </div>
            <div className="pt-0.5">
              <p className="text-sm font-bold text-text-dark dark:text-white leading-relaxed">
                <span className="block mb-1 text-harmony-green font-black uppercase text-[10px] tracking-widest">Smart Tip</span>
                Sharing Netflix with 3 roommates would save you ₹300/mo. Want to invite them?
              </p>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default InsightsScreen;
