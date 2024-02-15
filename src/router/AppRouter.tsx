import {Route, Routes} from "react-router-dom";
import {HOME_ROUTER, REGISTER_ROUTE, USER_ROUTE} from "../utill/constants";
import Auth from "../page/Auth";
import UserPage from "../page/UserPage";

import HomePage from "../page/HomePage.tsx";

const AppRouter = () => {


    return (
        <Routes>
            <Route path={HOME_ROUTER} element={<HomePage/>}/>
            <Route path={REGISTER_ROUTE} element={<Auth/>}/>
            <Route path={USER_ROUTE + '/:id'} element={<UserPage/>}/>
        </Routes>
    );
};

export default AppRouter;