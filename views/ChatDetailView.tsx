
import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, Send, MapPin, MoreHorizontal, ShoppingBag } from 'lucide-react';
import { Chat, TelegramUser } from '../types';

interface ChatDetailViewProps {
  chat: Chat;
  user: TelegramUser | null;
  onBack: () => void;
  onSendMessage: (text: string) => void;
}

const ChatDetailView: React.FC<ChatDetailViewProps> = ({ chat, user, onBack, onSendMessage }) => {
  const [text, setText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chat.messages]);

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text);
    setText('');
  };

  return (
    <div className="bg-[#0F110F] min-h-screen flex flex-col text-white">
      {/* Chat Header */}
      <div className="sticky top-0 z-50 bg-[#0F110F]/90 backdrop-blur-2xl border-b border-white/5 p-4 flex items-center gap-3 pt-12">
        <button onClick={onBack} className="p-2.5 bg-[#1A1D1A] border border-white/10 rounded-2xl active:scale-90 transition-transform">
          <ChevronLeft size={20} />
        </button>
        <div className="flex-1 flex items-center gap-3 overflow-hidden">
           <div className="relative flex-shrink-0">
              <img src={chat.productImage} className="w-10 h-10 rounded-xl object-cover border border-white/5" alt="" />
              <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#F59E0B] rounded-full flex items-center justify-center text-[9px] font-black text-black border-2 border-[#0F110F]">
                 {chat.participant.name.charAt(0)}
              </div>
           </div>
           <div className="overflow-hidden">
              <div className="font-black text-sm uppercase tracking-tight italic truncate">{chat.participant.name}</div>
              <div className="text-[10px] font-bold text-amber-500/70 truncate flex items-center gap-1">
                 <ShoppingBag size={10} />
                 {chat.productTitle}
              </div>
           </div>
        </div>
        <button className="p-2.5 text-gray-600">
           <MoreHorizontal size={20} />
        </button>
      </div>

      {/* Messages List */}
      <div className="flex-1 p-6 space-y-4 overflow-y-auto hide-scrollbar pb-32">
        {chat.messages.map((msg, i) => {
          const isMe = msg.senderId === user?.id || msg.senderId === 'me';
          const isSystem = msg.senderId === 'system';

          if (isSystem) {
            return (
              <div key={msg.id} className="flex justify-center my-4">
                 <div className="bg-white/5 border border-white/5 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest text-gray-500 italic">
                   {msg.text}
                 </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[80%] p-4 rounded-[24px] shadow-2xl relative ${isMe ? 'bg-[#F59E0B] text-black rounded-tr-none' : 'bg-[#1A1D1A] text-white border border-white/5 rounded-tl-none'}`}>
                  <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                  <span className={`text-[8px] font-black uppercase mt-1 block text-right opacity-40`}>
                    12:45
                  </span>
               </div>
            </div>
          );
        })}
        <div ref={scrollRef} />
      </div>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#0F110F]/80 backdrop-blur-2xl border-t border-white/5 safe-bottom">
        <div className="relative flex items-center gap-2">
           <input 
             type="text" 
             placeholder="Введите сообщение..."
             value={text}
             onChange={(e) => setText(e.target.value)}
             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
             className="flex-1 bg-[#1A1D1A] border border-white/10 rounded-2xl py-4.5 pl-6 pr-14 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#F59E0B]/20 transition-all text-white placeholder:text-gray-700"
           />
           <button 
             onClick={handleSend}
             className={`absolute right-2 p-3 rounded-xl transition-all ${text.trim() ? 'bg-[#F59E0B] text-black scale-100 shadow-lg shadow-amber-500/20' : 'bg-transparent text-gray-700 scale-90'}`}
           >
              <Send size={18} strokeWidth={3} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetailView;
