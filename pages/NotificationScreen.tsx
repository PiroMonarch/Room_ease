
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotificationScreen: React.FC = () => {
  const navigate = useNavigate();
  const notifications = [
    { id: 1, type: "reminder", title: "Rent Due Tomorrow", desc: "Don't forget to settle your share of ₹8,000", time: "2h ago", icon: "calendar_month", color: "bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400" },
    { id: 2, type: "activity", title: "Priya added an expense", desc: "Groceries for the weekend cooking session", time: "5h ago", icon: "shopping_cart", color: "bg-blue-50 text-blue-500 dark:bg-blue-900/20 dark:text-blue-400" },
    { id: 3, type: "settle", title: "Settlement Request", desc: "Meera requested ₹450 for the electricity bill", time: "1d ago", icon: "payments", color: "bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary" },
    { id: 4, type: "system", title: "Budget Alert", desc: "You've used 85% of your food budget this month", time: "2d ago", icon: "warning", color: "bg-orange-50 text-orange-500 dark:bg-orange-900/20 dark:text-orange-400" }
  ];

  return (
    <div className="h-screen bg-background-light dark:bg-background-dark flex flex-col overflow-hidden">
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 pt-12 pb-4 flex items-center gap-4 border-b border-black/5 dark:border-white/5">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-all active:scale-90">
          <span className="material-symbols-outlined text-gray-800 dark:text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black uppercase tracking-tight">Activity</h1>
        <div className="flex-1 text-right">
             <button className="text-[10px] font-black uppercase tracking-widest text-primary">Clear all</button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pt-6 pb-12">
        <div className="space-y-4">
          {notifications.map((notif) => (
            <div key={notif.id} className="flex gap-4 p-5 rounded-[2rem] bg-white dark:bg-surface-dark shadow-sm border border-black/5 dark:border-white/5 transition-all active:scale-[0.98] hover:shadow-md">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${notif.color}`}>
                <span className="material-symbols-outlined text-[26px]">{notif.icon}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start mb-1.5">
                  <h3 className="font-black text-gray-900 dark:text-white text-[15px] truncate tracking-tight">{notif.title}</h3>
                  <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap ml-2 uppercase tracking-tighter">{notif.time}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-snug font-medium">{notif.desc}</p>
              </div>
            </div>
          ))}
          
          <div className="text-center py-12">
            <div className="size-20 bg-gray-100 dark:bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto mb-4 opacity-30">
                <span className="material-symbols-outlined text-4xl">notifications_off</span>
            </div>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">All Caught Up</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NotificationScreen;
