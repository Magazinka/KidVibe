// import { useForm } from "react-hook-form";
// import { useCreateEventMutation } from "../../../redux/slice/event.api.slice";
// import CardContent from "@mui/material/CardContent/CardContent";
// import {
//   Box,
//   Button,
//   Card,
//   TextField,
//   Typography,
//   Modal,
//   Backdrop,
//   Fade,
//   FormControl,
//   Select,
//   MenuItem,
//   InputLabel,
// } from "@mui/material";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { RootState, AppDispatch } from "../../../redux/store";
// import { getEvent } from "../../../redux/slice/event.slice";

// interface FormData {
//   id?: number;
//   name: string;
//   description: string;
//   location: string;
//   date: string;
//   price: number;
//   user_id: number;
//   group: string;
// }
// interface Props {
//   toggleModalVisable: () => void;
// }
// function AddCard({ toggleModalVisable }: Props) {
//   const [isVisible, setIsVisible] = useState(false);
//   const dispatch = useDispatch<AppDispatch>();
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();
//   const id = useSelector((state: RootState) => state.authSlicer.user?.id);
//   const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();

//   const onSubmit = async (data: FormData) => {
//     try {
//       const response = await createEvent({
//         ...data,
//         user_id: id,
//       }).unwrap();
//       dispatch(getEvent());
//       console.log("RESPONSE FRONT: ", response);
//       console.log("Event created successfully:", response);
//       setIsVisible(false);
//       toggleModalVisable();
//     } catch (err) {
//       console.error("Error creating event:", err);
//     }
//   };

//   const toggleVisibility = () => {
//     setIsVisible((prev) => !prev);
//     toggleModalVisable();
//   };

//   return (
//     <div>
//       <Button
//         variant="contained"
//         sx={{
//           backgroundColor: "#441752",
//           color: "#CFEBC7",
//           "&:hover": {
//             backgroundColor: "#8174A0",
//           },
//         }}
//         onClick={toggleVisibility}
//       >
//         Добавить новое событие
//       </Button>
//       <Modal
//         open={isVisible}
//         onClose={toggleVisibility}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//           invisible: true,
//         }}
//       >
//         <Fade in={isVisible}>
//           <Box
//             sx={{
//               display: "flex",
//               justifyContent: "center",
//               alignItems: "center",
//               height: "100vh",
//             }}
//           >
//             <Card
//               sx={{
//                 width: 400,
//                 padding: 2,
//                 backgroundColor: "#E3F2FD",
//                 display: "flex",
//                 flexDirection: "column",
//                 borderRadius: 2,
//               }}
//             >
//               <Typography
//                 variant="h5"
//                 sx={{ color: "#441752", marginBottom: 2 }}
//               >
//                 Добавить новое событие
//               </Typography>
//               <CardContent sx={{ flexGrow: 1 }}>
//                 <form onSubmit={handleSubmit(onSubmit)}>
//                   <Box sx={{ marginBottom: 2 }}>
//                     <TextField
//                       fullWidth
//                       label="Наименование"
//                       variant="outlined"
//                       placeholder="Введите название"
//                       {...register("name", {
//                         required: "Наименование обязательно",
//                       })}
//                       error={!!errors.name}
//                     />
//                   </Box>

//                   <Box sx={{ marginBottom: 2 }}>
//                     <TextField
//                       fullWidth
//                       label="Описание"
//                       variant="outlined"
//                       placeholder="Введите описание"
//                       {...register("description", {
//                         required: "Описание обязательно",
//                       })}
//                       error={!!errors.description}
//                     />
//                   </Box>
//                   <Box sx={{ marginBottom: 2 }}>
//                     <TextField
//                       fullWidth
//                       label="Категория"
//                       variant="outlined"
//                       placeholder="Введите категорию"
//                       {...register("group", {
//                         required: "Категория обязательна",
//                       })}
//                       error={!!errors.location}
//                     />
//                   </Box>
//                   <Box sx={{ marginBottom: 2 }}>
//                     <TextField
//                       fullWidth
//                       label="Локация"
//                       variant="outlined"
//                       placeholder="Введите локацию"
//                       {...register("location", {
//                         required: "Локация обязательна",
//                       })}
//                       error={!!errors.location}
//                     />
//                   </Box>
//                   <Box sx={{ marginBottom: 2 }}>
//                     <TextField
//                       fullWidth
//                       label=""
//                       type="date"
//                       variant="outlined"
//                       placeholder="Введите дату"
//                       {...register("date", { required: "Дата обязательна" })}
//                       error={!!errors.date}
//                     />
//                   </Box>

