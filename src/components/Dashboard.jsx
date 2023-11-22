import React from 'react';
import FormCss from '../Form.module.css'


function Dashboard(props) {

    const highestScore = localStorage.getItem('highestScore') || 0;

    return (
        <div>
            <h1 className={FormCss.allset}>Highest Score: {highestScore}</h1>
        </div>
    );
}

export default Dashboard;