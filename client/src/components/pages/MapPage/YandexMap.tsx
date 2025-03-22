import React, { useEffect, useRef, useState } from 'react';

interface Place {
  id: string;
  name: string;
  coordinates: [number, number];
  type: string; 
}

const YandexMap: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [places, setPlaces] = useState<Place[]>([]); 
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
          
          const map = new window.ymaps.Map(mapRef.current, {
            center: [44.61665, 33.52536], 
            zoom: 12,
          });

          // Функция для поиска организаций
          const searchOrganizations = (query: string, type: string) => {
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
                  type: type, // Тип места
                }));

                // Добавляем найденные места в состояние
                setPlaces((prevPlaces) => [...prevPlaces, ...foundPlaces]);

                //Добавляем метки на карту
                foundPlaces.forEach((place) => {
                  const placemark = new window.ymaps.Placemark(place.coordinates, {
                    hintContent: place.name,
                  });
                  map.geoObjects.add(placemark);
                });
              })
              .catch((error) => {
                console.error(`Ошибка при загрузке данных (${query}):`, error.message);
              });
          };

          // Поиск детских садов
          searchOrganizations('детский сад', 'детский сад');

          // Поиск аптек
          searchOrganizations('аптека', 'аптека');
        }
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return (
    <div style={{ display: 'flex', width: '100%', height: '600px' }}>
      
      <div ref={mapRef} style={{ flex: 2, height: '100%' }} />

      
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto', borderLeft: '1px solid #ccc' }}>
        <h2>Найденные места</h2>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {places.map((place) => (
            <li
              key={place.id}
              style={{
                marginBottom: '8px',
                padding: '8px',
                backgroundColor: place.type === 'детский сад' ? '#e3f2fd' : '#ffebee',
                borderRadius: '4px',
              }}
            >
              <strong>{place.name}</strong>
              <br />
              <span>{place.type}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default YandexMap;