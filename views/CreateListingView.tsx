
import React, { useState } from 'react';
import { Camera, ChevronRight, CheckCircle, Info, X, Sparkles } from 'lucide-react';
import { Product, TelegramUser, CategoryType } from '../types';
import OwlLogo from '../components/OwlLogo';

interface CreateListingViewProps {
  onCancel: () => void;
  onSuccess: (product: Product) => void;
  region: string;
  user: TelegramUser | null;
}

const CreateListingView: React.FC<CreateListingViewProps> = ({ onCancel, onSuccess, region, user }) => {
  const [step, setStep] = useState(1);
  const [type, setType] = useState<CategoryType>('products');
  const [formData, setFormData] = useState({
    title: '',
    price: '',
    unit: 'кг',
    description: '',
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?auto=format&fit=crop&q=80&w=600'
  });

  const totalSteps = 4;

  const handleFinish = () => {
    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title || 'Новый товар',
      price: Number(formData.price) || 0,
      unit: formData.unit,
      location: region,
      category: 'crafts',
      type: type,
      image: formData.image,
      description: formData.description || 'Нет описания',
      seller: {
        name: user?.first_name || 'Продавец',
        rating: 5.0,
        phone: '+70000000000',
        username: user?.username || 'user'
      }
    };
    onSuccess(newProduct);
  };

  return (
    <div className="px-6 pt-6 bg-[#0F110F] min-h-screen text-white pb-24">
      {/* Header with Step Indicator */}
      <div className="flex justify-between items-center mb-8 pt-8">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
             <Sparkles size={12} className="text-[#F59E0B]" />
             <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Новое предложение</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter italic">Создать</h2>
        </div>
        <button onClick={onCancel} className="bg-[#1A1D1A] w-12 h-12 rounded-2xl border border-white/10 flex items-center justify-center text-gray-500 active:scale-90 transition-transform">
          <X size={20} />
        </button>
      </div>

      {/* Progressive Stepper */}
      <div className="flex gap-2 mb-12 bg-[#1A1D1A] p-1.5 rounded-full border border-white/5">
        {[...Array(totalSteps)].map((_, i) => (
          <div 
            key={i} 
            className={`h-2 flex-1 rounded-full transition-all duration-700 ${i + 1 <= step ? 'bg-[#F59E0B] shadow-[0_0_10px_rgba(245,158,11,0.5)]' : 'bg-white/5'}`}
          />
        ))}
      </div>

      {/* Step 1: Category Selection */}
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
          <p className="text-[10px] font-black text-center text-gray-600 uppercase tracking-[0.2em] mb-8">Что выставим на продажу?</p>
          <div className="grid grid-cols-1 gap-5">
            <CategorySelectButton 
              emoji="🥛" 
              title="Продукты" 
              desc="Сыры, мясо, овощи" 
              onClick={() => { setType('products'); setStep(2); }} 
            />
            <CategorySelectButton 
              emoji="🐑" 
              title="Живность" 
              desc="Скот, птица, пчелы" 
              onClick={() => { setType('livestock'); setStep(2); }} 
            />
            <CategorySelectButton 
              emoji="🔨" 
              title="Хозяйство" 
              desc="Корма, дрова, декор" 
              onClick={() => { setType('farm'); setStep(2); }} 
            />
          </div>
        </div>
      )}

      {/* Step 2: Media Capture */}
      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-500">
          <p className="text-[10px] font-black text-center text-gray-600 uppercase tracking-[0.2em] mb-8">Фото привлекает покупателей</p>
          <div className="grid grid-cols-1 gap-4 mb-8">
            <button className="aspect-square bg-[#1A1D1A] border-2 border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center text-gray-600 gap-4 active:bg-white/10 transition-colors shadow-2xl group">
               <div className="bg-amber-500/5 p-8 rounded-full group-active:scale-90 transition-transform">
                  <Camera size={48} className="text-amber-500/20" />
               </div>
               <span className="text-[10px] font-black uppercase tracking-[0.3em]">Сделать снимок</span>
            </button>
          </div>
          <button 
            onClick={() => setStep(3)}
            className="w-full bg-[#F59E0B] text-black py-5.5 rounded-3xl font-black uppercase tracking-widest text-sm mt-12 shadow-[0_20px_40px_-10px_rgba(245,158,11,0.3)] active:scale-95 transition-all"
          >
            К описанию
          </button>
        </div>
      )}

      {/* Step 3: Details */}
      {step === 3 && (
        <div className="animate-in fade-in slide-in-from-bottom-6 duration-500 space-y-8">
          <p className="text-[10px] font-black text-center text-gray-600 uppercase tracking-[0.2em] mb-2">Заполните детали</p>
          <div className="space-y-6">
            <InputGroup 
              label="Название товара" 
              placeholder="Напр. Свежий мед 2024" 
              value={formData.title} 
              onChange={(v: string) => setFormData({...formData, title: v})}
            />
            <div className="flex gap-4">
              <div className="flex-[2]">
                <InputGroup 
                  label="Цена (₽)" 
                  placeholder="0.00" 
                  type="number" 
                  value={formData.price}
                  onChange={(v: string) => setFormData({...formData, price: v})}
                />
              </div>
              <div className="flex-1">
                 <label className="block text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 ml-1">Мера</label>
                 <select className="w-full bg-[#1A1D1A] border border-white/10 rounded-2xl py-5 px-3 font-black text-white focus:ring-2 focus:ring-amber-500/20 outline-none appearance-none">
                    <option>кг</option>
                    <option>л</option>
                    <option>шт</option>
                    <option>гол</option>
                 </select>
              </div>
            </div>
            <InputGroup 
              label="Описание" 
              placeholder="Расскажите о качестве..." 
              multiline 
              value={formData.description}
              onChange={(v: string) => setFormData({...formData, description: v})}
            />
          </div>
          <button 
            onClick={() => setStep(4)}
            className="w-full bg-[#F59E0B] text-black py-5.5 rounded-3xl font-black uppercase tracking-widest text-sm shadow-[0_20px_40px_-10px_rgba(245,158,11,0.3)] active:scale-95 transition-all"
          >
            Опубликовать
          </button>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="flex flex-col items-center justify-center py-24 text-center animate-in zoom-in-95 duration-500">
          <div className="relative mb-12">
            <div className="absolute inset-0 bg-amber-500/20 blur-[60px] rounded-full"></div>
            <div className="w-32 h-32 bg-[#1A1D1A] rounded-[48px] flex items-center justify-center border border-amber-500/20 relative z-10 shadow-2xl">
              <OwlLogo size={72} />
            </div>
          </div>
          <h3 className="text-4xl font-black text-[#F59E0B] mb-4 tracking-tighter italic uppercase">Мудро!</h3>
          <p className="text-gray-500 mb-20 text-sm font-medium leading-relaxed px-10">Ваше предложение уже на витрине.<br/>Ждите первых сообщений в Telegram.</p>
          <button 
            onClick={handleFinish}
            className="w-full bg-white text-black py-5.5 rounded-3xl font-black uppercase tracking-widest text-xs active:scale-95 transition-all shadow-xl"
          >
            Вернуться на рынок
          </button>
        </div>
      )}
    </div>
  );
};

