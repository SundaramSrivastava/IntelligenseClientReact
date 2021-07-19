import React from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import Container from 'react-bootstrap/Container';

import './header.styles.css';

import LogoImage from '../../assets/image/Intelligense White tag.png';
import DropDownCard from '../dropDown-Card/dropDownCard.component';
import MainFeatureMenuItem from '../mainFeaturesMenuItem/mainFeaturesMenuItem.component';

import {login, logout} from './../../redux/User/user.actions';

const Header = ({isLoggedIn, user}) => (
    
    <nav className="nav-bar">
        <Container>
            <div className="navbar-logo">
                <Link to='/'>
                    <img src={LogoImage} alt='IntelligenSe' />
                </Link>
            </div>
            <div className="navbar-menu">
                <div className="menu-container">
                    <div className="pull-left">
                        <ul className="menu">
                            <li>
                                <Link className="menu-item dropper" to="">Product <span className="arrow-down fas fa-angle-down"></span></Link>
                                <DropDownCard>
                                    <div className="main-features">
                                        <MainFeatureMenuItem icon={'icon-Magnifying-Glass-1'} link={'/domain-search'} heading={'Domain Search'}>
                                            Find the email addresses of a company.
                                        </MainFeatureMenuItem>
                                        <MainFeatureMenuItem icon={'icon-Target-User'} link={'/email-finder'} heading={'Email Finder'}>
                                            Find the email address of a professional.
                                        </MainFeatureMenuItem>
                                        <MainFeatureMenuItem icon={'icon-Circle-Check-2'} link={'/email-verifier'} heading={'Email Verify'}>
                                            Verify any email address.
                                        </MainFeatureMenuItem>
                                    </div>
                                    <div className="additional-features">
                                        <Link to="/chrome">Chrome extension</Link>
                                        <Link to="/sheets">Google Sheets add-on</Link>
                                        <Link to="/bulks">Bulk tasks</Link>
                                        <Link to="/cold-email-campaigns">Campaigns</Link>
                                    </div>
                                </DropDownCard>
                            </li>
                            <li>
                                <Link className="menu-item" to="">Pricing</Link>
                            </li>
                            <li>
                                <Link className="menu-item dropper" to="">Resources <span className="arrow-down fas fa-angle-down"></span></Link>
                                <DropDownCard className="small">
                                    <div className="main-features">
                                        <MainFeatureMenuItem link={''} heading={'Blog'} target={'_blank'}>
                                            Cold email outreach and growth strategies
                                        </MainFeatureMenuItem>
                                        <MainFeatureMenuItem link={''} heading={'Templates'} target={'_blank'}>
                                            Directory of best cold email templates.
                                        </MainFeatureMenuItem>
                                        <MainFeatureMenuItem link={''} heading={'Help Center'} target={'_blank'}>
                                            Your questions on IntelligenSe answered.
                                        </MainFeatureMenuItem>
                                    </div>
                                </DropDownCard>
                            </li>
                        </ul>
                    </div>
                    {
                        isLoggedIn ? (
                        <div className="pull-right">
                        <ul className="menu">
                            <li className="dark-grey logged-name-front grey">
                                {`Hi ${user.firstname ? user.firstname : ''} !`}
                            </li>
                            <li className="nav-signup bttn-orange">
                                <Link to='/search'>Dashboard <span className="btn-arrow">➞</span></Link>
                            </li>
                        </ul>
                    </div>
                    ) : (
                        <div className="pull-right">
                        <ul className="menu">
                            <li className="nav-signin">
                                <Link to="users/sign-in">Sign in</Link>
                            </li>
                            <li className="nav-signup bttn-orange">
                                <Link to="/users/sign-up">Sign up</Link>
                            </li>
                        </ul>
                    </div>
                    )
                    }
                </div>
            </div>
        </Container>
    </nav>
)

const mapStateToProps = state => {
    return {
      user: state.user.user,
      isLoggedIn: state.user.isLoggedIn
    }
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      login: () => dispatch(login()),
  
      logout: () => dispatch(logout()),
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Header);
