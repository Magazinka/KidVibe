import { useEffect, useRef, useState } from 'react';
import { 
  Box, 
  List, 
  ListItem, 
  ListItemText, 
  Divider, 
  Typography,
  Button,
  Paper,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButton,
  ToggleButtonGroup
} from '@mui/material';
import { 
  CHILD_CLINICS, 
  WATER_PARKS, 
  PHARMACIES, 
  KINDERGARTENS,
  ALL_POINTS,
  MapPoint 
} from './constants/mapPoints';
import './YandexMap.css';

const SEVASTOPOL_CENTER: [number, number] = [44.6167, 33.5254];
const ZOOM = 12;

const YandexMap = ({ ymaps }: { ymaps: any }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedPoint, setSelectedPoint] = useState<MapPoint | null>(null);
  const [savedPoints, setSavedPoints] = useState<MapPoint[]>([]);
  const [mapInstance, setMapInstance] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Инициализация карты
  useEffect(() => {
    if (!ymaps || !mapRef.current) return;

    const map = new ymaps.Map(mapRef.current, {
      center: SEVASTOPOL_CENTER,
      zoom: ZOOM,
    });

    // Добавляем элементы управления
    map.controls.add('zoomControl');
    map.controls.add('typeSelector');

    setMapInstance(map);
    return () => map.destroy();
  }, [ymaps]);

  // Обновление меток на карте
  useEffect(() => {
    if (!mapInstance || !ymaps) return;

    mapInstance.geoObjects.removeAll();

    // Отображаем все точки или фильтруем по категории
    const pointsToShow = activeCategory 
      ? ALL_POINTS.filter(point => point.category === activeCategory)
      : ALL_POINTS;

    // Добавляем основные точки
    pointsToShow.forEach(point => {
      const placemark = new ymaps.Placemark(
        point.coordinates,
        {
          hintContent: point.name,
          balloonContent: `
            <strong>${point.name}</strong><br/>
            <em>${point.address}</em><br/>
            <small>${getCategoryName(point.category)}</small>
          `,
        },
        {
          preset: getIconByCategory(point.category),
          iconColor: getColorByCategory(point.category)
        }
      );
      
      placemark.events.add('click', () => {
        setSelectedPoint(point);
      });
      
      mapInstance.geoObjects.add(placemark);
    });

    // Добавляем сохранённые точки
    savedPoints.forEach(point => {
      const placemark = new ymaps.Placemark(
        point.coordinates,
        {
          balloonContent: `
            <strong>${point.name}</strong><br/>
            <em>${point.address}</em>
          `,
        },
        { preset: 'islands#greenDotIcon' }
      );
      mapInstance.geoObjects.add(placemark);
    });

    // Автоматически центрируем карту
    if (pointsToShow.length > 0) {
      mapInstance.setBounds(ymaps.util.bounds.fromPoints(
        pointsToShow.map(p => p.coordinates)
      ));
    }

  }, [mapInstance, ymaps, activeCategory, savedPoints]);

  // Загрузка сохранённых точек
  useEffect(() => {
    const saved = localStorage.getItem('savedPoints');
    if (saved) setSavedPoints(JSON.parse(saved));
  }, []);

  const handleSavePoint = () => {
    if (!selectedPoint) return;

    const newSavedPoint = {
      ...selectedPoint,
      id: Date.now() // Уникальный ID
    };

    const updated = [...savedPoints, newSavedPoint];
    localStorage.setItem('savedPoints', JSON.stringify(updated));
    setSavedPoints(updated);
  };

  // Вспомогательные функции
  const getIconByCategory = (category: string) => {
    const icons = {
      'clinic': 'islands#blueHospitalIcon',
      'water_park': 'islands#blueWaterParkIcon',
      'pharmacy': 'islands#bluePharmacyIcon',
      'kindergarten': 'islands#blueKindergartenIcon'
    };
    return icons[category as keyof typeof icons] || 'islands#blueIcon';
  };

  const getColorByCategory = (category: string) => {
    const colors = {
      'clinic': '#1890ff',
      'water_park': '#13c2c2',
      'pharmacy': '#722ed1',
      'kindergarten': '#52c41a'
    };
    return colors[category as keyof typeof colors] || '#666666';
  };

  const getCategoryName = (category: string) => {
    const names = {
      'clinic': 'Поликлиника',
      'water_park': 'Аквапарк',
      'pharmacy': 'Аптека',
      'kindergarten': 'Детский сад'
    };
    return names[category as keyof typeof names] || category;
  };

  return (
    <Box className="map-container">
      {/* Панель управления и фильтры */}
      <Paper className="map-controls" elevation={3}>
        <Typography variant="h6" gutterBottom>
          Объекты Севастополя
        </Typography>
        
        <Box className="category-filters">
          <ToggleButtonGroup
            value={activeCategory}
            exclusive
            onChange={(_, value) => setActiveCategory(value)}
          >
            <ToggleButton value={null} key="all">
              Все ({ALL_POINTS.length})
            </ToggleButton>
            <ToggleButton value="clinic" key="clinic">
              Поликлиники ({CHILD_CLINICS.length})
            </ToggleButton>
            <ToggleButton value="water_park" key="water_park">
              Аквапарки ({WATER_PARKS.length})
            </ToggleButton>
            <ToggleButton value="pharmacy" key="pharmacy">
              Аптеки ({PHARMACIES.length})
            </ToggleButton>
            <ToggleButton value="kindergarten" key="kindergarten">
              Детсады ({KINDERGARTENS.length})
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Paper>
  
      {/* Список точек */}
      <Paper className="points-list" elevation={3}>
        <List>
          {(activeCategory 
            ? ALL_POINTS.filter(p => p.category === activeCategory) 
            : ALL_POINTS).map(point => (
            <ListItem 
              key={point.id}
              button
              selected={selectedPoint?.id === point.id}
              onClick={() => {
                setSelectedPoint(point);
                mapInstance?.panTo(point.coordinates, { flying: true });
              }}
            >
              <ListItemText
                primary={point.name}
                secondary={
                  <>
                    {point.address}
                    <Chip 
                      label={getCategoryName(point.category)} 
                      size="small"
                      sx={{ ml: 1 }}
                    />
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </Paper>
  
      {/* Карта */}
      <Box ref={mapRef} className="main-map" />
  
      {/* Избранное */}
      {savedPoints.length > 0 && (
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h6">
            Избранное ({savedPoints.length})
          </Typography>
          <List dense>
            {savedPoints.map(point => (
              <ListItem key={point.id}>
                <ListItemText
                  primary={point.name}
                  secondary={point.address}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default YandexMap;