
import React from 'react';
import { MessageSquare, ChevronRight, Sparkles } from 'lucide-react';
import { Chat } from '../types';
import OwlLogo from '../components/OwlLogo';

interface MessagesViewProps {
  chats: Chat[];
  onChatClick: (chatId: string) => void;
}

const MessagesView: React.FC<MessagesViewProps> = ({ chats, onChatClick }) => {
  return (
    <div className="px-6 pt-6 bg-[#0F110F] min-h-screen text-white pb-24">
      <div className="flex items-center justify-between mb-8 pt-6">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
             <Sparkles size={12} className="text-[#F59E0B]" />
             <span className="text-[9px] font-black text-gray-500 uppercase tracking-[0.3em]">Личные сообщения</span>
          </div>
          <h2 className="text-3xl font-black text-white tracking-tighter italic uppercase">Чаты</h2>
        </div>
        <div className="opacity-40">
           <OwlLogo size={40} />
        </div>
      </div>

      {chats.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="w-20 h-20 bg-[#1A1D1A] rounded-[28px] flex items-center justify-center border border-white/5 mb-6 opacity-30">
            <MessageSquare size={32} className="text-gray-500" />
          </div>
          <p className="text-gray-500 font-black uppercase tracking-widest text-[10px] mb-2">Переписок пока нет</p>
          <p className="text-[11px] text-gray-600 font-medium leading-relaxed px-10">
            Начните общение с фермерами прямо на странице интересующего товара.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {chats.map(chat => (
            <button 
              key={chat.id}
              onClick={() => onChatClick(chat.id)}
              className="w-full bg-[#1A1D1A] border border-white/5 p-4 rounded-[28px] flex items-center gap-4 active:scale-[0.98] transition-all group relative overflow-hidden"
            >
              <div className="relative flex-shrink-0">
                 <img src={chat.productImage} className="w-14 h-14 rounded-2xl object-cover grayscale-[30%] group-hover:grayscale-0 transition-all" alt="" />
                 <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#F59E0B] rounded-full flex items-center justify-center border-2 border-[#1A1D1A] text-[10px] font-black text-black">
                   {chat.participant.name.charAt(0)}
                 </div>
              </div>
              <div className="flex-1 text-left overflow-hidden">
                <div className="flex justify-between items-start mb-0.5">
                   <h4 className="font-black text-white text-sm uppercase tracking-tight truncate max-w-[150px] italic">{chat.participant.name}</h4>
                   <span className="text-[9px] font-bold text-gray-600 uppercase">12:30</span>
                </div>
                <div className="text-[11px] font-bold text-[#F59E0B] truncate mb-0.5">{chat.productTitle}</div>
                <p className="text-[11px] text-gray-500 truncate">{chat.lastMessage}</p>
              </div>
              <ChevronRight size={16} className="text-gray-800 group-active:text-[#F59E0B]" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagesView;
