import React from 'react';
import { useNavigate } from "react-router-dom";
import FormCss from "../Form.module.css"

function Login() {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/SignUp")
    }
    
    function handleClick2() {
        navigate("/")
    }

    return (

        <div className={FormCss.form}>
            <div><h1 className={FormCss.form__heading}>Login</h1>
                <div className={FormCss.form__items}><form method="post" action="/">
                    <input className={FormCss.form__input} type="text" name='Username' placeholder="Username" required />

                    <input className={FormCss.form__input} type="password" name='Password' placeholder="Password" required />



                    <button type="submit" name="Button" className={FormCss.form__button}>Login</button>
                </form></div>
                
                <a href="#a" onClick={handleClick}>Create a new account</a>
                <a href="#a" onClick={handleClick2}>Back to Game</a>
            </div>

        </div>
    );
}

export default Login;