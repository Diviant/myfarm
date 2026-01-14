
import React, { useState, useEffect } from 'react';
import { ViewState, Product, TelegramUser, Chat, Message } from './types';
import Layout from './components/Layout';
import OnboardingView from './views/OnboardingView';
import HomeView from './views/HomeView';
import ProductDetailView from './views/ProductDetailView';
import CreateListingView from './views/CreateListingView';
import ProfileView from './views/ProfileView';
import AdminDashboardView from './views/AdminDashboardView';
import AdminEditView from './views/AdminEditView';
import MessagesView from './views/MessagesView';
import ChatDetailView from './views/ChatDetailView';
import { MOCK_PRODUCTS } from './constants';

declare global {
  interface Window {
    Telegram: {
      WebApp: any;
    };
  }
}

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('onboarding');
  const [region, setRegion] = useState<string | null>(localStorage.getItem('user_region'));
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();
  const [selectedChatId, setSelectedChatId] = useState<string | undefined>();
  const [user, setUser] = useState<TelegramUser | null>(null);
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      
      const tgUser = tg.initDataUnsafe?.user;
      if (tgUser) {
        setUser({
          id: tgUser.id,
          first_name: tgUser.first_name,
          last_name: tgUser.last_name,
          username: tgUser.username,
          photo_url: tgUser.photo_url,
          isAdmin: true 
        });
      } else {
        setUser({
          id: 12345,
          first_name: "Иван Фермер",
          username: "ivan_farmer",
          isAdmin: true
        });
      }

      if (localStorage.getItem('user_region')) {
        setView('home');
      }
    }
  }, []);

  const handleOnboardingComplete = (selectedRegion: string) => {
    setRegion(selectedRegion);
    localStorage.setItem('user_region', selectedRegion);
    setView('home');
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setView('product-detail');
  };

  const startChatWithSeller = (product: Product) => {
    const existingChat = chats.find(c => c.productId === product.id);
    if (existingChat) {
      setSelectedChatId(existingChat.id);
      setView('chat-detail');
    } else {
      const newChat: Chat = {
        id: `chat_${Date.now()}`,
        productId: product.id,
        productTitle: product.title,
        productImage: product.image,
        participant: {
          name: product.seller.name,
          username: product.seller.username,
        },
        messages: [
          {
            id: 'm1',
            senderId: 'system',
            text: `Вы начали переписку по поводу товара "${product.title}"`,
            timestamp: Date.now()
          }
        ],
        lastMessage: 'Начните общение...'
      };
      setChats([newChat, ...chats]);
      setSelectedChatId(newChat.id);
      setView('chat-detail');
    }
  };

  const sendMessage = (chatId: string, text: string) => {
    setChats(prev => prev.map(chat => {
      if (chat.id === chatId) {
        const newMessage: Message = {
          id: `msg_${Date.now()}`,
          senderId: user?.id || 'me',
          text,
          timestamp: Date.now()
        };
        return {
          ...chat,
          messages: [...chat.messages, newMessage],
          lastMessage: text
        };
      }
      return chat;
    }));
    window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
  };

  const renderView = () => {
    switch (view) {
      case 'onboarding':
        return <OnboardingView onComplete={handleOnboardingComplete} />;
      case 'home':
        return <HomeView onProductClick={handleProductClick} products={products} currentRegion={region} />;
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailView 
            product={selectedProduct} 
            onBack={() => setView('home')}
            onChatStart={() => startChatWithSeller(selectedProduct)}
          />
        ) : <HomeView onProductClick={handleProductClick} products={products} currentRegion={region} />;
      case 'create-listing':
        return <CreateListingView onCancel={() => setView('home')} onSuccess={(p) => { setProducts([p, ...products]); setView('home'); }} region={region || 'Не указан'} user={user} />;
      case 'profile':
        return <ProfileView user={user} region={region} productsCount={products.length} onAdminClick={() => setView('admin-dashboard')} />;
      case 'messages':
        return (
          <MessagesView 
            chats={chats} 
            onChatClick={(id) => { setSelectedChatId(id); setView('chat-detail'); }} 
          />
        );
      case 'chat-detail':
        const currentChat = chats.find(c => c.id === selectedChatId);
        return currentChat ? (
          <ChatDetailView 
            chat={currentChat} 
            user={user} 
            onBack={() => setView('messages')} 
            onSendMessage={(txt) => sendMessage(currentChat.id, txt)}
          />
        ) : <MessagesView chats={chats} onChatClick={(id) => { setSelectedChatId(id); setView('chat-detail'); }} />;
      case 'admin-dashboard':
        return (
          <AdminDashboardView 
            products={products} 
            onBack={() => setView('profile')} 
            onEdit={(p) => { setSelectedProduct(p); setView('admin-edit'); }} 
            onDelete={(id) => setProducts(products.filter(p => p.id !== id))}
          />
        );
      case 'admin-edit':
        return selectedProduct ? (
          <AdminEditView 
            product={selectedProduct} 
            onSave={(u) => { setProducts(products.map(p => p.id === u.id ? u : p)); setView('admin-dashboard'); }} 
            onCancel={() => setView('admin-dashboard')} 
          />
        ) : null;
      default:
        return <HomeView onProductClick={handleProductClick} products={products} currentRegion={region} />;
    }
  };

  return (
    <Layout 
      activeView={view} 
      onViewChange={(newView) => {
        window.Telegram?.WebApp?.HapticFeedback?.impactOccurred('light');
        setView(newView);
      }}
      region={region}
      user={user}
    >
      {renderView()}
    </Layout>
  );
};

export default App;
