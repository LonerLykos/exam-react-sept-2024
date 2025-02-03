import {useAppSelector} from "../../redux/store.ts";
import "./MainPageInfo.scss"
import classNames from "classnames";

export const MainPageInfo = () => {
    const personalData = useAppSelector((state) => state.auth.user);
    const status = useAppSelector((state) => state.auth.isAuthenticated)


    return (

        <div className={classNames('main-page-info-wrapper')}>
            {status && personalData ? (
                <>
                    <h1>Welcome <span>{personalData.firstName} {personalData.lastName}</span></h1>
                    <h2>Nice to see you again</h2>
                    <h3>Now you can start work</h3>


                </>
            ) : (<h1>You need to Sing In</h1>)
            }
        </div>
    );
};
