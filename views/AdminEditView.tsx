
import React, { useState } from 'react';
import { ChevronLeft, Save, AlertCircle } from 'lucide-react';
import { Product } from '../types';

interface AdminEditViewProps {
  product: Product;
  onSave: (updated: Product) => void;
  onCancel: () => void;
}

const AdminEditView: React.FC<AdminEditViewProps> = ({ product, onSave, onCancel }) => {
  const [formData, setFormData] = useState({ ...product });

  const handleSave = () => {
    onSave(formData);
  };

  return (
    <div className="bg-[#0F110F] min-h-screen text-white pb-32">
      <div className="px-6 pt-14 pb-8 sticky top-0 bg-[#0F110F]/90 backdrop-blur-2xl border-b border-white/5 z-30 flex items-center justify-between">
        <button onClick={onCancel} className="bg-[#1A1D1A] p-3 rounded-2xl border border-white/10 active:scale-90 transition-transform">
          <ChevronLeft size={20} className="text-gray-400" />
        </button>
        <div className="text-center">
           <span className="font-black uppercase tracking-widest text-[10px] text-gray-500 block mb-0.5">Режим правки</span>
           <span className="font-black text-white italic tracking-tighter">Настройки товара</span>
        </div>
        <button 
          onClick={handleSave}
          className="bg-[#F59E0B] p-3 rounded-2xl text-black active:scale-90 transition-transform shadow-lg shadow-amber-500/20"
        >
          <Save size={20} strokeWidth={3} />
        </button>
      </div>

      <div className="p-6 space-y-10 animate-in fade-in slide-in-from-bottom-6 duration-500">
        <div className="bg-[#F59E0B]/5 border border-[#F59E0B]/10 p-6 rounded-[32px] flex gap-4 items-start relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-[#F59E0B]"></div>
          <AlertCircle size={24} className="text-[#F59E0B] shrink-0" />
          <p className="text-[12px] text-amber-100/60 font-medium leading-relaxed">
            Изменения вступят в силу мгновенно. Проверьте актуальность цены и наличие товара перед сохранением.
          </p>
        </div>

        <div className="space-y-8">
          <InputGroup 
            label="Название вашего товара" 
            value={formData.title} 
            onChange={(v: string) => setFormData({...formData, title: v})} 
          />
          <div className="flex gap-4">
            <div className="flex-1">
              <InputGroup 
                label="Цена (₽)" 
                type="number" 
                value={formData.price} 
                onChange={(v: any) => setFormData({...formData, price: Number(v)})} 
              />
            </div>
            <div className="flex-1">
              <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">Мера</label>
              <select 
                value={formData.unit}
                onChange={(e) => setFormData({...formData, unit: e.target.value})}
                className="w-full bg-[#1A1D1A] border border-white/10 rounded-3xl p-5 text-white focus:ring-2 focus:ring-[#F59E0B]/20 outline-none font-black appearance-none"
              >
                <option>кг</option>
                <option>литр</option>
                <option>шт</option>
                <option>м³</option>
                <option>мешок</option>
                <option>голова</option>
              </select>
            </div>
          </div>
          <InputGroup 
            label="Подробное описание" 
            multiline 
            value={formData.description} 
            onChange={(v: string) => setFormData({...formData, description: v})} 
          />
          <InputGroup 
            label="Ссылка на новое фото" 
            value={formData.image} 
            onChange={(v: string) => setFormData({...formData, image: v})} 
          />
        </div>

        <div className="pt-6">
           <button 
              onClick={handleSave}
              className="w-full bg-[#F59E0B] text-black py-5 rounded-[24px] font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_-10px_rgba(245,158,11,0.3)] active:scale-95 transition-all"
            >
              Сохранить изменения
            </button>
        </div>
      </div>
    </div>
  );
};

const InputGroup = ({ label, placeholder, type = "text", multiline = false, value, onChange }: any) => (
  <div>
    <label className="block text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">{label}</label>
    {multiline ? (
      <textarea 
        rows={4} 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1A1D1A] border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-700 focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all font-medium leading-relaxed" 
      />
    ) : (
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1A1D1A] border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-700 focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all font-black" 
      />
    )}
  </div>
);

export default AdminEditView;
