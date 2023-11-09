import React from 'react';
import { useNavigate } from "react-router-dom";
import HelpCss from "../htp.css"


function Help() {

    const navigate = useNavigate();

    function handleClick() {
        navigate("/SignUp")
    }

    function handleClick2() {
        navigate("/")
    }

    return (<div><h1 className='heading'>How to play simon game</h1>

        <p>First Press the Start button, immediately you do that
            you realize one of the button flashes. Press that button.
            After pressing that button another button flashes, so now it means you hav two flased buttons
            then you will have to press those two buttons after pressing those two buttons you realize a third button flashes
            it maybe the same colour as before or not. You keep doing this to increase your Level.
            when you disrupt the pattern its GAMEOVER.

            Have Fun!
        </p>
        <a href="#a" onClick={handleClick2}>Back &larr;</a>
        ;</div>)
}

export default Help;
