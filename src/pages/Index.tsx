import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';

interface App {
  id: number;
  name: string;
  icon: string;
  category: string;
  developer: string;
  rating: number;
  downloads: string;
  description: string;
  blocked: boolean;
  blockedDate?: string;
  website: string;
}

const APPS_DATA: App[] = [
  { id: 1, name: 'ВКонтакте', icon: '🔵', category: 'Социальные сети', developer: 'VK', rating: 4.5, downloads: '100M+', description: 'Популярная социальная сеть', blocked: false, website: 'https://vk.com' },
  { id: 2, name: 'Telegram', icon: '✈️', category: 'Мессенджеры', developer: 'Telegram FZ-LLC', rating: 4.7, downloads: '1B+', description: 'Быстрый мессенджер', blocked: false, website: 'https://telegram.org' },
  { id: 3, name: 'WhatsApp', icon: '💬', category: 'Мессенджеры', developer: 'Meta', rating: 4.4, downloads: '5B+', description: 'Мессенджер для общения', blocked: false, website: 'https://whatsapp.com' },
  { id: 4, name: 'Instagram', icon: '📷', category: 'Социальные сети', developer: 'Meta', rating: 4.3, downloads: '2B+', description: 'Делитесь фото и видео', blocked: false, website: 'https://instagram.com' },
  { id: 5, name: 'TikTok', icon: '🎵', category: 'Развлечения', developer: 'ByteDance', rating: 4.6, downloads: '3B+', description: 'Короткие видео', blocked: false, website: 'https://tiktok.com' },
  { id: 6, name: 'YouTube', icon: '▶️', category: 'Видео', developer: 'Google', rating: 4.5, downloads: '10B+', description: 'Смотрите видео', blocked: false, website: 'https://youtube.com' },
  { id: 7, name: 'Twitter (X)', icon: '🐦', category: 'Социальные сети', developer: 'X Corp', rating: 4.1, downloads: '500M+', description: 'Новости и обсуждения', blocked: false, website: 'https://x.com' },
  { id: 8, name: 'Facebook', icon: '📘', category: 'Социальные сети', developer: 'Meta', rating: 4.2, downloads: '5B+', description: 'Общайтесь с друзьями', blocked: false, website: 'https://facebook.com' },
  { id: 9, name: 'Яндекс', icon: '🔴', category: 'Инструменты', developer: 'Yandex', rating: 4.6, downloads: '100M+', description: 'Поиск и сервисы', blocked: false, website: 'https://yandex.ru' },
  { id: 10, name: 'Avito', icon: '🛒', category: 'Покупки', developer: 'Avito', rating: 4.3, downloads: '50M+', description: 'Объявления', blocked: false, website: 'https://avito.ru' },
  { id: 11, name: 'Ozon', icon: '🟣', category: 'Покупки', developer: 'Ozon', rating: 4.4, downloads: '50M+', description: 'Интернет-магазин', blocked: false, website: 'https://ozon.ru' },
  { id: 12, name: 'Wildberries', icon: '🟪', category: 'Покупки', developer: 'Wildberries', rating: 4.2, downloads: '50M+', description: 'Маркетплейс', blocked: false, website: 'https://wildberries.ru' },
  { id: 13, name: 'Одноклассники', icon: '🟠', category: 'Социальные сети', developer: 'OK.RU', rating: 4.3, downloads: '100M+', description: 'Старые друзья', blocked: false, website: 'https://ok.ru' },
  { id: 14, name: 'Яндекс.Музыка', icon: '🎵', category: 'Музыка', developer: 'Yandex', rating: 4.5, downloads: '50M+', description: 'Слушайте музыку', blocked: false, website: 'https://music.yandex.ru' },
  { id: 15, name: 'Spotify', icon: '🟢', category: 'Музыка', developer: 'Spotify', rating: 4.6, downloads: '1B+', description: 'Стриминг музыки', blocked: false, website: 'https://spotify.com' },
  { id: 16, name: 'Netflix', icon: '🎬', category: 'Развлечения', developer: 'Netflix', rating: 4.4, downloads: '1B+', description: 'Фильмы и сериалы', blocked: false, website: 'https://netflix.com' },
  { id: 17, name: 'Кинопоиск', icon: '🎞️', category: 'Развлечения', developer: 'Yandex', rating: 4.7, downloads: '50M+', description: 'Фильмы и рейтинги', blocked: false, website: 'https://kinopoisk.ru' },
  { id: 18, name: 'Zoom', icon: '📹', category: 'Инструменты', developer: 'Zoom', rating: 4.3, downloads: '500M+', description: 'Видеоконференции', blocked: false, website: 'https://zoom.us' },
  { id: 19, name: 'Skype', icon: '📞', category: 'Мессенджеры', developer: 'Microsoft', rating: 4.1, downloads: '1B+', description: 'Звонки и чат', blocked: false, website: 'https://skype.com' },
  { id: 20, name: 'Discord', icon: '🎮', category: 'Мессенджеры', developer: 'Discord Inc', rating: 4.5, downloads: '500M+', description: 'Голосовые чаты', blocked: false, website: 'https://discord.com' },
  { id: 21, name: 'Twitch', icon: '🟣', category: 'Развлечения', developer: 'Amazon', rating: 4.4, downloads: '500M+', description: 'Стримы', blocked: false, website: 'https://twitch.tv' },
  { id: 22, name: 'Reddit', icon: '🤖', category: 'Социальные сети', developer: 'Reddit Inc', rating: 4.3, downloads: '500M+', description: 'Сообщества', blocked: false, website: 'https://reddit.com' },
  { id: 23, name: 'LinkedIn', icon: '💼', category: 'Социальные сети', developer: 'Microsoft', rating: 4.2, downloads: '1B+', description: 'Деловая сеть', blocked: false, website: 'https://linkedin.com' },
  { id: 24, name: 'Pinterest', icon: '📌', category: 'Социальные сети', developer: 'Pinterest', rating: 4.4, downloads: '500M+', description: 'Идеи и вдохновение', blocked: false, website: 'https://pinterest.com' },
  { id: 25, name: 'Snapchat', icon: '👻', category: 'Социальные сети', developer: 'Snap Inc', rating: 4.1, downloads: '1B+', description: 'Фото и истории', blocked: false, website: 'https://snapchat.com' },
  { id: 26, name: 'Viber', icon: '💜', category: 'Мессенджеры', developer: 'Rakuten', rating: 4.2, downloads: '1B+', description: 'Звонки и сообщения', blocked: false, website: 'https://viber.com' },
  { id: 27, name: 'WeChat', icon: '💚', category: 'Мессенджеры', developer: 'Tencent', rating: 4.3, downloads: '1B+', description: 'Китайский мессенджер', blocked: false, website: 'https://wechat.com' },
  { id: 28, name: 'Duolingo', icon: '🦉', category: 'Образование', developer: 'Duolingo', rating: 4.7, downloads: '500M+', description: 'Изучайте языки', blocked: false, website: 'https://duolingo.com' },
  { id: 29, name: 'Coursera', icon: '🎓', category: 'Образование', developer: 'Coursera', rating: 4.5, downloads: '50M+', description: 'Онлайн-курсы', blocked: false, website: 'https://coursera.org' },
  { id: 30, name: 'Khan Academy', icon: '📚', category: 'Образование', developer: 'Khan Academy', rating: 4.6, downloads: '10M+', description: 'Бесплатное обучение', blocked: false, website: 'https://khanacademy.org' },
  { id: 31, name: 'Uber', icon: '🚗', category: 'Транспорт', developer: 'Uber', rating: 4.3, downloads: '1B+', description: 'Заказ такси', blocked: false, website: 'https://uber.com' },
  { id: 32, name: 'Яндекс.Такси', icon: '🟡', category: 'Транспорт', developer: 'Yandex', rating: 4.4, downloads: '100M+', description: 'Такси в России', blocked: false, website: 'https://taxi.yandex.ru' },
  { id: 33, name: 'Gett', icon: '🟢', category: 'Транспорт', developer: 'Gett', rating: 4.2, downloads: '10M+', description: 'Такси онлайн', blocked: false, website: 'https://gett.com' },
  { id: 34, name: 'AliExpress', icon: '🟠', category: 'Покупки', developer: 'Alibaba', rating: 4.4, downloads: '500M+', description: 'Покупки из Китая', blocked: false, website: 'https://aliexpress.com' },
  { id: 35, name: 'Amazon', icon: '📦', category: 'Покупки', developer: 'Amazon', rating: 4.5, downloads: '1B+', description: 'Интернет-магазин', blocked: false, website: 'https://amazon.com' },
  { id: 36, name: 'eBay', icon: '🛍️', category: 'Покупки', developer: 'eBay', rating: 4.3, downloads: '500M+', description: 'Аукционы', blocked: false, website: 'https://ebay.com' },
  { id: 37, name: 'Сбербанк Онлайн', icon: '🟢', category: 'Финансы', developer: 'Sberbank', rating: 4.6, downloads: '100M+', description: 'Мобильный банк', blocked: false, website: 'https://sberbank.ru' },
  { id: 38, name: 'Тинькофф', icon: '🟡', category: 'Финансы', developer: 'Tinkoff', rating: 4.7, downloads: '50M+', description: 'Цифровой банк', blocked: false, website: 'https://tinkoff.ru' },
  { id: 39, name: 'Альфа-Банк', icon: '🔴', category: 'Финансы', developer: 'Alfa-Bank', rating: 4.5, downloads: '50M+', description: 'Банковские услуги', blocked: false, website: 'https://alfabank.ru' },
  { id: 40, name: 'PayPal', icon: '💙', category: 'Финансы', developer: 'PayPal', rating: 4.4, downloads: '500M+', description: 'Платежи онлайн', blocked: false, website: 'https://paypal.com' },
  { id: 41, name: 'Госуслуги', icon: '🇷🇺', category: 'Инструменты', developer: 'Минцифры России', rating: 4.6, downloads: '100M+', description: 'Государственные услуги', blocked: false, website: 'https://gosuslugi.ru' },
  { id: 42, name: 'МТС', icon: '🔴', category: 'Связь', developer: 'MTS', rating: 4.3, downloads: '50M+', description: 'Мобильная связь', blocked: false, website: 'https://mts.ru' },
  { id: 43, name: 'Мегафон', icon: '🟢', category: 'Связь', developer: 'MegaFon', rating: 4.2, downloads: '50M+', description: 'Оператор связи', blocked: false, website: 'https://megafon.ru' },
  { id: 44, name: 'Beeline', icon: '🟡', category: 'Связь', developer: 'Beeline', rating: 4.1, downloads: '50M+', description: 'Мобильная связь', blocked: false, website: 'https://beeline.ru' },
  { id: 45, name: 'Яндекс.Карты', icon: '🗺️', category: 'Навигация', developer: 'Yandex', rating: 4.5, downloads: '100M+', description: 'Навигация и карты', blocked: false, website: 'https://maps.yandex.ru' },
  { id: 46, name: 'Google Maps', icon: '🌍', category: 'Навигация', developer: 'Google', rating: 4.6, downloads: '10B+', description: 'Карты и навигация', blocked: false, website: 'https://maps.google.com' },
  { id: 47, name: '2GIS', icon: '🏙️', category: 'Навигация', developer: '2GIS', rating: 4.4, downloads: '100M+', description: 'Карты городов', blocked: false, website: 'https://2gis.ru' },
  { id: 48, name: 'Steam', icon: '🎮', category: 'Игры', developer: 'Valve', rating: 4.5, downloads: '1B+', description: 'Игровая платформа', blocked: false, website: 'https://store.steampowered.com' },
  { id: 49, name: 'Epic Games', icon: '🎯', category: 'Игры', developer: 'Epic Games', rating: 4.3, downloads: '500M+', description: 'Игровой магазин', blocked: false, website: 'https://epicgames.com' },
  { id: 50, name: 'Roblox', icon: '🎮', category: 'Игры', developer: 'Roblox Corp', rating: 4.4, downloads: '500M+', description: 'Игровая платформа', blocked: false, website: 'https://roblox.com' },
];

