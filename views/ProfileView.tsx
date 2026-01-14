
import React from 'react';
import { Settings, LogOut, Heart, Clock, HelpCircle, MapPin, ChevronRight, Package, UserCheck, ShieldCheck, Sparkles } from 'lucide-react';
import { TelegramUser } from '../types';

interface ProfileViewProps {
  user: TelegramUser | null;
  region: string | null;
  onAdminClick: () => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ user, region, onAdminClick }) => {
  const handleNotImplemented = (label: string) => {
    window.Telegram.WebApp?.HapticFeedback?.notificationOccurred('warning');
    window.Telegram.WebApp?.showPopup({
      title: 'В разработке',
      message: `Раздел "${label}" скоро появится. Мы работаем над этим!`,
      buttons: [{ type: 'ok', text: 'Понятно' }]
    });
  };

  return (
    <div className="px-6 pt-6 bg-[#0F110F] min-h-screen pb-24 text-white">
      {/* User Profile Header */}
      <div className="flex items-center gap-6 mb-12 pt-6">
        <div className="relative">
          <div className="absolute inset-0 bg-amber-500/20 blur-2xl rounded-full"></div>
          <div className="w-24 h-24 bg-[#1A1D1A] rounded-[38px] flex items-center justify-center font-black text-[#F59E0B] text-3xl border border-white/10 overflow-hidden relative z-10 shadow-2xl">
            {user?.photo_url ? (
              <img src={user.photo_url} className="w-full h-full object-cover" alt="User profile" />
            ) : (
              user?.first_name?.charAt(0) || 'U'
            )}
          </div>
        </div>
        <div>
          <h2 className="text-3xl font-black text-white leading-none tracking-tighter mb-2 italic">
            {user?.first_name}
          </h2>
          <div className="flex items-center gap-1.5 text-gray-500 text-[11px] font-black uppercase tracking-widest mb-3">
             <MapPin size={12} className="text-[#F59E0B]" />
             <span>{region || 'Россия'}</span>
          </div>
          <div className="flex items-center gap-2 text-[#F59E0B] font-black text-[9px] bg-amber-500/10 w-fit px-4 py-2 rounded-2xl uppercase tracking-[0.2em] border border-amber-500/10">
            <UserCheck size={12} />
            <span>Верифицирован</span>
          </div>
        </div>
      </div>

      {/* Pro Farmer Card */}
      <div className="relative group mb-10 overflow-hidden rounded-[38px]">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent opacity-50"></div>
        <div className="relative bg-[#1A1D1A] border border-white/5 p-8 shadow-2xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/10 shadow-inner">
                <ShieldCheck size={22} className="text-[#F59E0B]" />
              </div>
              <div>
                <div className="text-[10px] font-black text-[#F59E0B] uppercase tracking-[0.2em] mb-0.5">Личный кабинет</div>
                <div className="text-lg font-black text-white italic tracking-tighter">Управление товарами</div>
              </div>
            </div>
            <Sparkles size={20} className="text-amber-500/30" />
          </div>
          <button 
            onClick={() => {
              window.Telegram.WebApp?.HapticFeedback?.impactOccurred('medium');
              onAdminClick();
            }}
            className="w-full bg-[#F59E0B] text-black py-4.5 rounded-[22px] font-black uppercase tracking-widest text-[11px] transition-all active:scale-95 shadow-[0_15px_30px_-10px_rgba(245,158,11,0.4)]"
          >
            Войти в амбар
          </button>
        </div>
      </div>

      {/* Profile Menu */}
      <div className="space-y-3 pb-12">
        <div className="px-2 mb-4">
           <span className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Настройки рынка</span>
        </div>
        
        <MenuItem 
          icon={<Package size={20} />} 
          label="Мои объявления" 
          badge="2" 
          onClick={onAdminClick}
        />
        
        <MenuItem 
          icon={<Heart size={20} />} 
          label="Избранные фермы" 
          onClick={() => handleNotImplemented('Избранное')}
        />
        
        <MenuItem 
          icon={<Clock size={20} />} 
          label="История покупок" 
          onClick={() => handleNotImplemented('История')}
        />
        
        <MenuItem 
          icon={<HelpCircle size={20} />} 
          label="Служба поддержки" 
          onClick={() => handleNotImplemented('Поддержка')}
        />
        
        <MenuItem 
          icon={<Settings size={20} />} 
          label="Конфиденциальность" 
          onClick={() => handleNotImplemented('Настройки')}
        />
        
        <button 
          onClick={() => {
            window.Telegram.WebApp?.HapticFeedback?.notificationOccurred('error');
            window.location.reload();
          }}
          className="w-full flex items-center justify-center gap-3 p-5 rounded-3xl text-gray-500 font-black uppercase tracking-widest text-[10px] active:bg-red-500/10 active:text-red-400 transition-all mt-10 border border-white/5 bg-[#1A1D1A]/30"
        >
          <LogOut size={16} />
          Выйти из системы
        </button>
      </div>
    </div>
  );
};

interface MenuItemProps {
  icon: React.ReactNode;
  label: string;
  badge?: string;
  onClick: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, label, badge, onClick }) => (
  <button 
    onClick={() => {
      window.Telegram.WebApp?.HapticFeedback?.impactOccurred('light');
      onClick();
    }}
    className="w-full flex items-center justify-between p-5.5 bg-[#1A1D1A] border border-white/5 rounded-[28px] active:bg-white/5 active:scale-[0.98] transition-all group"
  >
    <div className="flex items-center gap-5">
      <div className="text-gray-500 group-active:text-[#F59E0B] transition-colors">{icon}</div>
      <span className="font-black text-gray-200 text-sm uppercase tracking-tight">{label}</span>
    </div>
    <div className="flex items-center gap-3">
      {badge && <span className="text-[9px] font-black text-black bg-[#F59E0B] px-3.5 py-1.5 rounded-xl uppercase shadow-lg shadow-amber-500/20">{badge}</span>}
      <ChevronRight size={18} className="text-gray-700" />
    </div>
  </button>
);

export default ProfileView;
