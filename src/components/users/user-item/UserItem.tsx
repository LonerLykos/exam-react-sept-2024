import {FC} from "react";
import {IUser} from "../../../models/users-model/IUser.ts";
import {generatePath, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../redux/store.ts";
import {usersSliceActions} from "../../../redux/user-slice/userSlice.ts";

interface Props {
    item: IUser;
}

export const UserItem: FC<Props> = ({item}) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userDetails = () => {

        dispatch(usersSliceActions.setSelectedUser(item));
        const path = generatePath('user/:id', {id: `${item.id}`});
        navigate(path);
    }
    
    return (
        <div>
            <h2>{item.firstName} {item.lastName}</h2>
                <h3>Age: {item.age}</h3>
                <p>Email: {item.email}</p>
            <button onClick={userDetails}>Info</button>
        </div>
    );
};
