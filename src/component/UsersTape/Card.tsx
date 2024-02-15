import {FC} from 'react';
import cl from './body.module.css';
import {useNavigate} from "react-router-dom";
import {USER_ROUTE} from "../../utill/constants";
export interface CardItem {
   avatar: string,
   email: string,
   first_name: string,
   id: number,
   last_name: string
}

interface Card {
    item: CardItem,
}

const Card: FC<Card> = ({item}) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(USER_ROUTE + '/' + item.id)}
            className={cl.itemContainer}
        >
            <img src={item.avatar}  alt=""/>
            <div className={cl.secondTitle}>
                <span>{item.first_name}</span><span>{item.last_name}</span>
            </div>
        </div>
    );
};

export default Card;