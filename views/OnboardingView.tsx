
import React, { useState, useMemo, useEffect } from 'react';
import { MapPin, ChevronRight, Search, Wheat, ShoppingBag, Truck, Sparkles, ArrowLeft, Navigation, Edit3 } from 'lucide-react';
import OwlLogo from '../components/OwlLogo';
import { REGIONS_DATA, RegionData } from '../locations';

interface OnboardingViewProps {
  onComplete: (region: string) => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'intro' | 'region' | 'district' | 'manual'>('intro');
  const [selectedRegion, setSelectedRegion] = useState<RegionData | null>(null);
  const [search, setSearch] = useState('');
  const [manualLocation, setManualLocation] = useState('');
  const [isLocating, setIsLocating] = useState(false);

  // Универсальный поиск: ищет и по регионам, и по районам внутри них
  const filteredRegions = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!query) return REGIONS_DATA;
    
    return REGIONS_DATA.filter(reg => {
      const matchRegion = reg.name.toLowerCase().includes(query);
      const matchDistrict = reg.districts.some(d => d.toLowerCase().includes(query));
      return matchRegion || matchDistrict;
    });
  }, [search]);

  const filteredDistricts = useMemo(() => {
    const query = search.toLowerCase().trim();
    if (!selectedRegion) return [];
    if (!query) return selectedRegion.districts;
    return selectedRegion.districts.filter(dist => dist.toLowerCase().includes(query));
  }, [search, selectedRegion]);

  const handleRegionSelect = (region: RegionData) => {
    setSelectedRegion(region);
    setSearch('');
    setStep('district');
  };

  const handleDistrictSelect = (district: string) => {
    if (selectedRegion) {
      onComplete(`${district}, ${selectedRegion.name}`);
    }
  };

  const handleGeoLocation = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Имитация геокодинга для MVP
          onComplete("Ваша локация (авто)");
          setIsLocating(false);
        },
        () => {
          alert("Не удалось определить местоположение. Выберите вручную.");
          setIsLocating(false);
        }
      );
    } else {
      alert("Геолокация не поддерживается вашим устройством");
      setIsLocating(false);
    }
  };

  if (step === 'intro') {
    return (
      <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-[#0F110F] text-white">
        <div className="flex-1 flex flex-col items-center justify-center w-full max-w-sm text-center">
          <div className="relative mb-10 group">
            <div className="absolute inset-0 bg-amber-500/20 blur-[70px] rounded-full group-hover:bg-amber-500/30 transition-all duration-700"></div>
            <OwlLogo size={140} className="relative z-10 animate-bounce-slow" />
          </div>
          
          <div className="relative z-10 mb-10">
            <h1 className="text-5xl font-black text-white mb-2 tracking-tighter italic uppercase">
              Ферма<span className="text-[#F59E0B]">Рядом</span>
            </h1>
            <div className="flex items-center justify-center gap-1.5 mb-4">
              <Sparkles size={14} className="text-amber-500" />
              <span className="text-[11px] font-black uppercase tracking-[0.3em] text-gray-500">Мудрый выбор продуктов</span>
            </div>
            <p className="text-gray-400 text-base font-medium leading-relaxed px-4">
              Прямая связь фермеров и покупателей.<br/>Натуральное без магазинных наценок.
            </p>
          </div>

          <div className="w-full space-y-5 text-left">
            <IntroFeature icon={<ShoppingBag size={24} className="text-amber-500" />} title="Для покупателей" desc="Свежайшие продукты от соседа-фермера с доставкой." />
            <IntroFeature icon={<Truck size={24} className="text-amber-500" />} title="Для хозяйственников" desc="Продавайте излишки урожая и живность по всей стране." />
          </div>
        </div>

        <div className="w-full max-w-sm space-y-6 pb-12 mt-10">
          <button onClick={() => setStep('region')} className="w-full bg-[#F59E0B] text-black py-7 rounded-[28px] font-black uppercase tracking-widest text-base shadow-[0_25px_50px_-10px_rgba(245,158,11,0.5)] active:scale-95 transition-all transform hover:scale-[1.02]">
            Войти на рынок
          </button>
        </div>
      </div>
    );
  }

  if (step === 'manual') {
    return (
      <div className="flex flex-col items-center justify-start min-h-screen p-6 bg-[#0F110F] text-white pt-20">
        <button onClick={() => setStep('region')} className="self-start mb-8 p-3 bg-white/5 rounded-2xl active:bg-white/10 transition-all"><ArrowLeft size={24} className="text-amber-500" /></button>
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic mb-2 self-start">Свой город</h2>
        <p className="text-gray-500 text-[11px] font-black mb-10 uppercase tracking-[0.2em] self-start">Введите название населенного пункта</p>
        
        <input 
          autoFocus
          type="text" 
          value={manualLocation}
          onChange={(e) => setManualLocation(e.target.value)}
          placeholder="Напр. хутор Веселый"
          className="w-full bg-[#1A1D1A] border border-white/10 rounded-3xl py-6 px-8 text-xl focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 transition-all text-white font-bold mb-8"
        />

        <button 
          onClick={() => manualLocation && onComplete(manualLocation)}
          disabled={!manualLocation}
          className="w-full bg-[#F59E0B] disabled:opacity-30 disabled:grayscale text-black py-6 rounded-[28px] font-black uppercase tracking-widest text-base shadow-xl active:scale-95 transition-all"
        >
          Подтвердить
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-6 bg-[#0F110F] text-white">
      <div className="flex-1 flex flex-col items-center justify-start w-full max-w-sm text-center pt-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="mb-8"><OwlLogo size={80} /></div>
        
        <div className="flex items-center gap-3 mb-2">
          {step === 'district' && (
            <button onClick={() => { setStep('region'); setSearch(''); }} className="p-2 bg-white/5 rounded-xl active:bg-white/10"><ArrowLeft size={18} className="text-amber-500" /></button>
          )}
          <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">
            {step === 'region' ? 'Где вы?' : selectedRegion?.name}
          </h2>
        </div>
        
        <div className="w-full space-y-4">
          <div className="flex gap-2">
             <div className="relative flex-1 group">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600" size={20} />
                <input 
                  type="text" 
                  placeholder={step === 'region' ? "Регион или город..." : "Поиск района..."}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#1A1D1A] border border-white/10 rounded-3xl py-5 pl-14 pr-4 text-base focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/30 transition-all text-white font-bold"
                />
              </div>
              <button 
                onClick={handleGeoLocation}
                className={`w-14 h-14 bg-[#1A1D1A] border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 active:bg-amber-500 active:text-black transition-all ${isLocating ? 'animate-pulse' : ''}`}
              >
                <Navigation size={20} />
              </button>
          </div>

          <div className="space-y-1 w-full max-h-[45vh] overflow-y-auto hide-scrollbar rounded-[32px] border border-white/5 bg-[#1A1D1A] shadow-2xl">
            {step === 'region' ? (
              <>
                <button onClick={() => setStep('manual')} className="w-full text-left p-5 flex items-center justify-between border-b border-white/5 active:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-5">
                       <Edit3 size={18} className="text-amber-500" />
                       <span className="text-base font-bold text-amber-500 uppercase tracking-tight">Ввести свой вариант</span>
                    </div>
                </button>
                {filteredRegions.length > 0 ? (
                  filteredRegions.map((reg) => (
                    <button key={reg.name} onClick={() => handleRegionSelect(reg)} className="w-full text-left p-5 flex items-center justify-between border-b border-white/5 last:border-0 active:bg-white/5 transition-colors group">
                      <div className="flex items-center gap-5">
                         <MapPin size={18} className="text-gray-600 group-active:text-amber-500" />
                         <span className="text-base font-bold text-white uppercase tracking-tight">{reg.name}</span>
                      </div>
                      <ChevronRight size={18} className="text-gray-800" />
                    </button>
                  ))
                ) : (
                  <div className="p-14 text-center text-gray-600 font-bold uppercase text-xs tracking-widest">Ничего не найдено</div>
                )}
              </>
            ) : (
              filteredDistricts.length > 0 ? (
                filteredDistricts.map((dist) => (
                  <button key={dist} onClick={() => handleDistrictSelect(dist)} className="w-full text-left p-5 flex items-center justify-between border-b border-white/5 last:border-0 active:bg-white/5 transition-colors group">
                    <div className="flex items-center gap-5">
                       <Wheat size={18} className="text-amber-500" />
                       <span className="text-base font-bold text-amber-100 uppercase tracking-tight">{dist}</span>
                    </div>
                    <ChevronRight size={18} className="text-gray-800" />
                  </button>
                ))
              ) : (
                <div className="p-14 text-center text-gray-600 font-bold uppercase text-xs tracking-widest">Район не найден</div>
              )
            )}
          </div>
        </div>
      </div>
      
      <button onClick={() => setStep('intro')} className="mb-12 text-gray-600 font-black uppercase tracking-widest text-[11px] active:text-white transition-colors">Вернуться назад</button>
    </div>
  );
};

const IntroFeature = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="flex items-start gap-5 p-6 rounded-[38px] bg-[#1A1D1A] border border-white/5 hover:bg-white/5 transition-colors group">
    <div className="mt-0.5 bg-amber-500/10 p-3 rounded-2xl group-hover:bg-amber-500/20 transition-colors shrink-0">{icon}</div>
    <div><div className="font-black text-base text-white uppercase tracking-tight mb-1">{title}</div><div className="text-[13px] text-gray-500 font-medium leading-relaxed">{desc}</div></div>
  </div>
);

export default OnboardingView;
