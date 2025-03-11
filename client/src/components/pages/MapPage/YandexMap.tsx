import React, { useEffect, useRef } from 'react';

// Определяем интерфейс для пропсов компонента
interface YandexMapProps {
  apiKey: string;
  center: [number, number]; // Координаты центра карты [широта, долгота]
  zoom: number; // Уровень масштабирования
}

const YandexMap: React.FC<YandexMapProps> = ({ apiKey, center, zoom }) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Загружаем API Яндекс Карт
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Инициализация карты после загрузки API
      window.ymaps.ready(() => {
        if (mapRef.current) {
          const map = new window.ymaps.Map(mapRef.current, {
            center: center,
            zoom: zoom,
          });

          // Добавляем маркер точки
          const placemark = new window.ymaps.Placemark(center, {
            hintContent: 'Центр карты',
            balloonContent: 'Это центр карты!',
          });

          map.geoObjects.add(placemark);
        }
      });
    };

    // Если разморнитруется, то отчистится 
    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey, center, zoom]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default YandexMap;