import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getGadget } from "../../../redux/slice/gadget.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import "./CardGadget.css"; // Импорт CSS-файла
import { useDispatch, useSelector } from "react-redux";

function CardGadget() {
  const { gadget } = useSelector((state: RootState) => state.gadgetSlicer);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const [overlayVisibility, setOverlayVisibility] = useState<{ [key: number]: boolean }>({}); // Состояние для overlay каждой карточки

  useEffect(() => {
    dispatch(getGadget());
  }, [dispatch]);

  useEffect(() => {
    if (gadget) {
      const uniqueCategories = [...new Set(gadget.map((g) => g.group))];
      setCategories(["all", ...uniqueCategories]);

      // Инициализируем состояние overlay для каждой карточки
      const initialVisibility = gadget.reduce((acc, g) => {
        acc[g.id] = true; // По умолчанию overlay виден
        return acc;
      }, {} as { [key: number]: boolean });
      setOverlayVisibility(initialVisibility);
    }
  }, [gadget]);

  // Обработчик прокрутки для каждой карточки
  const handleScroll = (id: number) => (event: React.UIEvent<HTMLDivElement>) => {
    const target = event.currentTarget;
    const isAtBottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;

    // Обновляем состояние overlay только для текущей карточки
    setOverlayVisibility((prev) => ({
      ...prev,
      [id]: !isAtBottom,
    }));
  };

  const filteredGadgets =
    selectedCategory === "all"
      ? gadget
      : gadget?.filter((g) => g.group === selectedCategory);

  return (
    <Box sx={{ display: "flex" }}>
      {/* Список категорий */}
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

      {/* Карточки гаджетов */}
      <Box className="gadget-container">
        {filteredGadgets?.map((g) => (
          <Card style={{ backgroundColor: "rgba(227, 242, 253, 1)" }} key={g.id} className="gadget-card">
            {g.image && (
              <CardMedia
                component="img"
                className="gadget-media"
                image={g.image}
                alt={g.name}
              />
            )}
            <CardContent style={{ paddingBottom: "0px" }} className="gadget-content">
              <Typography variant="h5" className="gadget-title">
                {g.name}
              </Typography>
              <Typography className="gadget-price">
                Цена: {g.price} руб.
              </Typography>
              <Box className="gadget-description-container">
                <Typography
                  className="gadget-description"
                  onScroll={handleScroll(g.id)} // Передаём id гаджета в обработчик
                >
                  {g.description}
                </Typography>
                <div
                  className={`gadget-description-overlay ${
                    !overlayVisibility[g.id] ? "hidden" : ""
                  }`}
                >
                  <span className="arrow">▼</span> {/* Символ стрелки */}
                </div>
              </Box>
            </CardContent>
            <Link to={`/gadget/${g.id}`} style={{ textDecoration: "none" }}>
              <Button style={{ paddingTop: "0px" }} className="more-button">Подробнее</Button>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CardGadget;

// style={{ backgroundColor: "rgba(227, 242, 253, 1)" }}