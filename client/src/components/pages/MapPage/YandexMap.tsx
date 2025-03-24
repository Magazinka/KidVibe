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
  CircularProgress,
  Alert
} from '@mui/material';
import { SentimentDissatisfied } from '@mui/icons-material';
import { v4 as uuidv4 } from 'uuid';
import './YandexMap.css';

const SEVASTOPOL_CENTER: [number, number] = [44.6167, 33.5254];
const ZOOM = 12;

const CHILD_CLINICS = [
  {
    id: 1,
    name: "Детская поликлиника №1",
    address: "ул. Ленина, 25",
    coordinates: [44.6115, 33.5223] as [number, number]
  },
  {
    id: 2,
    name: "Детская поликлиника №3", 
    address: "ул. Острякова, 5",
    coordinates: [44.6021, 33.5198] as [number, number]
  },
  {
    id: 3,
    name: "Детская поликлиника №5",
    address: "ул. Гоголя, 16",
    coordinates: [44.6138, 33.5129] as [number, number]
  }
];

const YandexMap = ({ ymaps }: { ymaps: any }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [selectedClinic, setSelectedClinic] = useState<number | null>(null);
  const [savedClinics, setSavedClinics] = useState<any[]>([]);
  const [mapInstance, setMapInstance] = useState<any>(null);

  
  useEffect(() => {
    if (!ymaps || !mapRef.current) return;

    const map = new ymaps.Map(mapRef.current, {
      center: SEVASTOPOL_CENTER,
      zoom: ZOOM,
    });

    setMapInstance(map);

    return () => {
      map.destroy();
    };
  }, [ymaps]);

  
  useEffect(() => {
    if (!mapInstance || !ymaps) return;

    
    mapInstance.geoObjects.removeAll();

    
    CHILD_CLINICS.forEach(clinic => {
      const placemark = new ymaps.Placemark(
        clinic.coordinates,
        {
          hintContent: clinic.name,
          balloonContent: `
            <strong>${clinic.name}</strong><br/>
            <em>${clinic.address}</em>
          `,
        },
        {
          preset: clinic.id === selectedClinic 
            ? 'islands#redHospitalIcon' 
            : 'islands#blueHospitalIcon'
        }
      );
      mapInstance.geoObjects.add(placemark);
    });

    
    savedClinics.forEach(clinic => {
      const placemark = new ymaps.Placemark(
        clinic.coordinates,
        {
          balloonContent: `
            <strong>${clinic.name}</strong><br/>
            <em>${clinic.address}</em>
          `,
        },
        { preset: 'islands#greenDotIcon' }
      );
      mapInstance.geoObjects.add(placemark);
    });

  }, [mapInstance, ymaps, selectedClinic, savedClinics]);

  
  useEffect(() => {
    const saved = localStorage.getItem('savedClinics');
    if (saved) setSavedClinics(JSON.parse(saved));
  }, []);

  const handleSaveClinic = () => {
    if (selectedClinic === null) return;

    const clinicToSave = CHILD_CLINICS.find(c => c.id === selectedClinic);
    if (!clinicToSave) return;

    const newSavedClinic = {
      id: uuidv4(),
      ...clinicToSave
    };

    const updated = [...savedClinics, newSavedClinic];
    localStorage.setItem('savedClinics', JSON.stringify(updated));
    setSavedClinics(updated);
  };

  return (
    <Box className="map-container">
      <Box className="map-content">
        <Paper className="clinics-list" elevation={3}>
          <Typography variant="h6" gutterBottom>
            Детские поликлиники Севастополя
          </Typography>
          <List>
            {CHILD_CLINICS.map(clinic => (
              <div key={clinic.id}>
                <ListItem 
                  button
                  selected={clinic.id === selectedClinic}
                  onClick={() => setSelectedClinic(clinic.id)}
                >
                  <ListItemText
                    primary={clinic.name}
                    secondary={clinic.address}
                  />
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>

          {selectedClinic !== null && (
            <Box p={2}>
              <Typography variant="subtitle1">
                {CHILD_CLINICS.find(c => c.id === selectedClinic)?.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {CHILD_CLINICS.find(c => c.id === selectedClinic)?.address}
              </Typography>
              <Button
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleSaveClinic}
              >
                Сохранить в избранное
              </Button>
            </Box>
          )}
        </Paper>

        <Box ref={mapRef} className="main-map" />
      </Box>

      {savedClinics.length > 0 && (
        <Paper sx={{ mt: 3, p: 2 }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            Избранные поликлиники
          </Typography>
          <List>
            {savedClinics.map(clinic => (
              <ListItem key={clinic.id}>
                <ListItemText
                  primary={clinic.name}
                  secondary={clinic.address}
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