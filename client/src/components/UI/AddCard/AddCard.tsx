import { useForm } from "react-hook-form";
import { useCreateEventMutation } from "../../../redux/slice/event.api.slice";
import CardContent from "@mui/material/CardContent/CardContent";
import {
  Box,
  Button,
  Card,
  TextField,
  Typography,
  Modal,
  Backdrop,
  Fade,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
} from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

interface FormData {
  id?: number;
  name: string;
  description: string;
  location: string;
  date: string;
  price: number;
  user_id: number;
  group: string;
}
interface Props {
  toggleModalVisable: () => void;
}
function AddCard({ toggleModalVisable }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const user_id = useSelector((state: RootState) => state.authSlicer.user?.id);
  const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await createEvent({
        ...data,
        user_id: user_id,
      }).unwrap();
      console.log("Event created successfully:", response);
      setIsVisible(false);
      toggleModalVisable();
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
    toggleModalVisable();
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#441752",
          color: "#CFEBC7",
          "&:hover": {
            backgroundColor: "#8174A0",
          },
        }}
        onClick={toggleVisibility}
      >
        Добавить новое событие
      </Button>
      <Modal
        open={isVisible}
        onClose={toggleVisibility}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
          invisible: true,
        }}
      >
        <Fade in={isVisible}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
            }}
          >
            <Card
              sx={{
                width: 400,
                padding: 2,
                backgroundColor: "#E3F2FD",
                display: "flex",
                flexDirection: "column",
                borderRadius: 2,
              }}
            >
              <Typography
                variant="h5"
                sx={{ color: "#441752", marginBottom: 2 }}
              >
                Добавить новое событие
              </Typography>
              <CardContent sx={{ flexGrow: 1 }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      fullWidth
                      label="Наименование"
                      variant="outlined"
                      placeholder="Введите название"
                      {...register("name", {
                        required: "Наименование обязательно",
                      })}
                      error={!!errors.name}
                    />
                  </Box>

                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      fullWidth
                      label="Описание"
                      variant="outlined"
                      placeholder="Введите описание"
                      {...register("description", {
                        required: "Описание обязательно",
                      })}
                      error={!!errors.description}
                    />
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      fullWidth
                      label="Категория"
                      variant="outlined"
                      placeholder="Введите категорию"
                      {...register("group", {
                        required: "Категория обязательна",
                      })}
                      error={!!errors.location}
                    />
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      fullWidth
                      label="Локация"
                      variant="outlined"
                      placeholder="Введите локацию"
                      {...register("location", {
                        required: "Локация обязательна",
                      })}
                      error={!!errors.location}
                    />
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      fullWidth
                      label=""
                      type="date"
                      variant="outlined"
                      placeholder="Введите дату"
                      {...register("date", { required: "Дата обязательна" })}
                      error={!!errors.date}
                    />
                  </Box>

                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      fullWidth
                      label="Стоимость"
                      variant="outlined"
                      placeholder="Введите стоимость"
                      {...register("price", {
                        required: "Если мероприятие бесплатное укажите 00",
                      })}
                      error={!!errors.price}
                    />
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#441752",
                      color: "#CFEBC7",
                      "&:hover": {
                        backgroundColor: "#8174A0",
                      },
                      marginTop: 2,
                    }}
                    type="submit"
                    disabled={isLoading}
                  >
                    {isLoading ? "Загрузка..." : "Добавить событие"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default AddCard;
