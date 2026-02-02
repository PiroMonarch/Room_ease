
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import HomeScreen from './pages/HomeScreen';
import UtilitiesScreen from './pages/UtilitiesScreen';
import SettlementScreen from './pages/SettlementScreen';
import AddExpenseScreen from './pages/AddExpenseScreen';
import InsightsScreen from './pages/InsightsScreen';
import NotificationScreen from './pages/NotificationScreen';
import SettingsScreen from './pages/SettingsScreen';
import InviteRoommateScreen from './pages/InviteRoommateScreen';
import AiAssistantScreen from './pages/AiAssistantScreen';
import { Roommate, Expense, Utility } from './types';

const STORAGE_KEYS = {
  ROOMMATES: 'roomease_roommates_v3', 
  EXPENSES: 'roomease_expenses_v3',
  UTILITIES: 'roomease_utilities_v3',
};

const INITIAL_ROOMMATES: Roommate[] = [
  { id: '1', name: "Ananya Singh", balance: 450, status: "Friendly Nudge", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: '2', name: "Priya Sharma", balance: 120, status: "Pay", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400&h=400" },
  { id: '3', name: "Meera Iyer", balance: 0, status: "Synced", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400&h=400" }
];

const INITIAL_EXPENSES: Expense[] = [
  { id: '1', title: 'Late Night Biryani', amount: 850, date: 'Today • 11:30 PM', category: 'Food', payerId: '1' },
  { id: '2', title: 'Groceries (Dmart)', amount: 2450, date: 'Yesterday', category: 'Groceries', payerId: '2' },
  { id: '3', title: 'Starbucks Coffee', amount: 450, date: '2 days ago', category: 'Food', payerId: '1' }
];

const INITIAL_UTILITIES: Utility[] = [
  { id: '1', title: "ACT WiFi Fiber", icon: "wifi", due: "Due in 2 days", cost: 1199, mine: 300, color: "bg-primary", isShared: true },
  { id: '2', title: "Daily Milk Supply", icon: "water_drop", due: "Daily", cost: 1200, mine: 300, color: "bg-blue-400", isShared: true },
  { id: '3', title: "Electricity Bill", icon: "electric_bolt", due: "Monthly", cost: 4500, mine: 1125, color: "bg-amber-400", isShared: true }
];

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [roommates, setRoommates] = useState<Roommate[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.ROOMMATES);
    return saved ? JSON.parse(saved) : INITIAL_ROOMMATES;
  });

  const [expenses, setExpenses] = useState<Expense[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
    return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
  });

  const [utilities, setUtilities] = useState<Utility[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEYS.UTILITIES);
    return saved ? JSON.parse(saved) : INITIAL_UTILITIES;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROOMMATES, JSON.stringify(roommates));
  }, [roommates]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
  }, [expenses]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.UTILITIES, JSON.stringify(utilities));
  }, [utilities]);

  const addExpense = (expense: Omit<Expense, 'id'>) => {
    const newExpense = { ...expense, id: Math.random().toString(36).substr(2, 9) };
    setExpenses([newExpense, ...expenses]);
    
    if (expense.payerId !== '1') {
      const perHead = expense.amount / (roommates.length + 1);
      updateRoommateStatus(expense.payerId, 'Pay', roommates.find(r => r.id === expense.payerId)!.balance + perHead);
    }
  };

  const addRoommate = (name: string) => {
    const newRoomie: Roommate = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      balance: 0,
      status: 'Synced',
      avatar: `https://api.dicebear.com/7.x/lorelei/svg?seed=${name}&flip=true`
    };
    setRoommates([...roommates, newRoomie]);
  };

  const updateRoommateStatus = (id: string, status: Roommate['status'], balanceUpdate?: number) => {
    setRoommates(prev => prev.map(r => 
      r.id === id ? { ...r, status, balance: balanceUpdate !== undefined ? Math.round(balanceUpdate) : r.balance } : r
    ));
  };

  const settleUtilities = () => {
    setUtilities(prev => prev.map(u => ({ ...u, due: "Settled", mine: 0 })));
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="h-screen w-full bg-background-light dark:bg-background-dark text-text-dark dark:text-white font-display overflow-hidden flex flex-col">
        <Routes>
          <Route path="/" element={<HomeScreen expenses={expenses} roommates={roommates} />} />
          <Route path="/utilities" element={<UtilitiesScreen utilities={utilities} onSettle={settleUtilities} />} />
          <Route path="/settlement" element={<SettlementScreen roommates={roommates} onUpdate={updateRoommateStatus} />} />
          <Route path="/add-expense" element={<AddExpenseScreen onAdd={addExpense} />} />
          <Route path="/insights" element={<InsightsScreen expenses={expenses} />} />
          <Route path="/notifications" element={<NotificationScreen />} />
          <Route path="/settings" element={<SettingsScreen />} />
          <Route path="/invite" element={<InviteRoommateScreen onAddRoommate={addRoommate} />} />
          <Route path="/ai" element={<AiAssistantScreen />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
