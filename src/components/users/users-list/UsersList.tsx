import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../../../redux/store.ts";
import {usersSliceActions} from "../../../redux/user-slice/userSlice.ts";
import {IUser} from "../../../models/users-model/IUser.ts";
import {UserItem} from "../user-item/UserItem.tsx";
import {Pagination} from "../../pagination/Pagination.tsx";

export const UsersList = () => {

    const dispatch = useAppDispatch();
    const users = useAppSelector((state) => state.user.users);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        dispatch(usersSliceActions.loadUsers())
    }, [dispatch]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = users.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            {currentItems.map((user:IUser) => <UserItem key={user.id} item={user} />)}
            <Pagination
                totalItems={users.length}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </div>
    );
};
