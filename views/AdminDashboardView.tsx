
import React, { useState, useMemo } from 'react';
import { LayoutDashboard, Package, Trash2, Edit3, ChevronLeft, TrendingUp, Users, Search, CheckCircle, Clock, BarChart3, Sparkles } from 'lucide-react';
import { Product } from '../types';
import OwlLogo from '../components/OwlLogo';

interface AdminDashboardViewProps {
  products: Product[];
  onBack: () => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: string) => void;
}

type AdminTab = 'inventory' | 'moderation' | 'analytics';

const AdminDashboardView: React.FC<AdminDashboardViewProps> = ({ products, onBack, onEdit, onDelete }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('inventory');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [products, searchQuery]);

  const stats = [
    { label: 'В продаже', value: products.length, icon: <Package size={14} />, glow: 'shadow-amber-500/10' },
    { label: 'Клиенты', value: '42', icon: <Users size={14} />, glow: 'shadow-blue-500/10' },
    { label: 'Визиты', value: '1.2k', icon: <TrendingUp size={14} />, glow: 'shadow-green-500/10' },
  ];

  return (
    <div className="bg-[#0F110F] min-h-screen text-white pb-24">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 sticky top-0 bg-[#0F110F]/90 backdrop-blur-2xl border-b border-white/5 z-30">
        <div className="flex items-center justify-between mb-8">
          <button onClick={onBack} className="bg-[#1A1D1A] p-3 rounded-2xl border border-white/10 active:scale-90 transition-transform">
            <ChevronLeft size={20} className="text-gray-400" />
          </button>
          <div className="flex flex-col items-center">
             <div className="flex items-center gap-1.5">
                <LayoutDashboard size={14} className="text-[#F59E0B]" />
                <span className="font-black uppercase tracking-widest text-[10px] text-gray-500 italic">Панель управления</span>
             </div>
             <h2 className="text-xl font-black tracking-tighter uppercase italic">Ваша <span className="text-[#F59E0B]">Ферма</span></h2>
          </div>
          <div className="w-11"></div> {/* Spacer for symmetry */}
        </div>

        {/* Tab Selection */}
        <div className="flex gap-1.5 bg-[#1A1D1A] p-1.5 rounded-[24px] border border-white/5">
          <TabButton active={activeTab === 'inventory'} onClick={() => setActiveTab('inventory')} label="Склад" icon={<Package size={14} />} />
          <TabButton active={activeTab === 'moderation'} onClick={() => setActiveTab('moderation')} label="Почта" icon={<Clock size={14} />} />
          <TabButton active={activeTab === 'analytics'} onClick={() => setActiveTab('analytics')} label="Итоги" icon={<BarChart3 size={14} />} />
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'inventory' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative group">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input 
                type="text" 
                placeholder="Поиск по вашим товарам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#1A1D1A] border border-white/10 rounded-3xl py-4 pl-13 pr-4 text-xs font-bold focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all"
              />
            </div>

            <div className="space-y-4">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-[#1A1D1A] border border-white/5 p-4 rounded-3xl flex items-center justify-between gap-4 group transition-all">
                  <div className="flex items-center gap-4 overflow-hidden">
                    <div className="relative flex-shrink-0">
                      <img src={product.image} className="w-14 h-14 rounded-2xl object-cover border border-white/5 grayscale-[40%]" alt="" />
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#F59E0B] border-2 border-[#1A1D1A] rounded-full"></div>
                    </div>
                    <div className="overflow-hidden">
                      <div className="font-black text-[14px] truncate text-white uppercase tracking-tight leading-tight">{product.title}</div>
                      <div className="text-[10px] text-[#F59E0B] font-black uppercase tracking-widest mt-1">
                        {product.price} ₽ • {product.unit}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button onClick={() => onEdit(product)} className="p-3.5 bg-white/5 border border-white/10 rounded-2xl text-white active:scale-90 transition-transform">
                      <Edit3 size={18} />
                    </button>
                    <button onClick={() => onDelete(product.id)} className="p-3.5 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 active:scale-90 transition-transform">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'moderation' && (
          <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95">
             <div className="relative mb-8">
                <div className="absolute inset-0 bg-[#F59E0B]/10 blur-3xl rounded-full"></div>
                <div className="w-20 h-20 bg-[#1A1D1A] rounded-[28px] flex items-center justify-center border border-white/5 shadow-2xl relative z-10">
                   <CheckCircle size={32} className="text-[#F59E0B]" />
                </div>
             </div>
             <h4 className="font-black uppercase tracking-[0.2em] text-sm mb-2">Все спокойно</h4>
             <p className="text-[11px] text-gray-500 font-medium leading-relaxed">Новых заказов или сообщений пока нет.<br/>Отдыхайте!</p>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
             <div className="grid grid-cols-3 gap-3">
                {stats.map((s, i) => (
                  <div key={i} className={`bg-[#1A1D1A] border border-white/5 p-5 rounded-3xl text-center shadow-2xl ${s.glow}`}>
                    <div className="flex justify-center mb-3 text-gray-500">{s.icon}</div>
                    <div className="text-2xl font-black text-white tracking-tighter italic mb-1">{s.value}</div>
                    <div className="text-[8px] text-gray-600 font-black uppercase tracking-widest leading-none">{s.label}</div>
                  </div>
                ))}
             </div>

             <div className="bg-[#1A1D1A] border border-white/5 p-7 rounded-[38px] shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6 opacity-10">
                   <OwlLogo size={60} />
                </div>
                <div className="flex items-center gap-2 mb-8">
                   <Sparkles size={14} className="text-[#F59E0B]" />
                   <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Активность продаж</h4>
                </div>
                <div className="flex items-end justify-between h-40 gap-3">
                   {[40, 75, 45, 95, 60, 85, 100].map((h, i) => (
                     <div key={i} className="flex-1 group relative h-full flex flex-col justify-end">
                        <div 
                          style={{ height: `${h}%` }} 
                          className="bg-gradient-to-t from-[#F59E0B]/5 via-[#F59E0B]/40 to-[#F59E0B] rounded-2xl w-full transition-all duration-700 group-hover:scale-y-110 shadow-lg shadow-amber-500/10"
                        ></div>
                        <div className="mt-4 text-[9px] font-black text-gray-600 uppercase tracking-tighter text-center">
                          {['Пн','Вт','Ср','Чт','Пт','Сб','Вс'][i]}
                        </div>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, label, icon }: any) => (
  <button 
    onClick={onClick}
    className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all duration-300 ${active ? 'bg-[#0F110F] text-[#F59E0B] shadow-xl border border-white/10 scale-105' : 'text-gray-600'}`}
  >
    {icon}
    {label}
  </button>
);

export default AdminDashboardView;
