
import React from 'react';
import { MapPin, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const typeColor = product.type === 'products' ? 'text-amber-400' : product.type === 'livestock' ? 'text-orange-400' : 'text-stone-400';

  return (
    <div 
      onClick={() => onClick(product)}
      className="bg-[#1A1D1A] rounded-[32px] overflow-hidden shadow-2xl border border-white/5 active:scale-[0.96] transition-all duration-300 group"
    >
      <div className="relative aspect-square">
        <img 
          src={product.image} 
          alt={product.title} 
          className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
          <Star size={10} fill="#F59E0B" className="text-[#F59E0B]" />
          <span className="text-[10px] font-black text-white">{product.seller.rating}</span>
        </div>
      </div>
      <div className="p-4 flex flex-col h-[130px]">
        <h3 className="font-bold text-[14px] leading-tight line-clamp-2 text-white mb-2">{product.title}</h3>
        
        <div className="mt-auto">
          <div className="flex items-center gap-1 text-gray-500 text-[10px] font-bold uppercase tracking-tighter mb-2">
            <MapPin size={10} className="text-[#F59E0B]" />
            <span className="truncate">{product.location}</span>
          </div>
          
          <div className="text-[#F59E0B] font-black text-lg tracking-tighter leading-none">
            {product.price}<span className="text-[10px] font-bold text-gray-500 uppercase ml-1 tracking-widest">₽/{product.unit}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
