import React, { useEffect, useState, useRef } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getEvent } from "../../../redux/slice/event.slice";
import { Link } from "react-router-dom";
import "./CardEvent.css";

function CardEvent() {
  const { event } = useSelector((state: RootState) => state.eventSlicer);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [overlayVisibility, setOverlayVisibility] = useState<{ [key: number]: boolean }>({});
  const descriptionRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});

  useEffect(() => {
    dispatch(getEvent());
  }, [dispatch]);

  useEffect(() => {
    if (event) {
      const uniqueCategories = [...new Set(event.map((e) => e.group))];
      setCategories(["all", ...uniqueCategories]);

      const initialVisibility = event.reduce((acc, e) => {
        acc[e.id] = true;
        return acc;
      }, {} as { [key: number]: boolean });
      setOverlayVisibility(initialVisibility);

      // Проверяем скролл после загрузки данных
      setTimeout(() => {
        event.forEach(e => {
          if (descriptionRefs.current[e.id]) {
            checkScroll(e.id);
          }
        });
      }, 100);
    }
  }, [event]);

  const checkScroll = (id: number) => {
    const element = descriptionRefs.current[id];
    if (!element) return;

    const hasScroll = element.scrollHeight > element.clientHeight;
    const isAtBottom = element.scrollHeight - element.scrollTop === element.clientHeight;

    setOverlayVisibility(prev => ({
      ...prev,
      [id]: hasScroll && !isAtBottom
    }));
  };

  const handleScroll = (id: number) => (e: React.UIEvent<HTMLDivElement>) => {
    checkScroll(id);
  };

  const filteredEvents =
    selectedCategory === "all"
      ? event
      : event?.filter((e) => e.group === selectedCategory);

  return (
    <Box sx={{ display: "flex" }}>
      <Box className="category-list">
        <List>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                className={`category-button ${selectedCategory === category ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category)}
              >
                <ListItemText primary={category} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box className="event-container">
        {filteredEvents?.map((e) => (
          <Card style={{ backgroundColor: "rgba(227, 242, 253, 1)" }} key={e.id} className="event-card">
            <CardMedia
              component="img"
              className="event-media"
              image={e.img_url}
              alt={e.name}
            />
            <CardContent style={{ paddingBottom: "0px" }} className="event-content">
              <Typography variant="h5" className="event-title">
                {e.name}
              </Typography>
              <Typography className="event-price">
                Цена: {e.price} руб.
              </Typography>
              <Typography className="event-date">
                Дата: {e.date}
              </Typography>
              <Box className="event-description-container">
                <Typography
                  className="event-description"
                  ref={(el) => (descriptionRefs.current[e.id] = el)}
                  onScroll={handleScroll(e.id)}
                >
                  {e.description}
                </Typography>
                <div
                  className={`event-description-overlay ${
                    !overlayVisibility[e.id] ? "hidden" : ""
                  }`}
                >
                  <span className="arrow">▼</span>
                </div>
              </Box>
            </CardContent>
            <Link to={`/event/${e.id}`} style={{ textDecoration: "none" }}>
              <Button style={{ paddingTop: "0px" }} className="more-button">Подробнее</Button>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CardEvent;