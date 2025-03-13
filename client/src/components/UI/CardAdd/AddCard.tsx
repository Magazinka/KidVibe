import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useForm } from "react-hook-form";
import { useCreateEventMutation } from "../../../redux/slice/event.api.slice";


function AddCard(){
    const dispatch = useDispatch()
      const [loginUser, { isLoading, isError, error }] = useCreateEventMutation();
      const {
        register,
        handleSubmit,
        // formState: { errors },
      } = useForm<User>({});
    
    return()
}