import {useAppSelector} from "../hooks/hooks.ts";
import Auth from "./Auth.tsx";
import Body from "../component/UsersTape/Body.tsx";

const HomePage = () => {
    const isAuth = useAppSelector(state => state.users.token) !== ''
    // const navigate = useNavigate();

    return (
        <>
            {isAuth
                ? <Body/>
                : <Auth/>
            }
        </>
    );
};

export default HomePage;