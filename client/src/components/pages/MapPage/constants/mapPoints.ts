// src/constants/mapPoints.ts

export type MapPoint = {
  id: number;
  name: string;
  address: string;
  coordinates: [number, number];
  category: 'clinic' | 'water_park' | 'pharmacy' | 'kindergarten';
};

// Поликлиники
export const CHILD_CLINICS: MapPoint[] = [
  {
    id: 1,
    name: "Детская городская поликлиника №1",
    address: "ул. Ленина, 25",
    coordinates: [44.6115, 33.5223],
    category: 'clinic'
  },
  {
    id: 2,
    name: "Детская городская поликлиника №2",
    address: "ул. Острякова, 44",
    coordinates: [44.6021, 33.5198],
    category: 'clinic'
  },
  {
    id: 3,
    name: "Детская городская поликлиника №3",
    address: "ул. Льва Толстого, 13",
    coordinates: [44.6138, 33.5129],
    category: 'clinic'
  }
];

// Аквапарки
export const WATER_PARKS: MapPoint[] = [
  {
    id: 4,
    name: "Аквапарк 'Зурбаган'",
    address: "Парк Победы, ул. Парковая, 22",
    coordinates: [44.5806, 33.5229],
    category: 'water_park'
  },
];

// Аптеки
export const PHARMACIES: MapPoint[] = [
  {
    id: 6,
    name: "Аптека 'Фармация'",
    address: "пр. Нахимова, 12",
    coordinates: [44.6121, 33.5199],
    category: 'pharmacy'
  },
  {
    id: 7,
    name: "Аптека 'Севастопольские аптеки'",
    address: "ул. Ленина, 21",
    coordinates: [44.6111, 33.5261],
    category: 'pharmacy'
  },
  {
    id: 9,
    name: "Аптека 'Апрель'",
    address: "ул. Героев Севастополя, 74",
    coordinates: [44.6089, 33.5211],
    category: 'pharmacy'
  },
  {
    id: 10,
    name: "Аптека '36.6'",
    address: "ул. Ленина, 45",
    coordinates: [44.6056, 33.5148],
    category: 'pharmacy'
  },
  {
    id: 11,
    name: "Аптека 'Вита'",
    address: "ул. Горпищенко, 56",
    coordinates: [44.5987, 33.5299],
    category: 'pharmacy'
  },
  {
    id: 12,
    name: "Аптека 'ПроАптека'",
    address: "ул. Хрусталева, 23",
    coordinates: [44.6012, 33.5167],
    category: 'pharmacy'
  },
  {
    id: 13,
    name: "Аптека 'Росаптека'",
    address: "ул. Руднева, 34",
    coordinates: [44.5998, 33.5234],
    category: 'pharmacy'
  },
  {
    id: 14,
    name: "Аптека 'Озерки'",
    address: "ул. Вакуленчука, 21",
    coordinates: [44.6023, 33.5189],
    category: 'pharmacy'
  }
];

// Детские сады
export const KINDERGARTENS: MapPoint[] = [
  {
    id: 9,
    name: "Детский сад №84 'Солнышко'",
    address: "ул. Репина, 15",
    coordinates: [44.611024175064706,33.5187743563343],
    category: 'kindergarten'
  },
  {
    id: 10,
    name: "Детский сад №123 'Чебурашка'",
    address: "ул. Генерала Мельника, 8",
    coordinates: [44.5923, 33.5387],
    category: 'kindergarten'
  },
  {
    id: 11,
    name: "Детский сад №32 'Ромашка'",
    address: "ул. Дунайская, 4",
    coordinates: [44.5992,33.5001],
    category: 'kindergarten'
  },
  {
    id: 12,
    name: "Детский сад №21 'Дельфин'",
    address: "ул. Героев Севастополя, 12",
    coordinates: [44.5964,33.5178],
    category: 'kindergarten'
  },
  {
    id: 13,
    name: "Детский сад №45 'Жемчужина'",
    address: "ул. Ленина, 45",
    coordinates: [44.6089,33.5211],
    category: 'kindergarten'
  },
  {
    id: 14,
    name: "Детский сад №67 'Пчелка'",
    address: "ул. Хрусталева, 23",
    coordinates: [44.6056,33.5148],
    category: 'kindergarten'
  },
  {
    id: 15,
    name: "Детский сад №99 'Тополёк'",
    address: "ул. Горпищенко, 56",
    coordinates: [44.5987,33.5299],
    category: 'kindergarten'
  },
  {
    id: 16,
    name: "Детский сад №101 'Василёк'",
    address: "ул. Пролетарская, 18",
    coordinates: [44.6012,33.5167],
    category: 'kindergarten'
  },
  {
    id: 17,
    name: "Детский сад №112 'Улыбка'",
    address: "ул. Руднева, 34",
    coordinates: [44.5998,33.5234],
    category: 'kindergarten'
  },
  {
    id: 18,
    name: "Детский сад №125 'Непоседы'",
    address: "ул. Вакуленчука, 21",
    coordinates: [44.6023,33.5189],
    category: 'kindergarten'
  }
];

// Все точки вместе
export const ALL_POINTS = [
  ...CHILD_CLINICS,
  ...WATER_PARKS,
  ...PHARMACIES,
  ...KINDERGARTENS
];
