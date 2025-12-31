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
  { id: 44, name: 'Билайн', icon: '🟡', category: 'Связь', developer: 'Beeline', rating: 4.1, downloads: '50M+', description: 'Мобильный оператор', blocked: false, website: 'https://beeline.ru' },
  { id: 45, name: '2ГИС', icon: '🗺️', category: 'Навигация', developer: '2GIS', rating: 4.7, downloads: '100M+', description: 'Карты и навигация', blocked: false, website: 'https://2gis.ru' },
  { id: 46, name: 'Яндекс.Карты', icon: '🗺️', category: 'Навигация', developer: 'Yandex', rating: 4.6, downloads: '100M+', description: 'Навигатор', blocked: false, website: 'https://maps.yandex.ru' },
  { id: 47, name: 'Google Maps', icon: '🌍', category: 'Навигация', developer: 'Google', rating: 4.5, downloads: '10B+', description: 'Карты мира', blocked: false, website: 'https://maps.google.com' },
  { id: 48, name: 'Waze', icon: '🚦', category: 'Навигация', developer: 'Google', rating: 4.4, downloads: '500M+', description: 'Социальная навигация', blocked: false, website: 'https://waze.com' },
  { id: 49, name: 'Shazam', icon: '🎵', category: 'Музыка', developer: 'Apple', rating: 4.7, downloads: '500M+', description: 'Распознавание музыки', blocked: false, website: 'https://shazam.com' },
  { id: 50, name: 'SoundCloud', icon: '🟠', category: 'Музыка', developer: 'SoundCloud', rating: 4.3, downloads: '500M+', description: 'Музыкальная платформа', blocked: false, website: 'https://soundcloud.com' },
];

export default function Index() {
  const [apps, setApps] = useState<App[]>(APPS_DATA);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const [balance, setBalance] = useState(0);
  const [isRouletting, setIsRouletting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const playBlockSound = () => {
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBTGH0fPTgjMGHm7A7+OZUQ0QVqno8Kxf');
    audio.volume = 0.3;
    audio.play();
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
      title: '🇷🇺 Поступление от государства',
      description: (
        <div className="flex flex-col gap-2 coin-animation">
          <p className="font-bold text-lg">+10,000 ₽</p>
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
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <header className="bg-primary text-primary-foreground shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-4xl">🇷🇺</div>
              <div>
                <h1 className="text-2xl font-bold">Роскомнадзор</h1>
                <p className="text-sm opacity-90">Федеральная служба по надзору в сфере связи</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-secondary px-6 py-3 rounded-lg text-center">
                <div className="text-xs opacity-90">Баланс</div>
                <div className="text-2xl font-bold">{balance.toLocaleString('ru-RU')} ₽</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="catalog" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="catalog">
              <Icon name="Grid3x3" className="mr-2" size={18} />
              Каталог приложений
            </TabsTrigger>
            <TabsTrigger value="blocked">
              <Icon name="Ban" className="mr-2" size={18} />
              Чёрный список ({blockedApps.length})
            </TabsTrigger>
            <TabsTrigger value="roulette">
              <Icon name="Dices" className="mr-2" size={18} />
              Рулетка
            </TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="space-y-6">
            <Card>
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
                  className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApps.map(app => (
                <Card
                  key={app.id}
                  className={`hover:shadow-lg transition-all ${app.blocked ? 'opacity-60 grayscale' : ''}`}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-4xl">{app.icon}</div>
                        <div>
                          <CardTitle className="text-lg">{app.name}</CardTitle>
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
                      <Badge variant="secondary">{app.category}</Badge>
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
                      <Badge variant="destructive" className="w-full justify-center">
                        <Icon name="Ban" className="mr-1" size={14} />
                        Заблокировано
                      </Badge>
                    ) : (
                      <Button
                        className="w-full"
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Ban" size={24} />
                  Постоянный чёрный список
                </CardTitle>
                <CardDescription>
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
                        <Card key={app.id} className="border-destructive/50">
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
                              <Badge variant="destructive">
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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Dices" size={24} />
                  Рулетка случайной блокировки
                </CardTitle>
                <CardDescription>
                  Позвольте судьбе решить, какое приложение будет заблокировано
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center gap-6 py-12">
                  <div className={`text-8xl ${isRouletting ? 'roulette-spin' : ''}`}>
                    🎰
                  </div>
                  <Button
                    size="lg"
                    onClick={spinRoulette}
                    disabled={isRouletting || apps.filter(a => !a.blocked).length === 0}
                    className="text-lg px-8 py-6"
                  >
                    {isRouletting ? (
                      <>
                        <Icon name="Loader2" className="mr-2 animate-spin" size={24} />
                        Выбираем приложение...
                      </>
                    ) : (
                      <>
                        <Icon name="Play" className="mr-2" size={24} />
                        Запустить рулетку
                      </>
                    )}
                  </Button>
                  <p className="text-sm text-muted-foreground text-center max-w-md">
                    Нажмите кнопку, чтобы случайным образом выбрать и заблокировать приложение.
                    За каждую блокировку вы получите вознаграждение 10,000₽
                  </p>
                </div>
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
            <DialogDescription>{selectedApp?.developer}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Badge variant="secondary">{selectedApp?.category}</Badge>
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} className="text-yellow-500" />
                <span className="font-semibold">{selectedApp?.rating}</span>
              </div>
              <div className="text-sm text-muted-foreground">
                <Icon name="Download" size={14} className="inline mr-1" />
                {selectedApp?.downloads}
              </div>
            </div>
            <p className="text-sm">{selectedApp?.description}</p>
            <Button
              className="w-full"
              size="lg"
              onClick={() => {
                window.open(selectedApp?.website, '_blank');
                setSelectedApp(null);
              }}
            >
              <Icon name="ExternalLink" className="mr-2" size={18} />
              Перейти на сайт приложения
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
