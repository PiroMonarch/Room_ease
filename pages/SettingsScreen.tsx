
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SettingsScreen: React.FC = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const sections: Array<{ title: string; items: any[] }> = [
    {
      title: "Living Space",
      items: [
        { icon: "home_app_fill", label: "My Roomies", value: "3 Members" },
        { icon: "location_on", label: "Apartment Info", value: "Apt 4B" },
      ]
    },
    {
      title: "System",
      items: [
        { icon: "dark_mode", label: "Dark Interface", type: "toggle", value: darkMode, action: toggleDarkMode },
        { icon: "notifications", label: "Push Alerts", type: "toggle", value: true },
        { icon: "currency_rupee", label: "Default Currency", value: "INR" }
      ]
    },
    {
      title: "Danger Zone",
      items: [
        { icon: "logout", label: "Log Out", color: "text-red-500" }
      ]
    }
  ];

  return (
    <div className="h-screen bg-background-light dark:bg-background-dark flex flex-col overflow-hidden">
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 pt-12 pb-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 hover:bg-gray-100 transition-all active:scale-90 shadow-sm border border-black/5">
          <span className="material-symbols-outlined text-gray-800 dark:text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black uppercase tracking-tight">Settings</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pt-4 pb-12">
        {/* Profile Card */}
        <div className="flex items-center gap-5 mb-10 p-6 bg-primary rounded-[2.5rem] shadow-2xl shadow-primary/20 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          <div className="w-20 h-20 rounded-2xl bg-white/20 p-1 backdrop-blur-md shrink-0 overflow-hidden">
             <img 
               src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400" 
               className="rounded-xl w-full h-full object-cover" 
               alt="Ananya Singh Profile" 
             />
          </div>
          <div>
            <h2 className="text-xl font-black tracking-tight leading-none">Ananya Singh</h2>
            <p className="text-[10px] text-white/60 font-black uppercase tracking-widest mt-2">Premium Member</p>
            <button className="text-xs font-bold text-white bg-white/10 px-4 py-1.5 rounded-full mt-3 hover:bg-white/20 transition-colors uppercase tracking-widest">Edit</button>
          </div>
        </div>

        <div className="space-y-10">
          {sections.map((section, idx) => (
            <div key={idx}>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-4 ml-4">{section.title}</h3>
              <div className="bg-white dark:bg-surface-dark rounded-[2rem] overflow-hidden shadow-sm border border-black/5 dark:border-white/5">
                {section.items.map((item, i) => (
                  <div 
                    key={i} 
                    onClick={item.type === 'toggle' ? item.action : undefined} 
                    className={`flex items-center justify-between p-5 ${i !== section.items.length - 1 ? 'border-b border-gray-50 dark:border-white/5' : ''} active:bg-gray-50 dark:active:bg-white/5 cursor-pointer transition-colors`}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`size-10 rounded-xl flex items-center justify-center bg-gray-50 dark:bg-white/5 ${item.color || 'text-gray-500'}`}>
                        <span className="material-symbols-outlined text-[22px]">{item.icon}</span>
                      </div>
                      <span className={`text-[15px] font-bold tracking-tight ${item.color || 'text-gray-900 dark:text-white'}`}>{item.label}</span>
                    </div>
                    
                    {item.type === 'toggle' ? (
                      <div className={`w-11 h-6 rounded-full relative transition-all duration-300 ${item.value ? 'bg-primary' : 'bg-gray-200 dark:bg-gray-700'}`}>
                        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-md transition-all duration-300 ${item.value ? 'left-6' : 'left-1'}`}></div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        {item.value && <span className="text-xs font-black text-gray-400 uppercase tracking-widest">{item.value}</span>}
                        <span className="material-symbols-outlined text-gray-300 text-xl">chevron_right</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
            <div className="flex items-center justify-center gap-2 text-primary opacity-30 mb-2">
                <span className="material-symbols-outlined text-2xl filled">spa</span>
                <span className="font-black uppercase tracking-[0.3em] text-[10px]">RoomEase</span>
            </div>
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Version 2.4.0 • Build #852</p>
        </div>
      </main>
    </div>
  );
};

export default SettingsScreen;
