import React from 'react';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import './domainSearchResultLogin.styles.css';


function DomainSearchResultLogin({ result, isLoggedIn, totalResultCount, filterType, splitElement, url }) {
    return (
        <>
            <div className="domainLogin result-information">
                {splitElement ?
                <div className="search-pattern"><span className="hidden-xs">Most common pattern: </span><strong>
                    <OverlayTrigger
                        placement="top"

                        transition={false}
                        overlay={
                            <Tooltip id={`tooltip-firstname`}>
                                <strong>first name</strong>
                            </Tooltip>
                        }
                    >
                        {({ ref, ...triggerHandler }) => (
                            <span ref={ref} {...triggerHandler}>{`{f}`}</span>
                        )}
                    </OverlayTrigger>
                    {splitElement}
                    <OverlayTrigger
                        placement="top"

                        transition={false}
                        overlay={
                            <Tooltip id={`tooltip-lastname`}>
                                <strong>last name</strong>
                            </Tooltip>
                        }
                    >
                        {({ ref, ...triggerHandler }) => (
                            <span ref={ref} {...triggerHandler}>{`{l}`}</span>
                        )}
                    </OverlayTrigger>
                    @{url}</strong>
                </div> : ''}

                <div className="results-number">{result.length} email addresses</div>
            </div>
            <div className="search-results">
                {
                    result.slice(0, result.length ).map((emailObj, idx) => (
                        <div className="result" key={idx}>
                            <div className="additional_data grey">{emailObj.firstname && emailObj.firstname[0] !== '[' ? <span className="name">{emailObj.firstname} {emailObj.lastname}</span> : ''}{emailObj.designation ? <span className="position">{emailObj.length > 5 ? emailObj.designation : ''}</span> : '' }</div>
                            <div className="email-container">
                                {
                                        <div className="email">
                                            {
                                                emailObj.emails
                                            }
                                        </div>
                                }
                            </div>
                        </div>
                    )
                    )
                }
                <p className={`grey search-see-all ${isLoggedIn ? 'd-none' : ''}`}>{`${totalResultCount - 5}`} more results for "newgenapps.com"</p>
            </div>
            <div className={`domain-search-cta ${isLoggedIn ? 'd-none' : ''}`} >
                <p>
                    Sign up to uncover the email addresses, get the full results, search
                    filters, CSV downloads and more. Get <strong>25 free
                        searches/month</strong>.
                </p>
                <Link className="blue-link" to="/users/sign-up">
                    Create a free account
                </Link>
            </div>
        </>
    )
}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    }
}

export default connect(mapStateToProps, null)(DomainSearchResultLogin);
