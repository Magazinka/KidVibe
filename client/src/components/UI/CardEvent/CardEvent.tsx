import React, { useEffect } from "react";
import { Card, CardContent, CardMedia, Typography, Button } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { getEvent } from "../../../redux/slice/event.slice";

function CardEvent() {
  const { event } = useSelector((state: RootState) => state.eventSlicer); 
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() =>{
    dispatch(getEvent())
  }, [])
  console.log('events: ', event);

  return (
    <div style={{display:"flex", flexWrap: "wrap", gap: "10px", justifyContent: "center",  alignItems: "center",}}>
      {event?.map((e) => ( 
        <Card
          key={e.id}  
          sx={{
            width: 300,
            backgroundColor: "#E3F2FD",
            marginBottom: 2,  
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={e.img_url} 
            alt="event image"
            sx={{ objectFit: 'cover' }}  
          />
          <CardContent>
            <Typography variant="h5" component="div" sx={{ color: "#441752" }}>
              {e.name}
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#8174A0" }}
            >
              {e.description} 
            </Typography>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ color: "#8174A0" }}
            >
              {e.date}
            </Typography>
          </CardContent>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#441752",
              color: "#CFEBC7",
              "&:hover": {
                backgroundColor: "#8174A0",
              },
              margin: "20px",
            }}
            startIcon={<MoreVertIcon />}
          >
            More
          </Button>
        </Card>
      ))}
    </div>
  );
}

export default CardEvent;
