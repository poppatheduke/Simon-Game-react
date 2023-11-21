import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import FormCss from "../Form.module.css"
import axios from '../api/axios';

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{4,24}$/;
const REGISTER_URL = "/register";

function SignUp(props) {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/Login")
    }
    function handleClick2() {
        navigate("/")
    }

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


    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatchPwd, setValidMatchPwd] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
    }, [user])

    useEffect(() => {
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = pwd === matchPwd;
        setValidMatchPwd(match);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg("");
    }, [user, pwd, matchPwd])

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if button enabled with JS Hack
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);

        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(REGISTER_URL, JSON.stringify({ user, pwd }),
                {
                    headers: { 'Content-type': 'application/json' },
                    withCredentials: true
                })
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
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

    return <section>
        <p
            className={errMsg ? FormCss.errmsg : FormCss.allset}
            ref={errRef}
            aria-live='assertive'>{errMsg}</p>
        <div className={FormCss.form}>
            <div><h1 className={FormCss.form__heading}>Register</h1>
                <form onSubmit={handleSubmit} method="post" action="/">
                    <input
                        className={validName ? FormCss.form__input : FormCss.gameover}
                        type="text"
                        ref={userRef}
                        id='Username'
                        autoComplete='off'
                        onChange={(e) => setUser(e.target.value)}
                        value={user}
                        placeholder="Username"
                        required
                        aria-invalid={validName ? "false" : "true"}
                        aria-describedby='uidnote'
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id='uidnote' className={userFocus && user && !validName ? FormCss.arial : FormCss.offscreen}>
                        4 to 24 characters. <br />
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>
                    <input
                        className={validPwd ? FormCss.form__input : FormCss.gameover}
                        type="password"
                        id='password'
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        placeholder="Password"
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby='pwdidnote'
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)} />
                    <p id='pwdidnote' className={pwdFocus && !validPwd ? FormCss.arialLong : FormCss.offscreen}>
                        4 to 24 characters. <br />
                        Must include upper case letters, smaller case letters, a number and a special character <br />
                        Allowed Special characters: <span aria-label='exclamation mark'>!</span>
                        <span aria-label='at symbol'>@</span>,
                        <span aria-label='dollar sign'>$</span>,
                        <span aria-label='hashtag'>#</span>
                        <span aria-label='percent'>%</span>
                    </p>
                    <input

                        type="password"
                        id='confirmPassword'
                        onChange={(e) => setMatchPwd(e.target.value)}
                        placeholder="Confirm Password"
                        required
                        className={validMatchPwd ? FormCss.form__input : FormCss.gameover}
                        aria-invalid={validMatchPwd ? "false" : "true"}
                        aria-describedby='confirmnote'
                        aria-label=''
                        onFocus={() => setMatchPwdFocus(true)}
                        onBlur={() => setMatchPwdFocus(false)} />
                    <p id='confirmnote' className={matchPwdFocus && !validMatchPwd ? FormCss.arial : FormCss.offscreen}>
                        Must match with the first password input field
                    </p>

                    <button type="submit"
                        name="Button"
                        className={FormCss.form__button__register}
                        disabled={!validName || !validPwd || !validMatchPwd ? true : false}
                    >Register</button>
                </form>
                <a href="#a" onClick={handleClick}>Already have account?</a>
                <a href="#a" onClick={handleClick2}>Back to Game</a>
            </div>

        </div>

    </section>

}

export default SignUp;