import React, {useState} from 'react';
import cl from './auth.module.css';
import {fetchLogin, fetchRegister} from "../store/slice";
import {useAppDispatch} from "../hooks/hooks";


const Auth = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [registerForm,setRegisterForm] = useState(true);
    const dispatch = useAppDispatch();
    const [error,setError] = useState(false);

    const inputClasses: string[] = [cl.input]

    if (error) {
        inputClasses.push(cl.active);
    }




    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
       e.preventDefault()
       if (email.length > 6 && password.length > 6) {
           const method = registerForm ? fetchRegister : fetchLogin;
           dispatch(method({email,password}))
       } else {
           setError(true);
           setEmail('');
           setPassword('');
       }
    }

    const click = () => {
        setRegisterForm(!registerForm)
    }

    return (
        <div className={cl.container}>
            <form className={cl.authBlock}>
                {registerForm ? <h1>Авторизация</h1> : <h1>Регистрация</h1>}
                <h3>Электронная почта</h3>
                <input
                    className={inputClasses.join(' ')}
                    value={email}
                    type='text'
                    placeholder={error ? "Введите минимум 6 символов" : "Введите ваш email..."}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                        setError(false)
                        setEmail(e.target.value)
                    }}
                />
                <h3>Пароль</h3>
                <input
                    className={inputClasses.join(' ')}
                    value={password}
                    type='text'
                    placeholder={error ? "Введите минимум 6 символов" : "Введите ваш пароль..."}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                        setError(false)
                        setPassword(e.target.value)
                    }}
                />
                <div className={cl.button}>
                <button onClick={handleClick}>{registerForm ? 'Войти' : 'Зарегистрироваться'}</button>
                {registerForm
                ? <div>Нет аккаунта? <span onClick={click}>Регистрация</span></div>
                : <div>Есть аккаунт? <span onClick={click}>Войдите</span></div>
                }
                </div>
            </form>
        </div>
    );
};

export default Auth;