import {useEffect} from 'react';
import cl from './body.module.css';
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {fetchUsers} from "../../store/slice";
import Navbar from "../navbar/Navbar";
import Card from "./Card";

const Body = () => {
    const users = useAppSelector(state => state.users.data);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    return (
        <>
        <Navbar/>
        <div className={cl.container}>
            <div className={cl.cardContainer}>
             {users.map(item =>
                 <Card key={item.id} item={item}/>
             )}
            </div>
        </div>
        </>
    );
};

export default Body;