import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AppDispatch, RootState } from "../../../redux/store";
import { useCreateUserMutation } from "../../../redux/slice/api.slice";
import { userData } from "../../../redux/slice/auth.slice";
import { useDispatch, useSelector } from "react-redux";

interface User {
  id?: number;
  login: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    login: yup.string().required("Login not validate"),
    email: yup.string().email("Email not validate"),
    password: yup.string().required("Password not validate"),
  })
  .required();

function Signup() {
  const [createUser, { isLoading, isError, error }] = useCreateUserMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    //  resolver: yupResolver(schema),
  });
  const dispatch = useDispatch<AppDispatch>();

  //   const  id  =
  //     useSelector((state: RootState) => state.authSlicer.user?.id);
  // console.log("id: ", id);
  const onSubmit: SubmitHandler<User> = async (data) => {
    try {
      console.log("DATA: ", data);
      const response = await createUser(data).unwrap();
      console.log("data response: ", response);
      dispatch(userData(response));
    } catch (error) {
      console.log("error sign up: ", error);
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="login">Your Login:</label>
          <input
            {...register("login")}
            placeholder="login"
            type="text"
            id="login"
          />
        </div>
        <div>
          <label htmlFor="email">Your Email:</label>
          <input
            {...register("email")}
            type="text"
            placeholder="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Your Password:</label>
          <input
            {...register("password")}
            type="text"
            id="password"
            placeholder="password"
          />
          {errors.password && <p>{errors.password?.message}</p>}
        </div>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Signup;
