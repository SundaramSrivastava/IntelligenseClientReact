import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import './userAccountDropdown.styles.css';

import {logout} from './../../redux/User/user.actions';
import { toggleDropDown } from '../../redux/Header/header.actions';


function UserAccountDropdown(props) {
    const {isDropDownOpen, logout, toggleDropDown} = props
    return (
        <ul className={`dropdown-dashboard ${isDropDownOpen ? '' : 'd-none'}`}>
            <li >
                <Link rel="nofollow" className="logout-user" data-method="delete" to="" onClick={() => {
                    logout()
                    toggleDropDown()
                    }}><div className="far fa-sign-out"></div>
                    Log out
                </Link>
            </li>
        </ul>
    )
}

const mapStateToProps = state => {
    return {
        isDropDownOpen: state.header.isDropDownOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
      logout: () => dispatch(logout()),
      toggleDropDown: () => dispatch(toggleDropDown())
    }
}
  
  

export default connect(mapStateToProps, mapDispatchToProps)(UserAccountDropdown);
