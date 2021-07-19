import React from 'react';

import Card from 'react-bootstrap/Card'

import './dropDownCard.styles.css';

const DropDownCard = (props) =>(
    <Card className={`dropdown-card ${props.className ? props.className : ''}`}>
        {props.children}
    </Card>
)
export default DropDownCard;