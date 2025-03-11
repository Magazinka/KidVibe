import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useLoginUserMutation } from "../../../redux/slice/api.slice";
import { useDispatch, useSelector } from "react-redux";
import { loginUser as loginUserAction } from "../../../redux/slice/auth.slice";
import { AppDispatch, RootState } from "../../../redux/store";
import { User } from "../../../Types/Types";


// const schema = yup
//   .object({
//     email: yup
//       .string()
//       .email("Email is not valid")
//       .required("Email is required"),
//     password: yup.string().required("Password is required"),
//   })
//   .required();

function Login() {
  const [loginUser, { isLoading, isError, error }] = useLoginUserMutation();
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<User>({
    // resolver: yupResolver(schema), 
  });

  const dispatch = useDispatch<AppDispatch>();

  // Обработчик отправки формы
  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      console.log("Form Data: ", data);

      const response = await loginUser(data).unwrap(); 

      console.log("Login response: ", response);

      // Диспатчим данные пользователя и токен в Redux
      dispatch(loginUserAction(response));
      // dispatch(loginUserAction({ ...response.user, token: response.token }));
      // console.log('loginUserAction: ', loginUser());
    } catch (error) {
      console.log("Error during login: ", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">Your Email:</label>
          <input
            {...register("email")}
            type="text"
            placeholder="Email"
            autoComplete="current-email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Your Password:</label>
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            id="password"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}

export default Login;
