import { CircularProgress, Alert } from '@mui/material';
import { useYandexMaps } from './hooks/useYandexMaps';
import config from './config.json';
import YandexMap from './YandexMap';

const MapPage = () => {
  const { ymaps, loading, error } = useYandexMaps(config.YANDEX_API_KEY);

  if (loading) return <CircularProgress className="loading-spinner" />;
  if (error) return <Alert severity="error">{error}</Alert>;

  return <YandexMap ymaps={ymaps} />;
};

export default MapPage;