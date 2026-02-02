
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AiAssistantScreen: React.FC = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', text: string }[]>([
    { role: 'ai', text: "Hey Ananya! I'm your RoomEase Assistant. Need help managing expenses or tips for shared living?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    try {
      // Simulated response - replace with your own API if needed
      const responses = [
        "That sounds like a great idea! Have you discussed it with your roommates?",
        "You could split that expense equally or based on usage.",
        "Setting reminders can help keep track of shared bills.",
        "Communication is key to avoiding conflicts!",
        "Consider creating a shared budget for better planning."
      ];
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      const aiText = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { role: 'ai', text: aiText }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', text: "I'm here to help! Feel free to ask anything about managing shared expenses." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="h-screen bg-background-light dark:bg-background-dark flex flex-col overflow-hidden">
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 pt-12 pb-4 flex items-center gap-4 border-b border-black/5">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 hover:bg-gray-100 transition-all active:scale-90 shadow-sm border border-black/5">
          <span className="material-symbols-outlined text-gray-800 dark:text-white">arrow_back</span>
        </button>
        <div className="flex flex-col">
          <h1 className="text-lg font-black uppercase tracking-tight leading-none">Assistant</h1>
          <div className="flex items-center gap-1 mt-1">
             <div className="size-1.5 rounded-full bg-harmony-green animate-pulse"></div>
             <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ready to help</span>
          </div>
        </div>
      </header>

      <main ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar px-6 py-6 space-y-6">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] p-5 rounded-[1.75rem] text-sm font-medium leading-relaxed shadow-sm ${
              msg.role === 'user' 
              ? 'bg-primary text-white rounded-tr-sm' 
              : 'bg-white dark:bg-surface-dark text-gray-800 dark:text-gray-200 rounded-tl-sm border border-black/5'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white dark:bg-surface-dark p-5 rounded-[1.75rem] rounded-tl-sm border border-black/5 flex gap-1.5">
              <div className="size-1.5 bg-primary/40 rounded-full animate-bounce"></div>
              <div className="size-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
              <div className="size-1.5 bg-primary/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
            </div>
          </div>
        )}
      </main>

      <footer className="p-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-xl border-t border-black/5 pb-10">
        <div className="relative group">
          <input 
            type="text" 
            placeholder="Ask anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            className="w-full h-14 bg-white dark:bg-white/5 border-none rounded-[1.75rem] pl-6 pr-14 text-sm font-bold shadow-lg focus:ring-4 focus:ring-primary/5 transition-all outline-none"
          />
          <button 
            onClick={handleSend}
            disabled={!input.trim() || isTyping}
            className="absolute right-2 top-2 size-10 bg-primary text-white rounded-2xl flex items-center justify-center shadow-lg active:scale-90 transition-all disabled:opacity-20"
          >
            <span className="material-symbols-outlined text-xl">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default AiAssistantScreen;
