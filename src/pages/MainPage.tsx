import {useAppSelector} from "../redux/store.ts";

const MainPage = () => {

    const personalData = useAppSelector((state) => state.auth.user);
    const status = useAppSelector((state) => state.auth.isAuthenticated)


    return (

        <div>
            {status && personalData ? (
                <>
                    <h1>Welcome {personalData.firstName} {personalData.lastName}</h1>
                    <h2>Nice to see you again</h2>
                    <h3>Now you can start work</h3>


                </>
            ) : (<h1>You need to Sing In</h1>)
            }
        </div>
    );
};

export default MainPage;