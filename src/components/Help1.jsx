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

        <p>Welcome to the Simon game—a game that tests your memory and reflexes!
            The objective is simple: pay attention to the sequence of flashing buttons and repeat it.

            It all starts with one button lighting up.
            Your task is to press that button.
            After successfully pressing it, a new button joins the sequence,
            and you need to replicate the entire pattern by pressing the original button and the newly lit one.
            As you progress,
            more buttons will flash in a specific order,
            and your challenge is to remember and reproduce the sequence accurately.

            The game keeps getting more exciting as the sequences grow longer,
            testing your ability to recall and replicate complex patterns.
            Be prepared for a twist—sometimes the new button in the sequence will be the same color as before,
            and other times it'll be a different one, adding an extra layer of challenge.

            The key is to stay focused and keep pace with the increasing complexity.
            However, be cautious!
            If you make a mistake and disrupt the pattern,
            it's GAME OVER. So, sharpen your memory skills, embrace the challenge,
            and most importantly, have fun!

        </p>
        <a href="#a" onClick={handleClick2}>Back &larr;</a>
        ;</div>)
}

export default Help;
