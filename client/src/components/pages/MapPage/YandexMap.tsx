import React, { useEffect, useRef, useState } from 'react';

interface Place {
  id: string;
  name: string;
  coordinates: [number, number];
}

const YandexMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const apiKey = 'dd3a041b-a4cd-4fc2-baa2-965afa2f42ad'; 

  useEffect(() => {
    // Загружаем API Яндекс Карт
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.ymaps.ready(() => {
        if (mapRef.current) {
          // Инициализация карты
          const map = new window.ymaps.Map(mapRef.current, {
            center: [44.61665, 33.52536], // Центр карты (Севастополь)
            zoom: 12,
          });

          // Поиск детских площадок
          fetch(
            `https://search-maps.yandex.ru/v1/?apikey=${apiKey}&text=детская площадка, Севастополь&lang=ru_RU&results=50`
          )
            .then((response) => response.json())
            .then((data) => {
              const foundPlaces: Place[] = data.features.map((feature: any) => ({
                id: feature.properties.id,
                name: feature.properties.name,
                coordinates: feature.geometry.coordinates.reverse(), // Координаты в формате [широта, долгота]
              }));

              setPlaces(foundPlaces);

              // Добавляем маркеры на карту
              foundPlaces.forEach((place) => {
                const placemark = new window.ymaps.Placemark(place.coordinates, {
                  hintContent: place.name,
                  balloonContent: `Детская площадка: ${place.name}`,
                });
                map.geoObjects.add(placemark);
              });
            })
            .catch((error) => {
              console.error('Ошибка при загрузке данных:', error);
            });
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return <div ref={mapRef} style={{ width: '100%', height: '600px' }} />;
};

export default YandexMap;