import React from 'react';
import { Link } from "react-router-dom";

import './checkYourMailPage.styles.css';

function CheckYourMail() {
    return (
        <div className="cym pageHolder404">
            <div className="dialog404">
                <div className="error-code">MAIL SENT</div>
                <h1>Please Check Your Mail</h1>
                <p>And follow the instructions there for sucessful registration of your account.</p>
                <Link className="cta" to="/">Homepage</Link>
            </div>
        </div>
    )
}

export default CheckYourMail
