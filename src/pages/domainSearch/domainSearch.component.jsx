/**
 * -------*-*-*-*- Domain Search No Login -*-*-*-*--------
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

import './domainSearch.styles.css';

import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import DomainSearchResultNoLogin from '../../components/DomainSearchResultNoLogin/domainSearchResultNoLogin.component';
import Products from '../../components/Products/products.component';
import SubmitButton from '../../components/submitButton/submitButton.component';

import { CheckIsValidDomain } from '../../assets/utils/inputCheck.utils';

import Google from '../../assets/image/c_google.webp';
import Microsoft from '../../assets/image/c_micro.webp';
import Adobe from '../../assets/image/c_adobe.webp';
import invison from '../../assets/image/c_invision.webp';
import ibm from '../../assets/image/c_ibm.webp';
import Manpower from '../../assets/image/c_manpower.webp';

import config from './../../config/config';

export default class DomainSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchInput: '',
            result: [],
            totalResultCount: 0,
            searchInputEmpty: false,
            errMessage: 'Please enter a valid domain',
            loaderVisible: false
        }
    }

    // emailArray = [
    //     'sundaram@newgenapps.com',
    //     'random@newgenapps.com',
    //     'someveryrandomemail@newgenapps.com',
    //     'anupriya@newgenapps.com',
    //     'neha@newgenapps.com',
    //     'lata@newgenapps.com',
    //     'vandana@newgenapps.com',
    //     'nehat@newgenapps.com',
    //     'tarun@newgenapps.com',
    //     'anurag@newgenapps.com'
    // ];

    products = [
        {
            heading: 'IntelligenSe website',
            description: 'Type any company to find a list of email addresses.',
            icon: 'fal fa-browser',
            link: 'users/sign_up?utm_medium=domain_search'
        },
        {
            heading: 'Chrome extension',
            description: 'Find the email addresses behind the websites you visit.',
            icon: 'fab fa-chrome',
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

    onSearchHandle = (event) => {
        this.setState({ searchInputEmpty: false });
        const {searchInput} = this.state;
        this.setState({loaderVisible: true})
        if(CheckIsValidDomain(searchInput)){
            // this.setState({result: this.emailArray});
            fetch(`${config.prod_server_api}/email-search/guest/domain-search`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    "details": {
                        "domain": `${searchInput}`
                    }
                })
            })
                .then((response) => response.json())
                .then((data) => {
                    let details = data.emailObject.rows
                        if(data.emailObject.rowCount !== 0){
                            let emailList = details.map( detail => detail.emails )
                            this.setState({result: emailList, totalResultCount: data.count})
                        }else{
                            this.setState({searchInputEmpty: true, errMessage: 'You are out of your daily limits'})
                        }
                    
                    this.setState({loaderVisible: false})
                })
                .catch( err => { 
                    this.setState({searchInputEmpty: true, errMessage: 'You are out of your daily limits', loaderVisible: false})
                } 
                )
        }else{
            this.setState({searchInputEmpty: true, errMessage: 'Please enter a valid domain', loaderVisible: false});
        }
        event.preventDefault();
    }

    onInputChange = (e) => {
        this.setState({ searchInputEmpty: false });
        this.setState({ searchInput: e.target.value })
    }
    render() {
        const { searchInput, result, searchInputEmpty, totalResultCount, errMessage, loaderVisible } = this.state;
        const showSearchResult = result.length > 0;
        const isLoggedIn = false;
        const products = this.products
        if (!isLoggedIn) {
            return (
                <>
                    <Header />
                    <div className="domainpage nologin">
                        <div className="front-header-bg">
                            <div className="front-header">
                                <div className="front-breadcrumb hidden-xs"></div>
                                <Container>
                                    <div className="homepage-header">
                                        <h1>
                                            <span className="icon icon-Magnifying-Glass-1"></span>
                                            {' '}Domain Search
                                            <div className="subtitle">IntelligenSe's most powerful email-finding tool. Find email addresses from any company name or website in seconds.</div>
                                        </h1>
                                    </div>
                                </Container>
                            </div>
                        </div>
                        <section className="product-demo">
                            <Container>
                                <form>
                                    <div className="input-group main-input-group">
                                        <input autoComplete="off" autoFocus="autofocus" className={`form-control ${searchInputEmpty ? 'is-invalid' : ''}`} placeholder="company.com" required="required" type="text" onChange={this.onInputChange} value={searchInput} />
                                        <span className="input-group-btn">
                                            <SubmitButton theme={"white"} className="btn-white" dataloading="Searching..." onButtonClickHandle={this.onSearchHandle} isLoaderVisible={loaderVisible}>
                                            {/* <button className="btn-white" onClick={this.onSearchHandle}> */}
                                                <span className="d-none d-sm-block">Find email addresses</span>
                                                <span className="d-block d-sm-none">Search</span>
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
                                                    <DomainSearchResultNoLogin result={result} totalResultCount={totalResultCount} />
                                                ) : ''
                                            }

                                        </div>
                                        <div className="light-grey before-search-message">
                                            {
                                                !showSearchResult ? (
                                                    <p>Enter a domain name to launch the search. For example, <Link to="#" className="try-domain">newgenapps.com</Link>.</p>
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
                                            Reach out to any business.
                                        </h2>
                                        <div className="big-p">
                                            The Domain Search is perfect to quickly find who to contact in a
                                            business. In half a second, it lists the email addresses publicly
                                            available on the web, with confidence scores, department filters and
                                            detailed sources.
                                        </div>
                                        <Link className="btn-orange btn-lg" to="/users/sign_up?utm_medium=domain_search">Get 25 free searches/month</Link>
                                    </Col>
                                    <Col md={1}>

                                    </Col>
                                    <Col md={5}>
                                        <div className="text-content">
                                            <h3>Find email addresses in bulk</h3>
                                            <p>
                                                The Domain Search can be performed on a list of
                                                companies or websites. Upload your file in the dashboard
                                                and get a list of targeted email addresses.
                                            </p>
                                            <Link className="blue-cta" to="/bulks/domain-search">Bulk Domain Search</Link>
                                        </div>
                                        <div className="text-content">
                                            <h3>Available in the API</h3>
                                            <p>
                                                The main services of IntelligenSe are also available directly through
                                                our <Link to="/api">API</Link>. Find email addresses from
                                                domain names with a simple API call.
                                            </p>
                                            <Link className="blue-cta" to="/api/domain-search">Domain Search API</Link>
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
                                    <h2>Where the Domain Search can be used</h2>
                                </Col>
                            </Row>
                        </Products>
                    </div>
                    <Footer />
                </>
            )
        } else {
            <></>
        }
    }
}
