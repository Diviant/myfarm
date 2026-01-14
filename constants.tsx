
import React from 'react';
import { 
  ShoppingBasket, Leaf, Milk, Egg, Utensils, Wheat, Axe, Hammer, Orbit, 
  Apple, Cookie, Container, Ghost, Baby, Beef, Bird 
} from 'lucide-react';
import { Product } from './types';

export const CATEGORIES_PRODUCTS = [
  { id: 'meat', label: 'Мясо', icon: <Beef size={18} /> },
  { id: 'milk', label: 'Молочное', icon: <Milk size={18} /> },
  { id: 'eggs', label: 'Яйца', icon: <Egg size={18} /> },
  { id: 'honey', label: 'Мёд', icon: <Wheat size={18} /> },
  { id: 'veggies', label: 'Овощи', icon: <Leaf size={18} /> },
  { id: 'fruits', label: 'Сад/Ягоды', icon: <Apple size={18} /> },
  { id: 'bakery', label: 'Выпечка', icon: <Cookie size={18} /> },
  { id: 'preserves', label: 'Заготовки', icon: <Container size={18} /> },
];

export const CATEGORIES_LIVESTOCK = [
  { id: 'cows', label: 'КРС', icon: <ShoppingBasket size={18} /> },
  { id: 'sheep', label: 'Овцы/Козы', icon: <Ghost size={18} /> },
  { id: 'birds', label: 'Птица', icon: <Bird size={18} /> },
  { id: 'rabbits', label: 'Кролики', icon: <Baby size={18} /> },
  { id: 'bees', label: 'Пчелопакеты', icon: <Orbit size={18} /> },
];