const CategorySelectButton = ({ emoji, title, desc, onClick }: any) => (
  <button onClick={onClick} className="bg-[#1A1D1A] border border-white/5 p-7 rounded-[38px] flex items-center justify-between active:bg-[#F59E0B]/5 active:scale-[0.98] transition-all group shadow-xl">
    <div className="flex items-center gap-6">
      <div className="w-20 h-20 bg-[#0F110F] rounded-[28px] flex items-center justify-center text-4xl border border-white/10 group-active:border-[#F59E0B]/30 transition-all shadow-inner">{emoji}</div>
      <div className="text-left">
        <div className="font-black text-white text-xl tracking-tighter italic mb-1 uppercase leading-none">{title}</div>
        <div className="text-[11px] font-black text-gray-500 uppercase tracking-widest">{desc}</div>
      </div>
    </div>
    <div className="bg-white/5 p-3 rounded-2xl group-active:bg-amber-500 transition-colors">
       <ChevronRight size={22} className="text-gray-700 group-active:text-black" />
    </div>
  </button>
);

const InputGroup = ({ label, placeholder, type = "text", multiline = false, value, onChange }: any) => (
  <div>
    <label className="block text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3 ml-1">{label}</label>
    {multiline ? (
      <textarea 
        rows={4} 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1A1D1A] border border-white/10 rounded-3xl p-6 text-white placeholder:text-gray-700 focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all font-medium leading-relaxed shadow-inner" 
      />
    ) : (
      <input 
        type={type} 
        placeholder={placeholder} 
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-[#1A1D1A] border border-white/10 rounded-3xl py-5.5 px-6 text-white placeholder:text-gray-700 focus:ring-2 focus:ring-[#F59E0B]/20 outline-none transition-all font-black shadow-inner" 
      />
    )}
  </div>
);

export default CreateListingView;
