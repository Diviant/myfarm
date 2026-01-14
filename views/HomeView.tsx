
import React, { useState } from 'react';
import { Search, SlidersHorizontal, Sparkles, MapPin } from 'lucide-react';
import { CategoryType, Product } from '../types';
import { CATEGORIES_PRODUCTS, CATEGORIES_LIVESTOCK, CATEGORIES_FARM } from '../constants';
import ProductCard from '../components/ProductCard';
import OwlLogo from '../components/OwlLogo';

interface HomeViewProps {
  onProductClick: (product: Product) => void;
  products: Product[];
  currentRegion: string | null;
}

const HomeView: React.FC<HomeViewProps> = ({ onProductClick, products, currentRegion }) => {
  const [activeTab, setActiveTab] = useState<CategoryType>('products');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const currentCategories = activeTab === 'products' ? CATEGORIES_PRODUCTS : activeTab === 'livestock' ? CATEGORIES_LIVESTOCK : CATEGORIES_FARM;
  
  const filteredProducts = products.filter(p => {
    const matchesTab = p.type === activeTab;
    const matchesCategory = activeCategory ? p.category === activeCategory : true;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Если регион выбран, мы все равно показываем все товары (чтобы витрина не была пустой),
    // но визуально можем их разделять. Для MVP просто оставим фильтрацию по категории/типу.
    return matchesTab && matchesCategory && matchesSearch;
  }).sort((a, b) => {
    // Приоритет товарам из текущего региона
    if (currentRegion) {
      const aIsLocal = a.location.toLowerCase().includes(currentRegion.toLowerCase());
      const bIsLocal = b.location.toLowerCase().includes(currentRegion.toLowerCase());
      if (aIsLocal && !bIsLocal) return -1;
      if (!aIsLocal && bIsLocal) return 1;
    }
    return 0;
  });

  return (
    <div className="px-4 pt-4 bg-[#0F110F]">
      <div className="mb-8 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/20 to-transparent blur-[40px] opacity-50"></div>
        <div className="relative bg-[#1A1D1A] border border-white/5 p-6 rounded-[38px] flex items-center justify-between shadow-2xl">
          <div className="relative z-10">
             <div className="flex items-center gap-1.5 mb-2">
                <Sparkles size={12} className="text-[#F59E0B]" />
                <span className="text-[9px] font-black text-[#F59E0B] uppercase tracking-[0.2em]">Рынок поблизости</span>
             </div>
             <h2 className="text-2xl font-black text-white tracking-tighter leading-none mb-1">
               {currentRegion ? currentRegion.split(',')[0] : 'Ваш регион'}
             </h2>
             <p className="text-[11px] font-medium text-gray-500">Натуральные продукты рядом с вами</p>
          </div>
          <div className="opacity-40 -mr-4"><OwlLogo size={80} /></div>
        </div>
      </div>

      <div className="flex gap-2 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input 
            type="text" 
            placeholder="Что ищем сегодня?" 
            className="w-full bg-[#1A1D1A] border border-white/10 rounded-3xl py-4.5 pl-13 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/20 transition-all text-white placeholder:text-gray-600 font-bold"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button className="bg-[#1A1D1A] border border-white/10 w-14 rounded-3xl flex items-center justify-center text-[#F59E0B] active:scale-95 transition-transform shadow-lg"><SlidersHorizontal size={20} /></button>
      </div>

      <div className="flex bg-[#1A1D1A] p-1.5 rounded-[28px] border border-white/5 mb-8">
        <TabItem active={activeTab === 'products'} label="Продукты" onClick={() => { setActiveTab('products'); setActiveCategory(null); }} />
        <TabItem active={activeTab === 'livestock'} label="Живность" onClick={() => { setActiveTab('livestock'); setActiveCategory(null); }} />
        <TabItem active={activeTab === 'farm'} label="Хозяйство" onClick={() => { setActiveTab('farm'); setActiveCategory(null); }} />
      </div>

      <div className="flex overflow-x-auto gap-3 pb-8 -mx-4 px-4 hide-scrollbar">
        <button onClick={() => setActiveCategory(null)} className={`flex-shrink-0 px-7 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${!activeCategory ? 'bg-[#F59E0B] text-black border-transparent shadow-xl' : 'bg-[#1A1D1A] text-gray-500 border-white/5'}`}>Все</button>
        {currentCategories.map(cat => (
          <button key={cat.id} onClick={() => setActiveCategory(cat.id)} className={`flex-shrink-0 flex items-center gap-2 px-7 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border ${activeCategory === cat.id ? 'bg-[#F59E0B] text-black border-transparent shadow-xl' : 'bg-[#1A1D1A] text-gray-500 border-white/5'}`}>{cat.label}</button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 pb-12">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} onClick={onProductClick} />
          ))
        ) : (
          <div className="col-span-2 py-24 text-center">
            <div className="relative inline-block mb-6"><div className="absolute inset-0 bg-[#F59E0B]/5 blur-3xl rounded-full"></div><OwlLogo size={48} className="relative z-10 opacity-20 mx-auto" color="#FFF" /></div>
            <p className="text-gray-500 font-black uppercase tracking-widest text-xs mb-1">Пусто в амбаре</p>
          </div>
        )}
      </div>
    </div>
  );
};

const TabItem = ({ active, label, onClick }: any) => (
  <button onClick={onClick} className={`flex-1 py-3.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${active ? 'bg-[#0F110F] text-[#F59E0B] border border-white/10 shadow-lg' : 'text-gray-500'}`}>{label}</button>
);

export default HomeView;
