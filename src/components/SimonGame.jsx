import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom"

const colors = ["green", "red", "orange", "blue"];

function SimonGame(props) {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/Login")
    }
    function handleClick2() {
        navigate("/Help")
    }

    const customStyle = {
        display: "inline-block",
        margin: "7px"

    }


    //userState
    const [sequence, setSequence] = useState([]);
    const [playing, setPlaying] = useState(false);
    const [playingIdx, setPlayingIdx] = useState(0);
    //refs
    const greenRef = useRef(null);
    const redRef = useRef(null);
    const orangeRef = useRef(null);
    const blueRef = useRef(null);


    //functions
    document.addEventListener("keypress", function() {
        if (!playing) {
            setPlaying(true)
            addNewColor();
        }
    });

    function addNewColor() {
        const color = colors[Math.floor(Math.random() * 4)]
        const newSequence = [...sequence, color]
        setSequence(newSequence);
    }

    function handleNextLevel() {

        if (!playing) {
            setPlaying(true)
            addNewColor();
        }
    }



    function handleColorClick(e) {
        if (playing) {
            const clickColor = e.target.getAttribute("color");
            playSound(clickColor);
            //clicked  the correct color of the sequence
            if (sequence[playingIdx] === clickColor) {
                //clicked  the last color of the sequence
                if (playingIdx === sequence.length - 1) {
                    setTimeout(() => {
                        setPlayingIdx(0);
                        addNewColor();
                    }, 250);
                }
                // missing some colors to be picked
                else {
                    setPlayingIdx(playingIdx + 1)
                }
            }
            //clicked  the incorrect color of the sequence
            else {
                resetGame();
                setTimeout(() => {

                    document.querySelector("#level-title").innerHTML = "Game Over";
                    document.querySelector("body").classList.add("game-over");
                }, 0);
                setTimeout(() => {
                    document.querySelector("#level-title").innerHTML = "Click On Start To Begin";
                    document.querySelector("body").classList.remove("game-over");

                }, 800);


            }
        }
    }
    function resetGame() {
        setSequence([]);
        setPlaying(false)
        setPlayingIdx(0)
        var wrong = new Audio("sounds/wrong.mp3");
        wrong.play();

    }
    //useEffect
    useEffect(() => {
        if (sequence.length > 0) {
            function showSequence(idx = 0) {
                let ref = null;
                if (sequence[idx] === "green") ref = greenRef
                if (sequence[idx] === "red") ref = redRef
                if (sequence[idx] === "orange") ref = orangeRef
                if (sequence[idx] === "blue") ref = blueRef

                //highlight the ref
                setTimeout(() => {
                    ref.current.classList.add("pressed");

                    setTimeout(() => {
                        ref.current.classList.remove("pressed");
                        if (idx < sequence.length - 1) showSequence(idx + 1);
                    }, 250);
                }, 250);
            };
            showSequence();
        }
    }
        , [sequence])

    function playSound(click) {
        switch (click) {
            case "blue":
                var blue = new Audio("sounds/blue.mp3");
                blue.play();
                break;

            case "green":
                var green = new Audio("sounds/green.mp3");
                green.play();
                break;

            case "red":
                var red = new Audio("sounds/red.mp3");
                red.play();
                break;

            case "orange":
                var orange = new Audio("sounds/orange.mp3");
                orange.play();
                break;

            default:
                console.log(click);
        }
    }
    return (
        <div><h1 id="level-title">{sequence.length === 0 ? "Press Any Key to Start" : "Level " + sequence.length}</h1>
            <div className="container">
                <div className="row">

                    <div type="button" id="green" color='green' className="btn green" onClick={handleColorClick} ref={greenRef}>

                    </div>

                    <div type="button" id="red" color='red' className="btn red" onClick={handleColorClick} ref={redRef}>

                    </div>
                </div>

                <div className="row">

                    <div type="button" id="orange" color='orange' className="btn orange" onClick={handleColorClick} ref={orangeRef}>

                    </div>
                    <div type="button" id="blue" color='blue' className="btn blue" onClick={handleColorClick} ref={blueRef}>

                    </div>

                </div>

            </div>

            <button type="button" className='button' name="button" onClick={handleNextLevel}>{sequence.length === 0 ? "Start" : "L: " + sequence.length}</button>

            <a href="#A" onClick={handleClick2} style={customStyle}>How to play</a>

            <a href="#A" style={customStyle} onClick={handleClick}>Check Scoreboard</a>
            <footer>
                <a href="https://black-elon-musk.netlify.app/"> Black Elon Musk 😎💰</a>
            </footer>

        </div>


    );
}

export default SimonGame;