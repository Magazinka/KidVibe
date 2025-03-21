import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useCreateUserMutation } from "../../../redux/slice/api.slice";
import { userData } from "../../../redux/slice/auth.slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { User } from "../../../Types/Types";
import { useNavigate } from "react-router-dom";

import { TextField, Button, CircularProgress, Box } from "@mui/material";

const shantellSans = "'Shantell Sans', sans-serif";

const schema = yup
  .object({
    login: yup.string().required("Login is required"),
    email: yup
      .string()
      .email("Email is not valid")
      .required("Email is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

function Signup() {
  const navigate = useNavigate();
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.authSlicer);

  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      console.log("Form Data: ", data);

      const response = await createUser(data).unwrap();

      console.log("Signup response: ", response);

      dispatch(userData(response));
      navigate("/");
    } catch (error) {
      console.log("Error during signup: ", error);
    }
  };
  console.log("USERDATA: ", user);

  return (
    <Box
      sx={{
        maxWidth: 400,
        margin: "auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "#F5F5F5", // Цвет фона страницы
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register("login")}
          label="Your Login"
          type="text"
          variant="outlined"
          fullWidth
          required
          error={!!errors.login}
          helperText={errors.login?.message}
          sx={{
            fontFamily: shantellSans, // Шрифт для поля ввода
          }}
        />
        <TextField
          {...register("email")}
          label="Your Email"
          type="email"
          variant="outlined"
          fullWidth
          required
          error={!!errors.email}
          helperText={errors.email?.message}
          sx={{
            marginTop: 2,
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
          error={!!errors.password}
          helperText={errors.password?.message}
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
            "Sign Up"
          )}
        </Button>
      </form>
    </Box>
  );
}

export default Signup;
