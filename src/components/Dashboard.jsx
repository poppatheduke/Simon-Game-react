import React, { useState } from 'react';
import FormCss from '../Form.module.css';
import { useNavigate } from 'react-router-dom';


function Dashboard(props) {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/");
    }


    const [, forceUpdate] = useState();

    const highestScore = localStorage.getItem('highestScore') || 0;

    const clearHighestScore = (e) => {

        if (highestScore > 0) {
            localStorage.removeItem("highestScore", "0");

            forceUpdate(prevState => !prevState);
        }
    }
    return (
        <div>
            <h1 className={FormCss.allset}>Highest Score: {highestScore}</h1>

            <div className={FormCss.form}>
                <button
                    className={FormCss.form__button}
                    onClick={clearHighestScore}>Reset High Score</button>

                <a href=".." onClick={handleClick}>Back</a>
            </div>


        </div>
    );
}

export default Dashboard;