//                   <Box sx={{ marginBottom: 2 }}>
//                     <TextField
//                       fullWidth
//                       label="Стоимость"
//                       variant="outlined"
//                       placeholder="Введите стоимость"
//                       {...register("price", {
//                         required: "Если мероприятие бесплатное укажите 00",
//                       })}
//                       error={!!errors.price}
//                     />
//                   </Box>
//                   <Button
//                     fullWidth
//                     variant="contained"
//                     sx={{
//                       backgroundColor: "#441752",
//                       color: "#CFEBC7",
//                       "&:hover": {
//                         backgroundColor: "#8174A0",
//                       },
//                       marginTop: 2,
//                     }}
//                     type="submit"
//                     disabled={isLoading}
//                   >
//                     {isLoading ? "Загрузка..." : "Добавить событие"}
//                   </Button>
//                 </form>
//               </CardContent>
//             </Card>
//           </Box>
//         </Fade>
//       </Modal>
//     </div>
//   );
// }

// export default AddCard;
// function changeEvent(response: ApiResponse): any {
//   throw new Error("Function not implemented.");
// }

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
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../../../redux/store";
import { getEvent } from "../../../redux/slice/event.slice";

interface FormData {
  id?: number;
  name: string;
  description: string;
  location: string;
  date: string;
  price: number;
  user_id: number;
  group: string;
  img_url?: File;
}

interface Props {
  toggleModalVisable: () => void;
}

function AddCard({ toggleModalVisable }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const dispatch = useDispatch<AppDispatch>();
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

  const id = useSelector((state: RootState) => state.authSlicer.user?.id);
  const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();

  const onSubmit = async (data: FormData) => {
    try {
      let imageUrl = null;

      if (data.image instanceof File) {
        const formData = new FormData();
        formData.append("file", data.image);
        formData.append("upload_preset", "upload_gadgets");

        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/dlliagivo/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        if (!cloudinaryResponse.ok) {
          throw new Error("Image upload failed");
        }

        const result = await cloudinaryResponse.json();
        imageUrl = result.secure_url;
      }

      const eventData = {
        name: data.name,
        description: data.description,
        location: data.location,
        date: data.date,
        price: data.price,
        group: data.group,
        user_id: id,
        img_url: imageUrl || "",
      };

      const response = await createEvent(eventData).unwrap();
      dispatch(getEvent());
      
      console.log("Event created successfully:", response);
      setIsVisible(false);
      toggleModalVisable();
      setPreviewImage(null);
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
          fontFamily: "'Shantell Sans', sans-serif",
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
              fontFamily: "'Shantell Sans', sans-serif",
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
                fontFamily: "'Shantell Sans', sans-serif",
              }}
            >
              <Typography 
                variant="h5" 
                sx={{ 
                  color: "#441752", 
                  marginBottom: 2,
                  fontFamily: "'Shantell Sans', sans-serif",
                }}
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
                      InputProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
                      InputLabelProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
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
                      InputProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
                      InputLabelProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
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
                      error={!!errors.group}
                      InputProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
                      InputLabelProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
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
                      InputProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
                      InputLabelProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
                    />
                  </Box>
                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      fullWidth
                      type="date"
                      variant="outlined"
                      {...register("date", { required: "Дата обязательна" })}
                      error={!!errors.date}
                      InputProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
                      InputLabelProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
                    />
                  </Box>

                  <Box sx={{ marginBottom: 2 }}>
                    <TextField
                      fullWidth
                      label="Стоимость"
                      variant="outlined"
                      placeholder="Введите стоимость"
                      {...register("price", {
                        required: "Если мероприятие бесплатное укажите 0",
                        valueAsNumber: true,
                      })}
                      error={!!errors.price}
                      InputProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
                      InputLabelProps={{
                        style: { fontFamily: "'Shantell Sans', sans-serif" }
                      }}
                    />
                  </Box>

                  <Box sx={{ marginBottom: 2 }}>
                    <Button 
                      variant="contained" 
                      component="label"
                      sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                    >
                      Загрузить изображение
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setValue("image", e.target.files[0]);
                            setPreviewImage(URL.createObjectURL(e.target.files[0]));
                          }
                        }}
                      />
                    </Button>
                    {errors.image && (
                      <Typography 
                        color="error"
                        sx={{ fontFamily: "'Shantell Sans', sans-serif" }}
                      >
                        Изображение обязательно
                      </Typography>
                    )}
                  </Box>

                  {previewImage && (
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ 
                        width: "100%", 
                        marginBottom: 16, 
                        borderRadius: 4,
                      }}
                    />
                  )}

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{
                      backgroundColor: "#441752",
                      color: "#CFEBC7",
                      fontFamily: "'Shantell Sans', sans-serif",
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