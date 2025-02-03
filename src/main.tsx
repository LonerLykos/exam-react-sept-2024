import {createRoot} from 'react-dom/client'
import './index.scss'
import {Provider} from "react-redux";
import {BrowserRouter} from "react-router-dom";
import {AppRoutes} from "./routes/constants.ts";
import {MainLayout} from "./layouts/MainLayout.tsx";
import {persistor, store} from "./redux/store.ts";
import {PersistGate} from "redux-persist/integration/react";
import {Redirect} from "./components/redirect/Redirect.tsx";

createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <BrowserRouter basename={AppRoutes.root}>
                <MainLayout/>
                <Redirect/>
            </BrowserRouter>
        </PersistGate>
    </Provider>
)