export const CATEGORIES_FARM = [
  { id: 'seedlings', label: 'Саженцы', icon: <Leaf size={18} /> },
  { id: 'crafts', label: 'Ремесла', icon: <Hammer size={18} /> },
  { id: 'wood', label: 'Дрова', icon: <Axe size={18} /> },
  { id: 'feed', label: 'Корма', icon: <Orbit size={18} /> },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Творог пластовой (9%)',
    price: 450,
    unit: 'кг',
    location: 'ст-ца Каневская',
    category: 'milk',
    type: 'products',
    image: 'https://images.unsplash.com/photo-1559561853-08451507cbe7?auto=format&fit=crop&q=80&w=600',
    description: 'Настоящий кубанский творог. Плотный, сливочный, без капли химии. Делаем в марлевых мешочках, выдерживаем на холоде. Идеально со сметаной или в сырники.',
    seller: { name: 'Алексей Уваров', rating: 5.0, phone: '+79991234567', username: 'uvarov_farm' }
  },
  {
    id: '2',
    title: 'Бычки герефорды (6 мес)',
    price: 48000,
    unit: 'голова',
    location: 'Алтайский край',
    category: 'cows',
    type: 'livestock',
    image: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&q=80&w=600',
    description: 'Племенной молодняк для откорма. Вес 180-210 кг. Здоровые, активные, прошли все ветеринарные обработки. Генетика отличная, быстрый привес.',
    seller: { name: 'КФХ Сибирь', rating: 4.8, phone: '+79997654321', username: 'kfh_sibir' },
    details: { age: '6 месяцев', breed: 'Герефорд', gender: 'Самец', vaccinated: true }
  },
  {
    id: '3',
    title: 'Мёд Разнотравье (2024)',
    price: 700,
    unit: 'литр',
    location: 'ст-ца Павловская',
    category: 'honey',
    type: 'products',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&q=80&w=600',
    description: 'Ароматный мед с полей Краснодарского края (шалфей, чабрец, донник). Чистый, без сахара и антибиотиков. Пчелы сильные, пасека вдали от дорог.',
    seller: { name: 'Павел Медов', rating: 4.9, phone: '+79992223344', username: 'pavel_honey' }
  },
  {
    id: '19',
    title: 'Сыр "Горный чеддер"',
    price: 1600,
    unit: 'кг',
    location: 'Республика Адыгея',
    category: 'milk',
    type: 'products',
    image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=600',
    description: 'Выдержанный сыр из цельного коровьего молока. Созревание 6 месяцев в специальном погребе. Вкус насыщенный, с ореховыми нотками.',
    seller: { name: 'Сыроварня Адыг', rating: 5.0, phone: '+79991114400', username: 'adyg_cheese' }
  },
  {
    id: '20',
    title: 'Козлята Нубийские',
    price: 15000,
    unit: 'голова',
    location: 'Московская обл.',
    category: 'sheep',
    type: 'livestock',
    image: 'https://images.unsplash.com/photo-1524024973431-2ad916746881?auto=format&fit=crop&q=80&w=600',
    description: 'Чистопородные англо-нубийские козлята. Родители с документами, высокие удои по линии матери. Окрас пятнистый, уши длинные. Обезрожены.',
    seller: { name: 'Козья Усадьба', rating: 4.9, phone: '+79998881122', username: 'goat_manor' },
    details: { age: '2 месяца', breed: 'Англо-нубийская', gender: 'Оба', vaccinated: true }
  },
  {
    id: '21',
    title: 'Клубника "Альбион"',
    price: 350,
    unit: '0.5кг',
    location: 'Крым',
    category: 'fruits',
    type: 'products',
    image: 'https://images.unsplash.com/photo-1464960350473-974ead4a0ecb?auto=format&fit=crop&q=80&w=600',
    description: 'Сладкая, ароматная крымская клубника. Сбор каждое утро. Никаких нитратов, только солнце и капельный полив горной водой.',
    seller: { name: 'Крымский Сад', rating: 4.7, phone: '+79995552233', username: 'crimea_berry' }
  },
  {
    id: '22',
    title: 'Баранина калмыцкая',
    price: 750,
    unit: 'кг',
    location: 'Ставропольский край',
    category: 'meat',
    type: 'products',
    image: 'https://images.unsplash.com/photo-1603048588665-791ca8aea617?auto=format&fit=crop&q=80&w=600',
    description: 'Мясо молодых барашков (6-8 мес). Вольный выпас на степном разнотравье. Жир плотный, мясо нежное, без резкого запаха.',
    seller: { name: 'Ферма Калмык', rating: 4.6, phone: '+79990007788', username: 'kalmyk_meat' }
  },
  {
    id: '23',
    title: 'Индюшата (Биг-6)',
    price: 650,
    unit: 'шт',
    location: 'Белгородская область',
    category: 'birds',
    type: 'livestock',
    image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&q=80&w=600',
    description: 'Тяжелый кросс, индюки вырастают до 25 кг за сезон. Птица здоровая, активная. Проведена первая выпойка витаминами.',
    seller: { name: 'Птичий Двор', rating: 4.5, phone: '+79991230099', username: 'bird_yard' },
    details: { age: '14 дней', breed: 'Big-6', gender: 'Не определен', vaccinated: true }
  },
  {
    id: '24',
    title: 'Саженцы Голубики',
    price: 550,
    unit: 'куст',
    location: 'Белгородская область',
    category: 'seedlings',
    type: 'farm',
    image: 'https://images.unsplash.com/photo-1421789665209-c9b2a435e3dc?auto=format&fit=crop&q=80&w=600',
    description: 'Сорта Дюк, Блюкроп. Двухлетки в горшках 2л. Хорошо зимуют, дают обильный урожай крупных ягод. Расскажу как подготовить почву.',
    seller: { name: 'Ягодный Мастер', rating: 5.0, phone: '+79993335566', username: 'berry_master' }
  },
  {
    id: '25',
    title: 'Урбеч из льна',
    price: 450,
    unit: 'банка',
    location: 'Республика Татарстан',
    category: 'preserves',
    type: 'products',
    image: 'https://images.unsplash.com/photo-1584305658810-0964a74a1fe5?auto=format&fit=crop&q=80&w=600',
    description: 'Традиционный дагестанский продукт, сделанный в Татарстане на каменных жерновах. Без нагрева, сохраняет все омега-3 кислоты.',
    seller: { name: 'Здоровое Поле', rating: 4.9, phone: '+79997771100', username: 'eco_field' }
  },
  {
    id: '26',
    title: 'Яблоки "Симиренко"',
    price: 85,
    unit: 'кг',
    location: 'Липецкая область',
    category: 'fruits',
    type: 'products',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6bcd6?auto=format&fit=crop&q=80&w=600',
    description: 'Кисленькие, сочные, зимние яблоки. Отлично хранятся до весны. Свой сад, минимум обработок.',
    seller: { name: 'Сады Липецка', rating: 4.8, phone: '+79994443322', username: 'lipeck_orchard' }
  },
  {
    id: '27',
    title: 'Пчелопакеты (Карника)',
    price: 6500,
    unit: 'пакет',
    location: 'Орловская область',
    category: 'bees',
    type: 'livestock',
    image: 'https://images.unsplash.com/photo-1584013470707-df1921319089?auto=format&fit=crop&q=80&w=600',
    description: '4-рамочные пчелопакеты. Миролюбивая порода, высокая медопродуктивность. Матки 2024 года, меченые.',
    seller: { name: 'Орловский Пчеловод', rating: 5.0, phone: '+79992224411', username: 'bee_orel' }
  },
  {
    id: '28',
    title: 'Домашний хлеб на закваске',
    price: 120,
    unit: 'булка',
    location: 'г. Москва',
    category: 'bakery',
    type: 'products',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    description: 'Без дрожжей, долгая ферментация (24 часа). Хрустящая корочка, пористый мякиш. Мука цельнозерновая с частной мельницы.',
    seller: { name: 'Хлебный Ремесленник', rating: 5.0, phone: '+79991118800', username: 'bread_artisan' }
  },
  {
    id: '29',
    title: 'Семена чеснока (Любаша)',
    price: 400,
    unit: 'кг',
    location: 'Воронежская область',
    category: 'seedlings',
    type: 'farm',
    image: 'https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?auto=format&fit=crop&q=80&w=600',
    description: 'Озимый чеснок, крупные головки. Сорт устойчив к болезням и морозам. Урожайность до 15 тонн с гектара при правильном уходе.',
    seller: { name: 'Чесночный Край', rating: 4.7, phone: '+79995550011', username: 'garlic_farm' }
  },
  {
    id: '30',
    title: 'Перепела Техасцы (несушки)',
    price: 250,
    unit: 'шт',
    location: 'с. Куяново (РБ)',
    category: 'birds',
    type: 'livestock',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?auto=format&fit=crop&q=80&w=600',
    description: 'Крупная мясо-яичная порода. Яйцо крупное, тушка белая. Возраст 45 дней, уже начинают нестись.',
    seller: { name: 'Башкирский Перепел', rating: 4.8, phone: '+79996662255', username: 'perepel_rb' },
    details: { age: '45 дней', breed: 'Техасский белый', gender: 'Самка', vaccinated: true }
  },
  {
    id: '31',
    title: 'Тюки соломы (пшеничная)',
    price: 150,
    unit: 'тюк',
    location: 'Ростовская область',
    category: 'feed',
    type: 'farm',
    image: 'https://images.unsplash.com/photo-1516467508483-a7212febe31a?auto=format&fit=crop&q=80&w=600',
    description: 'Сухая золотистая солома. Отлично для подстилки животным или мульчирования сада. Тюки по 12-15 кг.',
    seller: { name: 'Агро Дон', rating: 4.5, phone: '+79990004455', username: 'agro_don' }
  },
  {
    id: '32',
    title: 'Ветчина домашняя',
    price: 950,
    unit: 'кг',
    location: 'г. Тимашевск',
    category: 'meat',
    type: 'products',
    image: 'https://images.unsplash.com/photo-1544333346-64e4fe18204e?auto=format&fit=crop&q=80&w=600',
    description: 'Из фермерского окорока. Минимум соли, только натуральные специи и чеснок. Копчение на ольховой щепе.',
    seller: { name: 'Тимашевские Деликатесы', rating: 4.9, phone: '+79998884400', username: 'tima_meat' }
  },
  {
    id: '33',
    title: 'Кролики Паннон (2 мес)',
    price: 800,
    unit: 'шт',
    location: 'ст-ца Динская',
    category: 'rabbits',
    type: 'livestock',
    image: 'https://images.unsplash.com/photo-1585110396054-c8117c7c5d91?auto=format&fit=crop&q=80&w=600',
    description: 'Бройлерная порода кроликов. Очень спокойные, быстро набирают массу. Идеально для начала разведения.',
    seller: { name: 'Динской Кролик', rating: 4.9, phone: '+79991113344', username: 'dinskoy_bunny' },
    details: { age: '2 месяца', breed: 'Белый Паннон', gender: 'Оба', vaccinated: true }
  },
  {
    id: '34',
    title: 'Березовые дрова (колотые)',
    price: 2500,
    unit: 'м³',
    location: 'Воронежская область',
    category: 'wood',
    type: 'farm',
    image: 'https://images.unsplash.com/photo-1520114056694-9221e7290514?auto=format&fit=crop&q=80&w=600',
    description: 'Сухие березовые дрова. Камерная сушка, без гнили. Плотно уложены. Доставка по району бесплатно при заказе от 3 кубов.',
    seller: { name: 'Лесной Мастер', rating: 4.8, phone: '+79995551100', username: 'wood_voronezh' }
  }
];
