import {createRoot} from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/constants.ts";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {store} from "./redux/store.ts";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <BrowserRouter basename={AppRoutes.root}>
            <MainLayout/>
        </BrowserRouter>
    </Provider>
)
