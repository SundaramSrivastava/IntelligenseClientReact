/**
 * -------*-*-*-*- Verify Email No Login -*-*-*-*--------
 * TO DO's
 * - On search click button should show loader
 * - Result should only come after loader stops
 * - Decide on wether to pass result from here or from redux
 * - Implement login and no login logic in result hiding
 */

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import './verifyEmail.styles.css';

import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import Products from '../../components/Products/products.component';
import EmailVerifyResultNoLogin from '../../components/EmailVerifyResultNoLogin/EmailVerifyResultNoLogin.component';
import SubmitButton from '../../components/submitButton/submitButton.component';

import Google from '../../assets/image/c_google.webp';
import Microsoft from '../../assets/image/c_micro.webp';
import Adobe from '../../assets/image/c_adobe.webp';
import invison from '../../assets/image/c_invision.webp';
import ibm from '../../assets/image/c_ibm.webp';
import Manpower from '../../assets/image/c_manpower.webp';

import { validateEmail, isEmailBusiness } from '../../assets/utils/inputCheck.utils';
import config from '../../config/config';

export default class VerifyEmail extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchInput: '',
            searchInputEmpty: false,
            result: undefined,
            loaderVisible: false,
            errMessage: 'Please enter a valid domain'
        }
    }

    // res = {
    //     Domain: 'newgenapps.com',
    //     Format: 'Valid',
    //     ServerStatus: 'Valid',
    //     Type: 'Professional',
    //     EmailStatus: 'accept all'
    // }

    products = [
        {
            heading: 'IntelligenSe website',
            description: 'Type any company to find a list of email addresses.',
            icon: 'fal fa-browser',
            link: 'users/sign_up?utm_medium=domain_search'
        },
        {
            heading: 'Bulks',
            description: 'Enrich a list of companies or websites with email addresses.',
            icon: 'fal fa-list-alt',
            link: 'users/sign_up?utm_medium=domain_search'
        },
        {
            heading: 'API',
            description: "Build your own powerful tools around IntelligenSe's data.",
            icon: 'fal fa-code',
            link: 'users/sign_up?utm_medium=domain_search'
        }
    ]

    onSearchHandle = async (event) => {

        event.preventDefault();
        const { searchInput } = this.state;
        this.setState({result: undefined})
        if (validateEmail(searchInput)) {

            this.setState({ loaderVisible: true });

              await fetch(`${config.prod_server_api}/api-v1/guest/email-verifer`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },

                body: JSON.stringify({ post: searchInput }),

                })
                .then( res => res.json() )
                .then( res => {
                    let mail = res.response
                    if(mail){
                        this.setState({
                            result: {
                                Format: mail.wellformed ? 'Valid' : 'In-Valid',
                                ServerStatus: mail.validDomain ? 'Valid' : 'In-Valid',
                                EmailStatus: mail.acceptAll ? 'accept all' : mail.validMailbox ? 'Valid' : 'In-Valid',
                                Type: isEmailBusiness(searchInput) ? 'Professional' : mail.validMailbox ? 'Personal' : 'In-Valid',
                                Domain: searchInput.split('@')[1]
                            }
                    })}else{
                        this.setState({searchInputEmpty: true, errMessage: 'You are out of your daily limits', loaderVisible: false})
                    }

                })
                .then( () => {
                    this.setState({ loaderVisible: false });
                })
                .catch( err => {
                    this.setState({searchInputEmpty: true, errMessage: 'Please Try again later', loaderVisible: false})
                })
        } else {
            this.setState({searchInputEmpty: true, errMessage: 'Enter a valid email', loaderVisible: false})
        }
    }

    onInputChange = (e) => {
        this.setState({ searchInputEmpty: false });
        this.setState({ searchInput: e.target.value })
    }
    render() {
        const { searchInput, result, searchInputEmpty, loaderVisible, errMessage } = this.state;
        const showSearchResult = result ? true : false;
        const products = this.products
        return (
            <>
                <Header />
                <div className="emailVerify nologin">
                    <div className="front-header-bg">
                        <div className="front-header">
                            <div className="front-breadcrumb hidden-xs"></div>
                            <Container>
                                <div className="homepage-header">
                                    <h1>
                                        <span className="icon icon-Circle-Check-2"></span>
                                        {' '} Email Verifier
                                        <div className="subtitle">Verify the validity of any professional email address with the most complete email checker.</div>
                                    </h1>
                                </div>
                            </Container>
                        </div>
                    </div>
                    <section className="product-demo">
                        <Container>
                            <form>
                                <div className="input-group main-input-group">
                                    <input autoComplete="off" autoFocus="autofocus" className={`form-control ${searchInputEmpty ? 'is-invalid' : ''}`} placeholder="johnydepp@company.com" required="required" type="text" onChange={this.onInputChange} value={searchInput} />
                                    <span className="input-group-btn">
                                        <SubmitButton theme={"white"} className="btn-white" dataloading="Verifing..." onButtonClickHandle={this.onSearchHandle} isLoaderVisible={loaderVisible}>
                                        {/* <button className="btn-white" onClick={this.onSearchHandle}> */}
                                            <span className="d-block">Verify</span>
                                        {/* </button> */}
                                        </SubmitButton>
                                    </span>
                                </div>
                                {
                                            searchInputEmpty ? 
                                                <Alert variant={'danger'}>
                                                    {errMessage}
                                                </Alert> : ''
                                        }
                                <div className="search-results-container">
                                    {
                                        showSearchResult ? (
                                            <EmailVerifyResultNoLogin result={result} />
                                        ) : ''
                                    }

                                </div>
                                <div className="light-grey before-search-message">
                                    {
                                        !showSearchResult ? (
                                            <p>Enter a email to launch the verify.</p>
                                        ) : ''
                                    }
                                </div>
                            </form>
                        </Container>
                    </section>
                    <section className="featured-content">
                        <Container>
                            <Row>
                                <Col md={6}>
                                    <h2>
                                        Never get bounces anymore.
                                    </h2>
                                    <div className="big-p">
                                        We designed the Email Verifier to be as complete as possible, with
                                        validations made at multiple levels: format, domain information,
                                        response of the mail servers and comparison with our unique base of
                                        100+ million professional email addresses.
                                    </div>
                                    <Link className="btn-orange btn-lg" to="/users/sign_up?utm_medium=domain_search">Get 50 free verifications/month</Link>
                                </Col>
                                <Col md={1}>

                                </Col>
                                <Col md={5}>
                                    <div className="text-content">
                                        <h3>Verify email addresses in bulk</h3>
                                        <p>
                                            The Email Verifier can be performed for a list of email
                                            addresses. Upload your file in the dashboard and watch it being
                                            enriched with the email validations.
                                        </p>
                                        <Link className="blue-cta" to="/bulks/domain-search">Bulk Email Verifier</Link>
                                    </div>
                                    <div className="text-content">
                                        <h3>Available in the API</h3>
                                        <p>

                                            The main services of IntelligenSe are also available directly through
                                            our <Link to="/api">API</Link>. Get the complete check result
                                            of any email address with a simple API call.
                                        </p>
                                        <Link className="blue-cta" to="/api/domain-search">Email Verifier API</Link>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <section className="customers">
                        <Container>
                            <div className="customers-intro">
                                IntelligenSe is used by
                                <strong> 2,000,000+ professionals </strong>
                                and chosen by leading companies.
                            </div>
                            <Row>
                                <Col md={2} sm={4} xs={6}>
                                    <img alt="Google" width="78" height="26" src={Google} />
                                </Col>
                                <Col md={2} sm={4} xs={6}>
                                    <img alt="IBM" width="65" height="26" src={ibm}></img>
                                </Col>

                                <Col md={2} sm={4} xs={6}>
                                    <img alt="Manpower" width="133" height="26" src={Manpower} />
                                </Col>

                                <Col md={2} sm={4} xs={6}>
                                    <img alt="Microsoft" width="122" height="26" src={Microsoft} />
                                </Col>
                                <Col md={2} sm={4} xs={6}>
                                    <img alt="Adobe" width="107" height="26" src={Adobe} />
                                </Col>
                                <Col md={2} sm={4} xs={6}>
                                    <img alt="Invision" width="77" height="26" src={invison} />
                                </Col>
                            </Row>
                        </Container>
                    </section>
                    <Products blockSize={4} items={products}>
                        <Row>
                            <Col md={12}>
                                <h2>Where the Email Verifier can be used</h2>
                            </Col>
                        </Row>
                    </Products>
                </div>
                <Footer />
            </>
        )
    }
}
