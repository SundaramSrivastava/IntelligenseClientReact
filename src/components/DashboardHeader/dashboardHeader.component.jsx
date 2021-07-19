import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import './dashboardHeader.styles.css';

import LogoImage from '../../assets/image/Intelligense White tag.png';
import UserAccountDropdownComponent from '../UserAccountDropdown/userAccountDropdown.component';

import { toggleDropDown } from '../../redux/Header/header.actions';

function DashboardHeader({toggleDropDown, user, isLoggedIn, activePage}) {
    let infoImage = ``
    if(isLoggedIn){
        infoImage = `https://i2.wp.com/ui-avatars.com/api/${user ? user.firstname[0] : 'u'}+${user ? user.lastname[0] : 'u'}/128/168eea/fff?ssl=1`
    }

    const navLinks = [
        {
            link: '/bulk',
            icon: 'icon-List-1',
            name: 'Bulks',
        },
        {
            link: '/verify',
            icon: 'icon-Circle-Check-2',
            name: 'Verifier'
        },
        {
            link: '/finder',
            icon: 'icon-Target-User',
            name: 'Finder'
        },
        {
            link: '/search',
            icon: 'icon-Magnifying-Glass-1',
            name: 'Search'
        }
    ]
    
    return (
        <div className="dashboard-header">
            <nav className="navbar">
                <div className="brand">
                <Link to='/search'>
                    <img src={LogoImage} alt='IntelligenSe' />
                </Link>
                </div>
                <div className="menu">
                    <ul>
                        {
                            navLinks.map((item, index) => (
                                <li className="nav-link" key={index}>
                                    <Link className={item.name === activePage ? "active" : ""} to={item.link}>
                                        <div className={`icon ${item.icon}`}></div>
                                        <span className="hidden-xs">{item.name}</span>
                                    </Link>
                                </li>
                            ))
                        }
                        {/* <li className="nav-link" id="bulks-nav-link">
                            <Link className={isActive(bulk)} to="/bulk">
                                <div className="icon icon-List-1"></div>
                                <span className="hidden-xs">Bulks</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link className="" to="/verify">
                                <div className="icon icon-Circle-Check-2"></div>
                                <span className="hidden-xs">Verifier</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link className="" to="/find">
                                <div className="icon icon-Target-User"></div>
                                <span className="hidden-xs">Finder</span>
                            </Link>
                        </li>
                        <li className="nav-link">
                            <Link className="active" to="/search">
                                <div className="icon icon-Magnifying-Glass-1"></div>
                                <span className="hidden-xs">Search</span>
                            </Link>
                        </li> */}
                    </ul>
                </div>
                <div className="user">
                    <ul>
                        <li className="nav-link" id="dropdown-account-link" tabIndex="0" 
                        onFocus={(e) => {
                            if (e.currentTarget === e.target) {
                            } else {
                            }
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                              // Not triggered when swapping focus between children
                              toggleDropDown()
                            }
                          }}
                          onBlur={(e) => {
                            if (e.currentTarget === e.target) {
                            } else {
                              toggleDropDown()
                            }
                            if (!e.currentTarget.contains(e.relatedTarget)) {
                              // Not triggered when swapping focus between children
                              toggleDropDown()
                            }
                          }}
                          >
                            <span className="fas fa-angle-down hidden-xs hidden-sm"></span>
                            <div className="profile-pic pic-float">
                                <img alt="Profile"  src={infoImage} />
                            </div>
                            <div className="account-information hidden-xs hidden-sm">
                                <strong>{user ? `${user.firstname} ${user.lastname}` : '' }</strong>
                                <br />
                                <span className="light-grey">Free plan</span>
                            </div>

                        <UserAccountDropdownComponent />
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    )
}

const mapStateToProps = state => {
    return {
      user: state.user.user,
      isLoggedIn: state.user.isLoggedIn
    }
}

const mapDispatchToProps = dispatch => {
    return {
      toggleDropDown: () => dispatch(toggleDropDown())
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(DashboardHeader)
