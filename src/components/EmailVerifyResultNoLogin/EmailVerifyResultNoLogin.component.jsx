import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './EmailVerifyResultNoLogin.styles.css';

function EmailVerifyResultNoLogin({result, loggedin= false}) {
    const {EmailStatus, Format, ServerStatus, Type, Domain} = result;
    return (
        <>
            <div className={`verifier-result ${loggedin ? 'dashboard-res' : ''}`}>
                {
                    EmailStatus === 'accept all' ? (
                        <>
                        <div className="verifier-result-icon"><i className="fas fa-exclamation-triangle dark-orange"></i></div>
                        <div className="verifier-result-status">Accept all</div>
                        <div className="verifier-result-subtitle">The domain name {Domain} accepts all the email addresses.</div>
                        </>
                    ) : ('')
                }
                
            </div>
            <div className={`verify-result-details ${loggedin ? 'dashboard-res' : ''}`}>
                <Row>
                    <Col md={6}>
                        <div className="verifier-detail">
                            Format
                            <div className="pull-right" id="email-format"><div className="green">{Format}</div></div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="verifier-detail">
                            Type
                            <div className="pull-right" id="email-type"><div className="green">{Type}</div></div>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <div className="verifier-detail">
                            Server Status
                            <div className="pull-right" id="email-format"><div className="green">{ServerStatus}</div></div>
                        </div>
                    </Col>
                    <Col md={6}>
                        <div className="verifier-detail">
                            Email status 
                            <div className="pull-right" id="email-type"><div className="red">{EmailStatus}</div></div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    )
}

export default EmailVerifyResultNoLogin;
