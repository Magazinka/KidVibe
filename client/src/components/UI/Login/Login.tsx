import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation } from "../../../redux/slice/api.slice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser as loginUserAction } from "../../../redux/slice/auth.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { User } from "../../../Types/Types";

import { TextField, Button, CircularProgress, Box } from "@mui/material";

const shantellSans = "'Shantell Sans', sans-serif";

function Login() {
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<User>({});

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authSlicer);

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      console.log("Form Data: ", data);

      const response = await loginUser(data).unwrap();

      console.log("Login response: ", response);

      dispatch(loginUserAction(response));
    } catch (error) {
      console.log("Error during login: ", error);
    }
  };

  return (
    <Box

    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("email")}
          label="Your Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          sx={{
            fontFamily: shantellSans, // Шрифт для поля ввода
          }}
        />
        <TextField
          {...register("password")}
          label="Your Password"
          type="password"
          variant="outlined"
          fullWidth
          required
          sx={{
            marginTop: 2,
            fontFamily: shantellSans, // Шрифт для поля ввода
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{
            marginTop: 2,
            backgroundColor: "#8174A0", // Цвет фона кнопки
            color: "#CFEBC7", // Цвет текста на кнопке
            fontFamily: shantellSans, // Шрифт для кнопки
            "&:hover": {
              backgroundColor: "#441752", // Цвет кнопки при наведении
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
    </Box>
  );
}

export default Login;
