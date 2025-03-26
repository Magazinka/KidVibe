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

  useEffect(() => {
    if (!ymaps || !mapRef.current) return;

    const map = new ymaps.Map(mapRef.current, {
      center: SEVASTOPOL_CENTER,
      zoom: ZOOM,
    });

    map.controls.add('zoomControl');
    map.controls.add('typeSelector');

    setMapInstance(map);
    return () => map.destroy();
  }, [ymaps]);

  useEffect(() => {
    if (!mapInstance || !ymaps) return;

    mapInstance.geoObjects.removeAll();

    const pointsToShow = activeCategory 
      ? ALL_POINTS.filter(point => point.category === activeCategory)
      : ALL_POINTS;

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

    if (pointsToShow.length > 0) {
      mapInstance.setBounds(ymaps.util.bounds.fromPoints(
        pointsToShow.map(p => p.coordinates)
      ));
    }

  }, [mapInstance, ymaps, activeCategory, savedPoints]);

  useEffect(() => {
    const saved = localStorage.getItem('savedPoints');
    if (saved) setSavedPoints(JSON.parse(saved));
  }, []);

  const handleSavePoint = () => {
    if (!selectedPoint) return;

    const newSavedPoint = {
      ...selectedPoint,
      id: Date.now()
    };

    const updated = [...savedPoints, newSavedPoint];
    localStorage.setItem('savedPoints', JSON.stringify(updated));
    setSavedPoints(updated);
  };

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
    <Box className="map-container" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
      {/* Панель управления и фильтры */}
      <Paper className="map-controls" elevation={3} sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
        <Typography variant="h6" gutterBottom sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
          Объекты Севастополя
        </Typography>
        
        <Box className="category-filters">
          <ToggleButtonGroup
            value={activeCategory}
            exclusive
            onChange={(_, value) => setActiveCategory(value)}
            sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
          >
            <ToggleButton value={null} key="all" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
              Все ({ALL_POINTS.length})
            </ToggleButton>
            <ToggleButton value="clinic" key="clinic" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
              Поликлиники ({CHILD_CLINICS.length})
            </ToggleButton>
            <ToggleButton value="water_park" key="water_park" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
              Аквапарки ({WATER_PARKS.length})
            </ToggleButton>
            <ToggleButton value="pharmacy" key="pharmacy" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
              Аптеки ({PHARMACIES.length})
            </ToggleButton>
            <ToggleButton value="kindergarten" key="kindergarten" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
              Детсады ({KINDERGARTENS.length})
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>
      </Paper>
  
      {/* Список точек */}
      <Paper className="points-list" elevation={3} sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
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
              sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
            >
              <ListItemText
                primary={point.name}
                primaryTypographyProps={{ fontFamily: "'Shantell Sans', sans-serif" }}
                secondary={
                  <>
                    {point.address}
                    <Chip 
                      label={getCategoryName(point.category)} 
                      size="small"
                      sx={{ ml: 1, fontFamily: "'Shantell Sans', sans-serif" }}
                    />
                  </>
                }
                secondaryTypographyProps={{ fontFamily: "'Shantell Sans', sans-serif" }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>
  
      {/* Карта */}
      <Box ref={mapRef} className="main-map" />
  
      {/* Избранное */}
      {savedPoints.length > 0 && (
        <Paper elevation={3} sx={{ p: 2, fontFamily: "'Shantell Sans', sans-serif" }}>
          <Typography variant="h6" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
            Избранное ({savedPoints.length})
          </Typography>
          <List dense>
            {savedPoints.map(point => (
              <ListItem key={point.id} sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
                <ListItemText
                  primary={point.name}
                  primaryTypographyProps={{ fontFamily: "'Shantell Sans', sans-serif" }}
                  secondary={point.address}
                  secondaryTypographyProps={{ fontFamily: "'Shantell Sans', sans-serif" }}
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