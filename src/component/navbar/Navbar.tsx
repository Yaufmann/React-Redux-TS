
import cl from './navbar.module.css';
import {useNavigate} from "react-router-dom";
import {HOME_ROUTER, LOGIN_ROUTE} from "../../utill/constants";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks.ts";
import {logOut} from "../../store/slice.ts";

const Navbar = () => {
    const auth = useAppSelector(state => state.users.token) !== ''
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    function handleSignIn() {
        navigate(LOGIN_ROUTE);
    }

    function handleSignup() {
        dispatch(logOut());
        navigate(HOME_ROUTER);
    }

    return (
        <div className={cl.container}>
            <div className={cl.title}>
                <h1>Наша команда</h1>
                <p>
                Это опытные специалисты, хорошо разбирающиеся во всех
                задачах, которые ложатся на их плечи, и умеющие находить выход из любых,
                даже самых сложных ситуаций.
                </p>
            </div>
            {auth
                ?  <button onClick={handleSignup}>Выход</button>
                :  <button onClick={handleSignIn}>Вход</button>
            }
        </div>
    );
};

export default Navbar;