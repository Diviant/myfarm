
export type CategoryType = 'products' | 'livestock' | 'farm';

export interface TelegramUser {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  photo_url?: string;
  isAdmin?: boolean;
}

export interface Message {
  id: string;
  senderId: number | string;
  text: string;
  timestamp: number;
}

export interface Chat {
  id: string;
  productId: string;
  productTitle: string;
  productImage: string;
  participant: {
    name: string;
    username: string;
    photo_url?: string;
  };
  messages: Message[];
  lastMessage?: string;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  unit: string;
  location: string;
  category: string;
  type: CategoryType;
  image: string;
  description: string;
  seller: {
    name: string;
    rating: number;
    phone: string;
    username: string;
  };
  details?: {
    age?: string;
    breed?: string;
    gender?: string;
    vaccinated?: boolean;
  };
}

export type ViewState = 'onboarding' | 'home' | 'product-detail' | 'create-listing' | 'profile' | 'admin-dashboard' | 'admin-edit' | 'messages' | 'chat-detail';

export interface AppState {
  view: ViewState;
  selectedProduct?: Product;
  selectedChatId?: string;
  region: string | null;
  user: TelegramUser | null;
}
