
import React from 'react';
import { ChevronLeft, MessageCircle, Share2, ShieldCheck, Heart } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailViewProps {
  product: Product;
  onBack: () => void;
  onChatStart: () => void;
}

const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, onBack, onChatStart }) => {
  return (
    <div className="bg-[#0F110F] min-h-screen text-white">
      {/* Top Bar Over Image */}
      <div className="fixed top-4 left-4 right-4 flex justify-between items-center z-50">
        <button 
          onClick={onBack}
          className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 active:scale-90 transition-transform"
        >
          <ChevronLeft size={20} className="text-white" />
        </button>
        <div className="flex gap-2">
          <button className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 active:scale-90 transition-transform">
            <Heart size={20} className="text-red-400" />
          </button>
          <button className="bg-black/40 backdrop-blur-md p-3 rounded-2xl border border-white/10 active:scale-90 transition-transform">
            <Share2 size={20} className="text-white" />
          </button>
        </div>
      </div>

      {/* Product Photo */}
      <div className="relative aspect-square overflow-hidden bg-[#1A1D1A]">
        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F110F] via-transparent to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative -mt-16 bg-[#0F110F] rounded-t-[40px] p-6 shadow-[0_-30px_60px_rgba(0,0,0,0.8)] border-t border-white/5">
        <div className="mb-6">
          <div className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500 mb-2">
            {product.location}
          </div>
          <h1 className="text-3xl font-black text-white leading-none mb-4 tracking-tighter">{product.title}</h1>
          <div className="text-3xl font-black text-[#F59E0B] tracking-tight">
            {product.price} <span className="text-sm font-bold text-gray-500 uppercase tracking-widest ml-1">₽/{product.unit}</span>
          </div>
        </div>

        <div className="h-px bg-white/5 w-full mb-8"></div>

        {/* Livestock details */}
        {product.type === 'livestock' && product.details && (
          <div className="grid grid-cols-2 gap-2 mb-8">
            <DetailItem label="Возраст" value={product.details.age} />
            <DetailItem label="Порода" value={product.details.breed} />
            <DetailItem label="Пол" value={product.details.gender} />
            <div className="bg-[#1A1D1A] p-4 rounded-2xl border border-white/5 flex items-center justify-between">
              <div>
                <span className="block text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">Прививки</span>
                <span className="font-bold text-sm text-gray-200">{product.details.vaccinated ? 'Есть' : 'Нет'}</span>
              </div>
              {product.details.vaccinated && <ShieldCheck size={18} className="text-[#F59E0B]" />}
            </div>
          </div>
        )}

        {/* Description */}
        <section className="mb-8">
          <h3 className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] mb-3">О товаре</h3>
          <p className="text-gray-400 leading-relaxed text-[15px]">
            {product.description}
          </p>
        </section>

        {/* Seller Info */}
        <section className="bg-[#1A1D1A] p-6 rounded-3xl border border-white/5 mb-32">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-14 h-14 bg-[#0F110F] rounded-2xl flex items-center justify-center font-black text-[#F59E0B] text-xl border border-white/5">
              {product.seller.name.charAt(0)}
            </div>
            <div>
              <div className="font-black text-white tracking-tight">{product.seller.name}</div>
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-gray-500 mt-1">
                <span className="text-[#F59E0B]">★ {product.seller.rating}</span>
                <span className="opacity-30">•</span>
                <span>Местный фермер</span>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Persistent CTA - Midnight Style */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0F110F]/80 backdrop-blur-2xl border-t border-white/5 safe-bottom z-50">
        <button 
          onClick={onChatStart}
          className="w-full bg-[#F59E0B] text-black py-5 rounded-2xl font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl shadow-amber-950/20 active:scale-[0.98] transition-all"
        >
          <MessageCircle size={20} strokeWidth={2.5} />
          Написать фермеру
        </button>
      </div>
    </div>
  );
};

const DetailItem = ({ label, value }: { label: string, value?: string }) => (
  <div className="bg-[#1A1D1A] p-4 rounded-2xl border border-white/5">
    <span className="block text-[9px] text-gray-500 font-black uppercase tracking-widest mb-1">{label}</span>
    <span className="font-bold text-sm text-gray-200 truncate block">{value || '—'}</span>
  </div>
);

export default ProductDetailView;
