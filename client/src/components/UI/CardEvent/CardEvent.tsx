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
    <Box sx={{ display: "flex", fontFamily: "'Shantell Sans', sans-serif" }}>
      <Box className="category-list" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
        <List>
          {categories.map((category) => (
            <ListItem key={category} disablePadding>
              <ListItemButton
                className={`category-button ${selectedCategory === category ? "selected" : ""}`}
                onClick={() => setSelectedCategory(category)}
                sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
              >
                <ListItemText 
                  primary={category} 
                  primaryTypographyProps={{ fontFamily: "'Shantell Sans', sans-serif" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box className="event-container" sx={{ fontFamily: "'Shantell Sans', sans-serif" }}>
        {filteredEvents?.map((e) => (
          <Card 
            style={{ backgroundColor: "rgba(227, 242, 253, 1)" }} 
            key={e.id} 
            className="event-card"
            sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
          >
            <CardMedia
              component="img"
              className="event-media"
              image={e.img_url}
              alt={e.name}
            />
            <CardContent style={{ paddingBottom: "0px" }} className="event-content">
              <Typography 
                variant="h5" 
                className="event-title"
                sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
              >
                {e.name}
              </Typography>
              <Typography 
                className="event-price"
                sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
              >
                Цена: {e.price} руб.
              </Typography>
              <Typography 
                className="event-date"
                sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
              >
                Дата: {e.date}
              </Typography>
              <Box className="event-description-container">
                <Typography
                  className="event-description"
                  ref={(el) => (descriptionRefs.current[e.id] = el)}
                  onScroll={handleScroll(e.id)}
                  sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
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
              <Button 
                style={{ paddingTop: "0px" }} 
                className="more-button"
                sx={{ 
                  fontFamily: "'Shantell Sans', sans-serif",
                  color: "#8174A0",
                  "&:hover": {
                    backgroundColor: "rgba(129, 116, 160, 0.1)"
                  }
                }}
              >
                Подробнее
              </Button>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CardEvent;