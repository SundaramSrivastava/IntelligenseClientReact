import React from 'react';

import "./emailFinderNoLogin.styles.css";

function EmailFinderNoLogin({email}) {
    return (
        <div class="finder-result-email emailFinder">
            <div class="email-container">
                <div class="email">{email}</div>
            </div>
        </div>
    )
}

export default EmailFinderNoLogin
