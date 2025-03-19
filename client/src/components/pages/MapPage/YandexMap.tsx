import React, { useEffect, useRef } from 'react';

interface Place {
  id: string;
  name: string;
  coordinates: [number, number];
}

const YandexMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const apiKey = 'dd3a041b-a4cd-4fc2-baa2-965afa2f42ad'; 

  useEffect(() => {
    
    if (!apiKey) {
      console.error('API-ключ не указан');
      return;
    }

    
    const script = document.createElement('script');
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${apiKey}&lang=ru_RU`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.ymaps.ready(() => {
        if (mapRef.current) {
          // Инициализация карты
          const map = new window.ymaps.Map(mapRef.current, {
            center: [44.61665, 33.52536], 
            zoom: 12,
          });

          // Функция для поиска организаций
          const searchOrganizations = (query: string) => {
            fetch(
              `https://search-maps.yandex.ru/v1/?apikey=${apiKey}&text=${encodeURIComponent(query)}, Севастополь&lang=ru_RU&results=50`
            )
              .then((response) => {
                if (!response.ok) {
                  return response.text().then((text) => {
                    throw new Error(`Ошибка HTTP: ${response.status}. Ответ сервера: ${text}`);
                  });
                }
                return response.json();
              })
              .then((data) => {
                const foundPlaces: Place[] = data.features.map((feature: any) => ({
                  id: feature.properties.id,
                  name: feature.properties.name,
                  coordinates: feature.geometry.coordinates.reverse(), 
                }));

                
                foundPlaces.forEach((place) => {
                  const placemark = new window.ymaps.Placemark(place.coordinates);
                  map.geoObjects.add(placemark);
                });
              })
              .catch((error) => {
                console.error(`Ошибка при загрузке данных (${query}):`, error.message);
              });
          };

          
          searchOrganizations('детская поликлиника');

          
          searchOrganizations('аптека');
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