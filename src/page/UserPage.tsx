import {useEffect} from 'react';
import cl from './user.module.css';
import {Params, useNavigate, useParams} from "react-router-dom";
import {HOME_ROUTER, LOGIN_ROUTE} from "../utill/constants";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";
import {fetchUserId, logOut} from "../store/slice";
import { MdOutlineEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";




const UserPage = () => {
    const auth = useAppSelector(state => state.users.token) !== ''
    const navigate = useNavigate();
    const params: Readonly<Params> = useParams();
    const user = useAppSelector(state => state.users.user);
    const dispatch = useAppDispatch();


    function randomInteger(min:number, max:number): number {
        const rand = min + Math.random() * (max + 1 - min);
        return Math.floor(rand);
    }

    const phoneGenerator = () => {
        return [
            '+7 ',
            '(',
            randomInteger(0,999).toString().padStart(3,'0'),
            ') ',
            randomInteger(0,999).toString().padStart(3,'0'),
            '-',
            randomInteger(0,99).toString().padStart(2,'0'),
            '-',
            randomInteger(0,99).toString().padStart(2,'0'),
        ].join('');
    }



    useEffect(() => {
        if(params.id) dispatch(fetchUserId(params.id));
    }, [dispatch]);

    function handleSignin() {
        navigate(LOGIN_ROUTE);
    }

    function handleSignup() {
        dispatch(logOut());
        navigate(HOME_ROUTER);
    }

    console.log(user)

    return <div>
                <div className={cl.container}>
                    <div className={cl.title}>
                        <img src={user.avatar} alt=""/>
                        <div className={cl.block}>
                            <div className={cl.span}><span>{user.first_name}</span><span>{user.last_name}</span></div>
                            <p>Партнер</p>
                        </div>
                    </div>
                    <button
                        className={cl.back}
                        onClick={()=> navigate(HOME_ROUTER)}
                    >Назад</button>
                    {auth
                        ?  <button className={cl.sign} onClick={handleSignup}>Выход</button>
                        :  <button className={cl.sign} onClick={handleSignin}>Вход</button>
                    }
                </div>
                <div className={cl.containerTitle}>
                    <div className={cl.text}>
                        <p>
                            Клиенты видят в нем эксперта по вопросам разработки комплексных решений финансовых продуктов, включая такие аспекты, как организационная структура, процессы, аналитика и ИТ-компоненты. Он помогает клиентам лучше понимать структуру рисков их бизнеса, улучшать процессы за счет применения новейших технологий и увеличивать продажи, используя самые современные аналитические инструменты.
                        </p>
                        <p>
                            В работе с клиентами недостаточно просто решить конкретную проблему или помочь справиться с трудностями. Не менее важно уделять внимание обмену знаниями: "Один из самых позитивных моментов — это осознание того, что ты помог клиенту перейти на совершенно новый уровень компетентности, уверенность в том, что после окончания проекта у клиента есть все необходимое, чтобы дальше развиваться самостоятельно".
                        </p>
                        <p>
                            Помимо разнообразных проектов для клиентов финансового сектора, Сорин ведет активную предпринимательскую деятельность. Он является совладельцем сети клиник эстетической медицины в Швейцарии, предлагающей инновационный подход к красоте, а также инвестором других бизнес-проектов.
                        </p>
                    </div>
                    <div className={cl.message}>
                        <div className={cl.row}>
                            <MdOutlineEmail/><p>{user.email}</p>
                        </div>
                        <div className={cl.row}>
                            <FaPhoneAlt /><p>{phoneGenerator()}</p>
                        </div>
                    </div>
                </div>
        </div>;
};

export default UserPage;