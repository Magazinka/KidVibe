import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useForm } from "react-hook-form";
import { useCreateEventMutation } from "../../../redux/slice/event.api.slice";


function AddCard(){
    // const dispatch = useDispatch<AppDispatch>()
    //   const [loginUser, { isLoading, isError, error }] = useCreateEventMutation();
    //   const {
    //     register,
    //     handleSubmit,
    //     // formState: { errors },
    //   } = useForm<User>({});
    
    return(
        <form>
            <label>
                <input type="file"/>
            </label>
            <label>
                Title
                <input/>
            </label>
            <label>
                <input/>
            </label>
        </form>
    )
}

export default AddCard;