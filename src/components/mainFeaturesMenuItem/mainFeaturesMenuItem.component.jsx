import React from 'react';
import { Link } from "react-router-dom";

import './mainFeaturesMenuItem.styles.css';

function MainFeatureMenuItem(props) {
    const {link, icon, heading} = props;
    return (
        <Link to={link} className="mainFeature" {...props}>
            {icon ? <div className={`icon ${icon}`}></div> : ('')}
            <div className="content">
                <strong>{heading}</strong>
                {props.children}
            </div>
        </Link>
    )
}

export default MainFeatureMenuItem
