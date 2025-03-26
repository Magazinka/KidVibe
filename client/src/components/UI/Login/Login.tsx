// import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useLoginUserMutation } from "../../../redux/slice/api.slice";
// import { useDispatch, useSelector } from "react-redux";
// import { loginUser as loginUserAction } from "../../../redux/slice/auth.slice";
// import { AppDispatch, RootState } from "../../../redux/store";
// import { User } from "../../../Types/Types";

// import { TextField, Button, CircularProgress, Box } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// const shantellSans = "'Shantell Sans', sans-serif";

// function Login() {
//   const navigate = useNavigate();
//   const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
//   const {
//     register,
//     handleSubmit,
//     // formState: { errors },
//   } = useForm<User>({});

//   const dispatch = useDispatch<AppDispatch>();
//   const { user } = useSelector((state: RootState) => state.authSlicer);

//   const onSubmit: SubmitHandler<User> = async (data) => {
//     try {
//       console.log("Form Data: ", data);

//       const response = await loginUser(data).unwrap();

//       console.log("Login response: ", response);

//       dispatch(loginUserAction(response));
//       navigate("/");
//     } catch (error) {
//       console.log("Error during login: ", error);
//     }
//   };

//   return (
//     <Box>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         <TextField
//           {...register("email")}
//           label="Your Email"
//           type="email"
//           variant="outlined"
//           fullWidth
//           required
//           sx={{
//             fontFamily: shantellSans, // Шрифт для поля ввода
//           }}
//         />
//         <TextField
//           {...register("password")}
//           label="Your Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           required
//           sx={{
//             marginTop: 2,
//             fontFamily: shantellSans, // Шрифт для поля ввода
//           }}
//         />
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{
//             marginTop: 2,
//             backgroundColor: "#8174A0", // Цвет фона кнопки
//             color: "#CFEBC7", // Цвет текста на кнопке
//             fontFamily: shantellSans, // Шрифт для кнопки
//             "&:hover": {
//               backgroundColor: "#441752", // Цвет кнопки при наведении
//             },
//           }}
//           disabled={isLoading}
//         >
//           {isLoading ? (
//             <CircularProgress size={24} sx={{ color: "white" }} />
//           ) : (
//             "Login"
//           )}
//         </Button>
//       </form>
//     </Box>
//   );
// }

// export default Login;
import { useForm, SubmitHandler } from "react-hook-form";
import { useLoginUserMutation } from "../../../redux/slice/api.slice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser as loginUserAction } from "../../../redux/slice/auth.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { User } from "../../../Types/Types";

import { TextField, Button, CircularProgress, Box, Snackbar, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const shantellSans = "'Shantell Sans', sans-serif";

function Login() {
  const navigate = useNavigate();
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authSlicer);

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      console.log("Form Data: ", data);

      const response = await loginUser(data).unwrap();

      console.log("Login response: ", response);

      dispatch(loginUserAction(response));
      navigate("/");
    } catch (error) {
      console.log("Error during login: ", error);
      // Show an error message in case of failure
      setErrorMessage("Login failed. Please check your credentials.");
      setOpenSnackbar(true);
    }
  };

  // Close the snackbar after a short period
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Please enter a valid email",
            },
          })}
          label="Your Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          sx={{
            fontFamily: shantellSans,
          }}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          {...register("password", { required: "Password is required" })}
          label="Your Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{
            marginTop: 2,
            fontFamily: shantellSans,
          }}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: "#8174A0",
            color: "#CFEBC7",
            fontFamily: shantellSans,
            "&:hover": {
              backgroundColor: "#441752",
            },
          }}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} sx={{ color: "white" }} />
          ) : (
            "Login"
          )}
        </Button>
      </form>

      {/* Snackbar for error feedback */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Login;
