
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, hideNav = false }) => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: 'home', label: 'Home' },
    { path: '/settlement', icon: 'group', label: 'Roomies' },
    { path: '/insights', icon: 'pie_chart', label: 'Insights' },
    { path: '/utilities', icon: 'account_balance_wallet', label: 'Bills' },
  ];

  return (
    <div className="flex flex-col h-full w-full overflow-hidden relative">
      <div className="flex-1 overflow-y-auto no-scrollbar pb-24">
        {children}
      </div>
      
      {!hideNav && (
        <nav className="absolute bottom-0 w-full bg-white dark:bg-[#1e1411] border-t border-gray-100 dark:border-gray-800 pb-8 pt-2 px-6 z-50 rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.08)] transition-colors duration-300">
          <div className="flex items-center justify-between h-14">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex flex-col items-center gap-1 transition-all duration-300 w-16 group ${isActive ? 'text-primary scale-110' : 'text-gray-400'}`}
                >
                  <span className={`material-symbols-outlined text-[1.75rem] transition-transform ${isActive ? 'filled' : 'group-hover:-translate-y-0.5'}`}>
                    {item.icon}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </div>
  );
};

export default Layout;
