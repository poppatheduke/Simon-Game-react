import React, { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthProvider"
import { useNavigate } from "react-router-dom";
import FormCss from "../Form.module.css"
import axios from '../api/axios';

const LOGIN_URL = "/auth"

function Login() {
    const loginError = () => {
        setTimeout(() => {
            document.querySelector("body").classList.add("game-over");
        }, 0);
        setTimeout(() => {
            document.querySelector("body").classList.remove("game-over");
        }, 800);
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();
    }

    const { setAuth } = useContext(AuthContext);
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({ user, pwd }), {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            console.log(JSON.stringify(response?.data));
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, pwd, roles, accessToken })
            setUser("");
            setPwd("")
            navigate("/Dashboard");
        } catch (error) {
            if (!error?.response) {
                setErrMsg("No Server Respnse");
                loginError();
            } else if (error.response?.status === 400) {
                setErrMsg("Missing Username or Password")
                loginError();
            } else if (error.response?.status === 401) {
                setErrMsg("Unauthorized")
                loginError();
            } else {
                setErrMsg("Login failed")
                loginError();
            }
        }
    }


    const navigate = useNavigate();

    function handleClick() {
        navigate("/SignUp")
    }

    function handleClick2() {
        navigate("/")
    }

    return (
        <section>
            <p className={errMsg ? FormCss.errmsg : FormCss.allset} ref={errRef} aria-live='assertive'>{errMsg}</p>
            <div className={FormCss.form}>
                <div><h1 className={FormCss.form__heading}>Login</h1>
                    <div className={FormCss.form__items}><form onSubmit={handleSubmit} method="post" action="/">
                        <input ref={userRef}
                            className={FormCss.form__input}
                            type="text" id='Username'
                            placeholder="Username"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required />
                        <input
                            className={FormCss.form__input}
                            type="password" id='password'
                            placeholder="Password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required />

                        <button type="submit" name="Button" className={FormCss.form__button}>Login</button>
                    </form></div>

                    <a href="#a" onClick={handleClick}>Create a new account</a>
                    <a href="#a" onClick={handleClick2}>Back to Game</a>
                </div>

            </div></section>

    );
}

export default Login;