import React from 'react';
import YandexMap from './YandexMap'; // Импортируем компонент карты

const MapPage: React.FC = () => {
  const apiKey = 'dd3a041b-a4cd-4fc2-baa2-965afa2f42ad'; // Замените на ваш API-ключ
  const center: [number, number] = [44.616495, 33.525135]; // Координаты центра карты (Москва)
  const zoom = 10; // Уровень масштабирования

  return (
    <div>
      <h1>Страница с Яндекс Картой, пока что с центром Севастополя</h1>
      <p>Здесь отображается карта:</p>
      <YandexMap apiKey={apiKey} center={center} zoom={zoom} />
    </div>
  );
};

export default MapPage;