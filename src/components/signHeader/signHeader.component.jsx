import React from 'react';
import { Link } from "react-router-dom";

import LogoImage from '../../assets/image/Intelligense White tag.png';

import './signHeader.styles.css';

function SignHeader({goToPage}) {
    return (
        <div className="login-header">
                <Link to='/'className="login-navbar-logo">
                    <img src={LogoImage} alt='IntelligenSe' />
                </Link>
                <div className="grey pull-right hidden-xs">
                    Don't have an account? <Link to={`/users/sign-${goToPage}`}>Sign {goToPage}</Link>.
                </div>
        </div>
    )
}

export default SignHeader
