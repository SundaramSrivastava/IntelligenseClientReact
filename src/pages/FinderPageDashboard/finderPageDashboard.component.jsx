/**
 * TO DO:
 * - result ui
 * - result filtering
 */

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';

import './finderPageDashboard.styles.css';

import DashboardHeader from '../../components/DashboardHeader/dashboardHeader.component';
import EmailFinderNoLogin from '../../components/EmailFinderNoLogin/emailFinderNoLogin.component';


import config from '../../config/config';

export default class FinderPageDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchName: '',
            searchDomain: '',
            searchInputEmpty: false,
            result: undefined
        }
    }

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
            const apiUrl = `${config.prod_server_api}/email-search/single-search`;
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

        return (
            <div className="dashboard domainsearch">
                <DashboardHeader activePage={"Finder"}/>
                <div className="dashboard-body">
                    <Container>
                        <div className="board-box">
                            <h2>
                                Email Finder
                            </h2>
                            <form className="dashboard-search">
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
                        </div> 
                    </Container>
                </div>
            </div>
        )
    }
}