const Index = () => {
  const [apps, setApps] = useState<App[]>(APPS_DATA);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [balance, setBalance] = useState(0);
  const [isRouletting, setIsRouletting] = useState(false);

  const playBlockSound = () => {
    const audio = new Audio('/sounds/block.mp3');
    audio.play().catch(() => {});
  };

  const blockApp = (appId: number) => {
    const app = apps.find(a => a.id === appId);
    if (!app || app.blocked) return;

    playBlockSound();

    setApps(prevApps =>
      prevApps.map(a =>
        a.id === appId
          ? { ...a, blocked: true, blockedDate: new Date().toLocaleString('ru-RU') }
          : a
      )
    );

    setBalance(prev => prev + 10000);

    toast({
      title: '💰 Награда получена!',
      description: (
        <div className="flex flex-col gap-2 coin-animation">
          <p className="font-bold text-2xl bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">+10,000 ₽</p>
          <p>Приложение "{app.name}" успешно заблокировано</p>
          <p className="text-xs text-muted-foreground">Федеральная служба по надзору в сфере связи</p>
        </div>
      ),
      duration: 5000,
    });
  };

  const spinRoulette = () => {
    if (isRouletting) return;

    const unblocked = apps.filter(a => !a.blocked);
    if (unblocked.length === 0) {
      toast({
        title: 'Все приложения заблокированы',
        description: 'Больше нет доступных приложений для блокировки',
        variant: 'destructive',
      });
      return;
    }

    setIsRouletting(true);

    setTimeout(() => {
      const randomApp = unblocked[Math.floor(Math.random() * unblocked.length)];
      blockApp(randomApp.id);
      setIsRouletting(false);
    }, 3000);
  };

  const blockedApps = apps.filter(a => a.blocked);
  const filteredApps = apps.filter(a =>
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <header className="bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 text-white shadow-2xl sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl float-animation">🎮</div>
              <div>
                <h1 className="text-2xl font-bold">App Block</h1>
                <p className="text-sm opacity-90">Управление приложениями</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 backdrop-blur-md border-2 border-white/30 shimmer-button px-6 py-3 rounded-lg text-center">
                <div className="text-xs opacity-90">Баланс</div>
                <div className="text-2xl font-bold bg-gradient-to-r from-yellow-200 to-orange-200 bg-clip-text text-transparent">{balance.toLocaleString('ru-RU')} ₽</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg">
            <TabsTrigger value="catalog" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl">
              <Icon name="Grid3x3" className="mr-2" size={18} />
              Каталог приложений
            </TabsTrigger>
            <TabsTrigger value="blocked" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl">
              <Icon name="Ban" className="mr-2" size={18} />
              Чёрный список ({blockedApps.length})
            </TabsTrigger>
            <TabsTrigger value="roulette" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white rounded-xl">
              <Icon name="Dices" className="mr-2" size={18} />
              Рулетка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm slide-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Search" size={24} />
                  Поиск приложений
                </CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  placeholder="Введите название или категорию..."
                  className="w-full px-4 py-3 border-2 border-purple-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-purple-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map((app, index) => (
                <Card
                  key={app.id}
                  className={`border-0 shadow-xl bg-white/80 backdrop-blur-sm slide-in hover:scale-105 transition-all ${app.blocked ? 'opacity-60 grayscale' : ''}`}
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{app.icon}</div>
                        <div>
                          <CardTitle className="text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">{app.name}</CardTitle>
                          <CardDescription>{app.developer}</CardDescription>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Icon name="MoreVertical" size={20} />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            onClick={() => blockApp(app.id)}
                            disabled={app.blocked}
                            className="text-destructive"
                          >
                            <Icon name="Ban" className="mr-2" size={16} />
                            Заблокировать
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <Badge className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-0">{app.category}</Badge>
                      <div className="flex items-center gap-1">
                        <Icon name="Star" size={14} className="text-yellow-500" />
                        <span>{app.rating}</span>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <Icon name="Download" size={14} className="inline mr-1" />
                      {app.downloads}
                    </div>
                    {app.blocked ? (
                      <Badge className="w-full justify-center bg-gradient-to-r from-red-500 to-orange-500 border-0">
                        <Icon name="Ban" className="mr-1" size={14} />
                        Заблокировано
                      </Badge>
                    ) : (
                      <Button
                        className="w-full shimmer-button bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-6 rounded-xl shadow-lg"
                        onClick={() => setSelectedApp(app)}
                      >
                        <Icon name="Download" className="mr-2" size={16} />
                        Установить
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="blocked">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm slide-in">
              <CardHeader className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Ban" size={24} />
                  Постоянный чёрный список
                </CardTitle>
                <CardDescription className="text-white/90">
                  Заблокированные приложения по решению Роскомнадзора
                </CardDescription>
              </CardHeader>
              <CardContent>
                {blockedApps.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <Icon name="CheckCircle2" size={48} className="mx-auto mb-4" />
                    <p>Заблокированных приложений пока нет</p>
                  </div>
                ) : (
                  <ScrollArea className="h-[600px]">
                    <div className="space-y-4">
                      {blockedApps.map(app => (
                        <Card key={app.id} className="border-2 border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
                          <CardContent className="pt-6">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="text-3xl grayscale">{app.icon}</div>
                                <div>
                                  <p className="font-semibold">{app.name}</p>
                                  <p className="text-sm text-muted-foreground">{app.developer}</p>
                                  <p className="text-xs text-destructive">
                                    Заблокировано: {app.blockedDate}
                                  </p>
                                </div>
                              </div>
                              <Badge className="bg-gradient-to-r from-red-500 to-orange-500 border-0">
                                <Icon name="Ban" className="mr-1" size={14} />
                                Заблокировано
                              </Badge>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roulette">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm slide-in">
              <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-t-2xl">
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <span className={`text-4xl ${isRouletting ? 'roulette-spin' : 'float-animation'}`}>🎰</span>
                  Рулетка блокировки
                </CardTitle>
                <CardDescription className="text-white/90">
                  Заблокировать случайное приложение и получить награду
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center gap-8 py-12">
                <div className="text-center">
                  <p className="text-lg mb-4">Нажмите кнопку, чтобы заблокировать случайное приложение</p>
                  <p className="text-muted-foreground">
                    Доступно приложений: {apps.filter(a => !a.blocked).length}
                  </p>
                </div>
                <Button
                  size="lg"
                  onClick={spinRoulette}
                  disabled={isRouletting || apps.filter(a => !a.blocked).length === 0}
                  className="shimmer-button bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 px-12 py-8 rounded-2xl shadow-2xl text-xl"
                >
                  <Icon name="Dices" className={`mr-2 ${isRouletting ? 'animate-spin' : ''}`} size={24} />
                  {isRouletting ? 'Выбираем приложение...' : 'Запустить рулетку'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Dialog open={!!selectedApp} onOpenChange={() => setSelectedApp(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              <span className="text-4xl">{selectedApp?.icon}</span>
              {selectedApp?.name}
            </DialogTitle>
            <DialogDescription>
              {selectedApp?.developer} • {selectedApp?.category}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <p>{selectedApp?.description}</p>
            <div className="flex items-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} className="text-yellow-500" />
                <span>{selectedApp?.rating}</span>
              </div>
              <div className="flex items-center gap-1">
                <Icon name="Download" size={16} />
                <span>{selectedApp?.downloads}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => window.open(selectedApp?.website, '_blank')}
              >
                <Icon name="ExternalLink" className="mr-2" size={16} />
                Открыть сайт
              </Button>
              <Button
                variant="destructive"
                className="flex-1"
                onClick={() => {
                  if (selectedApp) {
                    playBlockSound();
                    blockApp(selectedApp.id);
                    setSelectedApp(null);
                  }
                }}
              >
                <Icon name="Ban" className="mr-2" size={16} />
                Заблокировать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
