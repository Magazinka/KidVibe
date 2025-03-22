import { Button, Card, CardContent, Typography, List, ListItem, ListItemButton, ListItemText, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getGadget } from "../../../redux/slice/gadget.slice";
import { AppDispatch, RootState } from "../../../redux/store";

function CardGadget() {
  const { gadget } = useSelector((state: RootState) => state.gadgetSlicer);
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    dispatch(getGadget());
  }, [dispatch]);

  useEffect(() => {
    if (gadget) {
      const uniqueCategories = [...new Set(gadget.map((g) => g.group))];
      setCategories(["all", ...uniqueCategories]);
    }
  }, [gadget]);

  const filteredGadgets = selectedCategory === "all"
    ? gadget
    : gadget?.filter((g) => g.group === selectedCategory);

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

      
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          flexGrow: 1,
        }}
      >
        {filteredGadgets?.map((g) => (
          <Card
            key={g.id}
            sx={{
              width: 350,
              height: 400,
              backgroundColor: "#E3F2FD",
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent sx={{ flexGrow: 1 }}>
              {g.image && <img src={g.image} alt={g.name} style={{ width: "43%", marginTop: 10, borderRadius: 4 }} />}
              <Typography variant='h5' component='div' sx={{ color: "#441752" }}>
                {g.name}
              </Typography>
              <Typography component='div' sx={{ color: "#441752" }}>
                Цена: {g.price} руб.
              </Typography>
              <Typography component='div' sx={{ color: "#441752" }}>
                Владелец: {g.user_id}
              </Typography>
            </CardContent>
            <Link to={`/gadget/${g.id}`} style={{ textDecoration: "none" }}>
              <Button
                variant='contained'
                sx={{
                  backgroundColor: "#441752",
                  color: "#CFEBC7",
                  "&:hover": {
                    backgroundColor: "#8174A0",
                  },
                  margin: "10px 20px",
                  alignSelf: "flex-end",
                }}
              >
                More
              </Button>
            </Link>
          </Card>
        ))}
      </Box>
    </Box>
  );
}

export default CardGadget;