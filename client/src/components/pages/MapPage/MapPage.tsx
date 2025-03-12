import React from 'react';
import YandexMap from './YandexMap';

const MapPage: React.FC = () => {
  return (
    <div>
      <h1>Детские площадки в Севастополе</h1>
      <YandexMap />
    </div>
  );
};

export default MapPage;