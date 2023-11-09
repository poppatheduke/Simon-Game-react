import React from 'react';
import { useNavigate } from "react-router-dom";
import FormCss from "../Form.module.css"

function SignUp(props) {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/Login")
    }
    function handleClick2() {
        navigate("/")
    }

    return (

        <div className={FormCss.form}>
            <div><h1 className={FormCss.form__heading}>Register</h1>
                <form method="post" action="/">
                    <input className={FormCss.form__input} type="text" placeholder="Username" required />

                    <input className={FormCss.form__input} type="password" placeholder="Password" required />
                    <input className={FormCss.form__input} type="password" placeholder="Confirm Password" required />


                    <button type="submit" name="Button" className={FormCss.form__button__register}>Register</button>
                </form>
                <a href="#a" onClick={handleClick}>Already have account?</a>
                <a href="#a" onClick={handleClick2}>Back to Game</a>
            </div>

        </div>
    );
}

export default SignUp;