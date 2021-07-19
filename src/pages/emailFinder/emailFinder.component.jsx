/**
 * -------*-*-*-*- Email Finder No Login -*-*-*-*--------
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

// Importing Styles
import './emailFinder.styles.css';

// Importing components
import Header from '../../components/header/header.component';
import Footer from '../../components/footer/footer.component';
import Products from '../../components/Products/products.component';
import EmailFinderNoLogin from '../../components/EmailFinderNoLogin/emailFinderNoLogin.component';

// Importing Images
import Google from '../../assets/image/c_google.webp';
import Microsoft from '../../assets/image/c_micro.webp';
import Adobe from '../../assets/image/c_adobe.webp';
import invison from '../../assets/image/c_invision.webp';
import ibm from '../../assets/image/c_ibm.webp';
import Manpower from '../../assets/image/c_manpower.webp';

import config from '../../config/config';

export default class EmailFinder extends Component {

    constructor(props) {
        super(props)

        /**
         * @dev -> Only local states for this page must be defined here
         *         if ever needed any state which needs to be on more this page
         *         define it in redux store
         */
        this.state = {
            searchName: '',
            searchDomain: '',
            searchInputEmpty: false,
            result: undefined
        }
    }

    /**
     * @title Products list
     * @dev Change this array if want to change the 
     *      "Where the Email Finder can be used"
     *      section.
     */
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

    res = 'sundaram.srivastava@newgenapps.com' 

    /**
     * @title onSearchHandle
     * @param {object} event
     * @description this funciton will be triggered when the search button is pressed.
     * @todo Write the logic to fetch result and show result.
     */
    onSearchHandle = (event) => {
        const { searchName, searchDomain } = this.state;
        event.preventDefault()
        if (searchName !== '' && searchDomain !== '') {
            this.setState({ result: "searching ..." });
            const apiUrl = `${config.prod_server_api}/email-search/guest/email-finder`;
        fetch(apiUrl, {
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
                    "url": `${searchDomain}`,
                    "firstName": `${searchName.split(" ")[0]}`,
                    "lastName": `${searchName.split(" ")[1]}`
                }
            })
        }).then((response) => response.json())
        .then((data) => {
                if( data ){
                    // setNoResultFound(false)
                    // setSearchResults(data)
                    // setEmailList(data.email)
                    if(data.emails){
                        this.setState({result: data.emails})
                    }else{
                        this.setState({result: "Sorry we dont have any record of this entry"})
                    }
                    return;
                }else{
                    // setNoResultFound(true)
                    // setSearchResults(null)
                    // setEmailList([])
                    this.setState({result: "Something bad occured"})
                }
            })
            .catch( err => {
                console.log(err)
             })
        } else {
            this.setState({ searchInputEmpty: true });
        }
        event.preventDefault();
    }

    /**
     * @title onInputChange
     * @param {object} e 
     * @description this function addes the input into its respective state object
     */
    onInputChange = (e) => {
        const {name, value} = e.target;
        this.setState({ searchInputEmpty: false });
        this.setState({ [name]: value })
    }

    
    render() {
        const { result, searchInputEmpty, searchName, searchDomain } = this.state;
        
        const onInputChange = this.onInputChange;
        const onSearchHandle = this.onSearchHandle;
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
                                        <span className="icon icon-Target-User"></span>
                                        {' '} Email Finder
                                        <div className="subtitle">Find the verified email address of any professional.</div>
                                    </h1>
                                </div>
                            </Container>
                        </div>
                    </div>
                    <section className="product-demo">
                        <Container>
                            <form>
                            <div className="input-group main-input-group">
                                    <input autoComplete="off" autoFocus="autofocus" className="form-control" id="full-name-field" placeholder="John Doe" name="searchName" required="required" type="text" value={searchName} onChange={onInputChange}/>
                                    <div className="at-form">@</div>
                                    <input autoComplete="off" className="form-control" id="domain-field" placeholder="company.com" required="required" type="text" name="searchDomain" value={searchDomain} onChange={onInputChange}/>
                                    <span className="input-group-btn">
                                        <button className="btn-white" data-loading="none" id="finder-btn" onClick={onSearchHandle}>
                                            <div className="far fa-search"></div>
                                        </button>
                                    </span>
                                </div>
                                {
                                    searchInputEmpty ?
                                        <Alert variant={'danger'}>
                                            Please enter a valid email
                                        </Alert> : ''
                                }
                                <div className="search-results-container">
                                    {
                                        showSearchResult ? (
                                            <EmailFinderNoLogin email={result} />
                                        ) : ''
                                    }

                                </div>
                                <div className="light-grey before-search-message">
                                    {
                                        !showSearchResult ? (
                                            <p>Enter name and domain to find a email.</p>
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
                                    Make new connections.
                                    </h2>
                                    <div className="big-p">
                                    The Email Finder is all you need to connect with any professional. It puts all our data together—email formats, email addresses found on the web, verifications and other signals—to find the right contact information in seconds.
                                    </div>
                                    <Link className="btn-orange btn-lg" to="/users/sign_up?utm_medium=domain_search">Get 25 free searches/month</Link>
                                </Col>
                                <Col md={1}>

                                </Col>
                                <Col md={5}>
                                    <div className="text-content">
                                        <h3>Find email addresses in bulk</h3>
                                        <p>
                                        The Email Finder can be performed to find the email address of a list of people. Upload your file in the dashboard and watch it being enriched.
                                        </p>
                                        <Link className="blue-cta" to="/bulks/domain-search">Bulk Email Finder</Link>
                                    </div>
                                    <div className="text-content">
                                        <h3>Available in the API</h3>
                                        <p>

                                            The main services of IntelligenSe are also available directly through
                                            our <Link to="/api">API</Link>. Get the complete check result
                                            of any email address with a simple API call.
                                        </p>
                                        <Link className="blue-cta" to="/api/domain-search">Email Finder API</Link>
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
                                <h2>Where the Email Finder can be used</h2>
                            </Col>
                        </Row>
                    </Products>
                </div>
                <Footer />
            </>
        )
    }
}
