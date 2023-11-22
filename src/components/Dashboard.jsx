import React, { useState } from 'react';
import FormCss from '../Form.module.css'


function Dashboard(props) {
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
            </div>
        </div>
    );
}

export default Dashboard;