
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface InviteRoommateScreenProps {
  onAddRoommate: (name: string) => void;
}

const InviteRoommateScreen: React.FC<InviteRoommateScreenProps> = ({ onAddRoommate }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const handleInvite = () => {
    if (!name.trim()) return;
    onAddRoommate(name);
    navigate('/settlement');
  };

  const handleNativeShare = async () => {
    const shareData = {
      title: 'Join my RoomEase home!',
      text: 'Hey! Join me on RoomEase to manage our shared expenses and bills.',
      url: 'https://roomease.app/invite/x8j2-k9Lp-42Q',
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        copyLink();
      }
    } catch (err) {
      console.error('Error sharing:', err);
      copyLink();
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText('https://roomease.app/invite/x8j2-k9Lp-42Q');
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="h-screen bg-background-light dark:bg-background-dark flex flex-col overflow-hidden">
      <header className="sticky top-0 z-40 bg-background-light/95 dark:bg-background-dark/95 backdrop-blur-md px-6 pt-12 pb-4 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="w-11 h-11 flex items-center justify-center rounded-2xl bg-white dark:bg-white/5 hover:bg-gray-100 transition-all active:scale-90 shadow-sm border border-black/5">
          <span className="material-symbols-outlined text-gray-800 dark:text-white">arrow_back</span>
        </button>
        <h1 className="text-xl font-black uppercase tracking-tight">Invite Roomie</h1>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar px-6 pt-8 pb-12 space-y-10">
        <div className="text-center">
          <div className="size-24 bg-primary/10 text-primary rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-inner">
            <span className="material-symbols-outlined text-4xl filled">group_add</span>
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white tracking-tight">Expand the Circle</h2>
          <p className="text-gray-500 text-sm mt-2 font-medium">Add a new member to your shared harmony.</p>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <label className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Quick Add</label>
            <div className="relative">
              <span className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300 material-symbols-outlined">person</span>
              <input 
                className="w-full bg-white dark:bg-white/5 border border-transparent focus:border-primary/20 rounded-[2rem] py-5 pl-16 pr-6 text-gray-900 dark:text-white placeholder:text-gray-300 focus:ring-8 focus:ring-primary/5 transition-all shadow-sm font-bold text-sm" 
                placeholder="Roommate's Name" 
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <button 
              onClick={handleInvite}
              disabled={!name.trim()}
              className="w-full h-14 bg-primary text-white rounded-[1.75rem] font-black uppercase tracking-widest shadow-xl shadow-primary/20 disabled:opacity-30 active:scale-95 transition-all"
            >
              Add Now
            </button>
          </div>

          <div className="relative py-4">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100 dark:border-white/5"></div></div>
            <div className="relative flex justify-center"><span className="bg-background-light dark:bg-background-dark px-4 text-[10px] font-black text-gray-300 uppercase tracking-widest">or share link</span></div>
          </div>

          <div className="bg-white dark:bg-surface-dark p-6 rounded-[2rem] shadow-sm border border-black/5 space-y-4">
            <button 
              onClick={handleNativeShare}
              className="w-full h-14 bg-secondary text-white rounded-[1.75rem] font-black uppercase tracking-widest shadow-xl shadow-secondary/20 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">share</span>
              Send Invitation
            </button>
            <button 
              onClick={copyLink}
              className={`w-full h-12 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all ${isCopied ? 'bg-harmony-green text-white' : 'bg-gray-100 dark:bg-white/5 text-gray-600'}`}
            >
              <span className="material-symbols-outlined text-lg">{isCopied ? 'done' : 'content_copy'}</span>
              {isCopied ? 'Copied Link' : 'Copy Invitation Link'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InviteRoommateScreen;
