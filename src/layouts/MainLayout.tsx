import {RoutesComponent} from "../routes/routes.tsx";
import {Menu} from "../components/menu/Menu.tsx";
import {Search} from "../components/search/Search.tsx";

export const MainLayout = () => {
    return (
        <div>
            <Menu/>
            <Search/>
            <RoutesComponent/>
        </div>
    );
};
