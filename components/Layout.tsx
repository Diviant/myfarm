
import React from 'react';
import { Home, Plus, User, MapPin, MessageSquare } from 'lucide-react';
import { TelegramUser } from '../types';
import OwlLogo from './OwlLogo';

interface LayoutProps {
  children: React.ReactNode;
  activeView: string;
  onViewChange: (view: any) => void;
  region: string | null;
  user: TelegramUser | null;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, region, user }) => {
  const isSpecialView = activeView === 'onboarding' || activeView === 'product-detail' || activeView === 'chat-detail';

  return (
    <div className="flex flex-col min-h-screen bg-[#0F110F] text-white selection:bg-[#F59E0B]/30">
      {/* Header */}
      {!isSpecialView && (
        <header className="sticky top-0 z-40 bg-[#0F110F]/80 backdrop-blur-xl border-b border-white/5 px-4 pt-10 pb-4 flex justify-between items-center">
          <div 
            className="flex items-center gap-2 bg-[#1A1D1A] px-4 py-2 rounded-2xl border border-white/10 active:scale-95 transition-transform"
            onClick={() => onViewChange('onboarding')}
          >
            <MapPin size={12} className="text-[#F59E0B]" />
            <span className="text-[10px] font-black text-gray-300 truncate max-w-[100px] uppercase tracking-widest">
              {region || 'Локация'}
            </span>
          </div>
          
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1.5">
             <OwlLogo size={24} color="#F59E0B" className="mb-0.5" />
             <div className="font-black text-white text-lg tracking-tighter uppercase italic">
                Ферма<span className="text-[#F59E0B]">Рядом</span>
             </div>
          </div>

          <div 
            className="w-10 h-10 bg-[#1A1D1A] rounded-2xl overflow-hidden border border-white/10 active:scale-95 transition-transform flex items-center justify-center"
            onClick={() => onViewChange('profile')}
          >
            {user?.photo_url ? (
              <img src={user.photo_url} alt="User" className="w-full h-full object-cover" />
            ) : (
              <div className="font-black text-[#F59E0B] text-sm">
                {user?.first_name?.charAt(0) || 'U'}
              </div>
            )}
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 ${!isSpecialView ? 'pb-32' : ''}`}>
        {children}
      </main>

      {/* Floating Navigation - 4 items in style */}
      {!isSpecialView && (
        <div className="fixed bottom-8 left-0 right-0 px-6 z-50 pointer-events-none nav-float">
          <nav className="mx-auto max-w-sm bg-[#1A1D1A]/95 backdrop-blur-2xl border border-white/10 rounded-[32px] p-2 flex items-center justify-between shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] pointer-events-auto">
            
            <NavBtn 
              active={activeView === 'home'} 
              onClick={() => onViewChange('home')}
              icon={<Home size={22} />}
              label="Рынок"
            />

            <NavBtn 
              active={activeView === 'messages'} 
              onClick={() => onViewChange('messages')}
              icon={<MessageSquare size={22} />}
              label="Чаты"
            />

            <button 
              onClick={() => onViewChange('create-listing')}
              className="flex items-center justify-center w-14 h-14 rounded-2xl bg-[#F59E0B] text-black transition-all duration-300 active:scale-95 shadow-[0_10px_25px_-5px_rgba(245,158,11,0.4)]"
            >
              <Plus size={24} strokeWidth={4} />
            </button>

            <NavBtn 
              active={activeView === 'profile' || activeView === 'admin-dashboard'} 
              onClick={() => onViewChange('profile')}
              icon={<User size={22} />}
              label="Кабинет"
            />

          </nav>
        </div>
      )}
    </div>
  );
};

interface NavBtnProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavBtn: React.FC<NavBtnProps> = ({ active, onClick, icon, label }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-16 h-14 rounded-2xl transition-all duration-300 active:scale-90 ${active ? 'text-[#F59E0B]' : 'text-gray-600'}`}
  >
    <div className={`mb-0.5 transition-transform duration-300 ${active ? 'scale-110' : ''}`}>{icon}</div>
    <span className={`text-[8px] font-black uppercase tracking-tighter transition-all ${active ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>
      {label}
    </span>
  </button>
);

export default Layout;
