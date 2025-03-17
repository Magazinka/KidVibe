// import { useForm } from "react-hook-form";
// import { useCreateEventMutation } from "../../../redux/slice/event.api.slice";
// import CardContent from "@mui/material/CardContent/CardContent";
// import { Box, Button, Card, TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import { useSelector } from "react-redux";
// import { RootState } from "../../../redux/store";

// interface FormData {
//   id?: number;
//   name: string;
//   description: string;
//   location: string;
//   date: string;
//   price: number;
//   user_id: number;
//   // file: FileList;
// }

// function AddCard() {
//   const [isVisible, setIsVisible] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<FormData>();
//   const userId = useSelector((state: RootState) => state.authSlicer.user?.id);
//   console.log("userId: ", userId);
//   const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();

//   const onSubmit = async (data: {
//     id?: number;
//     name: string;
//     date: string;
//     description: string;
//     // file: FileList;
//     location: string;
//     price: number;
//     user_id: number;
//   }) => {
//     try {

//       const response = await createEvent({
//         ...data,
//         user_id: userId,
//       }).unwrap();
//       console.log("Event created successfully:", response);
//     } catch (err) {
//       console.error("Error creating event:", err);
//     }
//   };
//   const toggleVisibility = () => {
//     setIsVisible((prev) => !prev);
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
//         {isVisible ? "Закрыть форму" : "Добавить новое событие"}
//       </Button>
//       {isVisible && (
//         <Card
//           sx={{
//             width: 400,
//             padding: 2,
//             backgroundColor: "#E3F2FD",
//             display: "flex",
//             flexDirection: "column",
//             marginBottom: 2,
//             borderRadius: 2,
//           }}
//         >
//           <Typography variant="h5" sx={{ color: "#441752", marginBottom: 2 }}>
//             Добавить новое событие
//           </Typography>
//           <CardContent sx={{ flexGrow: 1 }}>
//             <form onSubmit={handleSubmit(onSubmit)}>
//               {/* <Box sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Добавить изображение"
//                   type="file"
//                   variant="outlined"
//                   {...register("file")}
//                   InputLabelProps={{
//                     shrink: true,
//                   }}
//                 />
//               </Box> */}

//               <Box sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Наименование"
//                   variant="outlined"
//                   placeholder="Введите название"
//                   {...register("name", {
//                     required: "Наименование обязательно",
//                   })}
//                   error={!!errors.name}
//                   //   helperText={errors.title?.message}
//                 />
//               </Box>

//               <Box sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Описание"
//                   variant="outlined"
//                   placeholder="Введите описание"
//                   {...register("description", {
//                     required: "Описание обязательно",
//                   })}
//                   error={!!errors.description}
//                   //   helperText={errors.description?.message}
//                 />
//               </Box>
//               <Box sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Локация"
//                   variant="outlined"
//                   placeholder="Введите локацию"
//                   {...register("location", { required: "Локация обязательна" })}
//                   error={!!errors.location}
//                   //   helperText={errors.location?.message} // Текст ошибки
//                 />
//               </Box>
//               <Box sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   label=""
//                   type="date"
//                   variant="outlined"
//                   placeholder="Введите дату"
//                   {...register("date", { required: "Дата обязательна" })}
//                   error={!!errors.date}
//                   //   helperText={errors.date?.message}
//                 />
//               </Box>

//               <Box sx={{ marginBottom: 2 }}>
//                 <TextField
//                   fullWidth
//                   label="Стоимость"
//                   variant="outlined"
//                   placeholder="Введите стоимость"
//                   {...register("price", {
//                     required: "Если мероприятие бесплатное укажите 00",
//                   })}
//                   error={!!errors.title}
//                   //   helperText={errors.title?.message}
//                 />
//               </Box>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 sx={{
//                   backgroundColor: "#441752",
//                   color: "#CFEBC7",
//                   "&:hover": {
//                     backgroundColor: "#8174A0",
//                   },
//                   marginTop: 2,
//                 }}
//                 type="submit"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Загрузка..." : "Добавить событие"}
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       )}
//       <div></div>
//     </div>
//   );
// }

// export default AddCard;

import { useForm } from "react-hook-form";
import { useCreateEventMutation } from "../../../redux/slice/event.api.slice";
import CardContent from "@mui/material/CardContent/CardContent";
import { Box, Button, Card, TextField, Typography } from "@mui/material";
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
  user_id: number; // Это поле будет хранить ID пользователя
  // file: FileList;
}

function AddCard() {
  const [isVisible, setIsVisible] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const user_id = useSelector((state: RootState) => state.authSlicer.user?.id);
  console.log("userId: ", user_id);
  const [createEvent, { isLoading, isError, error }] = useCreateEventMutation();

  const onSubmit = async (data: {
    id?: number;
    name: string;
    date: string;
    description: string;
    location: string;
    price: number;
    user_id: number;
  }) => {
    try {
      const response = await createEvent({
        ...data,
        user_id: user_id, // Обязательно передайте user_id, а не userId
      }).unwrap();
      console.log("Event created successfully:", response);
    } catch (err) {
      console.error("Error creating event:", err);
    }
  };

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
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
        {isVisible ? "Закрыть форму" : "Добавить новое событие"}
      </Button>
      {isVisible && (
        <Card
          sx={{
            width: 400,
            padding: 2,
            backgroundColor: "#E3F2FD",
            display: "flex",
            flexDirection: "column",
            marginBottom: 2,
            borderRadius: 2,
          }}
        >
          <Typography variant="h5" sx={{ color: "#441752", marginBottom: 2 }}>
            Добавить новое событие
          </Typography>
          <CardContent sx={{ flexGrow: 1 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* <Box sx={{ marginBottom: 2 }}>
                <TextField
                  fullWidth
                  label="Добавить изображение"
                  type="file"
                  variant="outlined"
                  {...register("file")}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Box> */}

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
                  //   helperText={errors.title?.message}
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
                  //   helperText={errors.description?.message}
                />
              </Box>
              <Box sx={{ marginBottom: 2 }}>
                <TextField
                  fullWidth
                  label="Локация"
                  variant="outlined"
                  placeholder="Введите локацию"
                  {...register("location", { required: "Локация обязательна" })}
                  error={!!errors.location}
                  //   helperText={errors.location?.message} // Текст ошибки
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
                  //   helperText={errors.date?.message}
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
                  error={!!errors.title}
                  //   helperText={errors.title?.message}
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
      )}
      <div></div>
    </div>
  );
}

export default AddCard;
