/**
 * TO DO:
 * - result ui
 * - result filtering
 */

import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { connect } from "react-redux";

import './domainSearchDashboard.styles.css';

import DashboardHeader from '../../components/DashboardHeader/dashboardHeader.component';
import DomainSearchResultLogin from '../../components/DomainSearchResultLogin/domainSearchResultLogin.component';
import SubmitButton from '../../components/submitButton/submitButton.component';

import { CheckIsValidDomain } from '../../assets/utils/inputCheck.utils';
import config from '../../config/config';

class DomainSearchDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchInput: '',
            result: [],
            searchInputEmpty: false,
            filterType: 0,
            totalResultCount: 0,
            errMessage: 'Please enter a valid domain',
            loaderVisible: false,
            displayResult: []
        }
    }

    FilterArray = [
        "all",
        "personal",
        "generic"
    ]

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

    onSearchHandle = (event) => {
        this.setState({ searchInputEmpty: false });
        const {searchInput} = this.state;
        this.setState({loaderVisible: true})
        if(CheckIsValidDomain(searchInput)){
            // this.setState({result: this.emailArray});
            fetch(`${config.prod_server_api}/email-search/domain-search`, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Authorization': `<Bearer> ${this.props.token}` ,
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

                    console.log(data)
                    let details = data.rows
                        if(data.rowCount !== 0){
                            this.setState({result: details, totalResultCount: data.count})
                        }else{
                            this.setState({searchInputEmpty: true, errMessage: 'Sorry we are not able to find data for this domain'})
                        }
                    
                    this.setState({loaderVisible: false})
                })
                .then(() => this.setresult(this.state.filterType))
                .catch( err => { 
                    console.log(err)
                    this.setState({searchInputEmpty: true, errMessage: 'Sorry we are not able to find data for this domain', loaderVisible: false})
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

    handleFilterType = (e) => {
        let filterTypeValue = parseInt(e.target.value)
        this.setState({filterType: filterTypeValue})
        this.setresult(filterTypeValue)
    }

    setresult = (filterTypeValue) => {
        const {result} = this.state;
        let tempResult;
        if(filterTypeValue === 0) {
            tempResult = result;
        }else if(filterTypeValue === 1) {
            tempResult = result.filter( item => item.firstname !== '' )
        }else{
            tempResult = result.filter( item => item.firstname === '')
        }

        this.setState({displayResult: tempResult})
    }
    render() {
        const {filterType, searchInput, result, searchInputEmpty, totalResultCount, errMessage, loaderVisible,displayResult } = this.state;
        const FilterArray = this.FilterArray;
        const showSearchResult = result.length > 0;
        const onInputChange = this.onInputChange;
        const onSearchHandle = this.onSearchHandle;
        const handleFilterType = this.handleFilterType;

        return (
            <div className="dashboard domainsearch">
                <DashboardHeader activePage={'Search'}/>
                <div className="dashboard-body">
                    <Container>
                        <div className="board-box">
                            <h2>
                                Domain Search
                            </h2>
                            <form className="dashboard-search">
                                <div className="input-group main-input-group">
                                    <input autoComplete="off" className="form-control" id="domain-field" placeholder="company.com" required="required" tabIndex="20" type="text" value={searchInput} onChange={onInputChange} />
                                    <span className="input-group-btn">
                                        <SubmitButton theme={"white"} className="btn-white" dataloading="Searching..." onButtonClickHandle={onSearchHandle} isLoaderVisible={loaderVisible}>
                                                <div className="far fa-search"></div>
                                        </SubmitButton>
                                    </span>
                                </div>
                                {
                                    searchInputEmpty ? 
                                        <Alert variant={'danger'}>
                                            {errMessage}
                                        </Alert> : ''
                                }
                                <div className="toolbar">
                                    <div id="type-filter">
                                        <div className="radios-container">
                                            {
                                                FilterArray.map( (filter, idx) => (
                                                    <label className="radio-container" htmlFor={`${filter}-filter-field`} key={idx}>
                                                        <div className={`radio-icon fas ${ idx === filterType ? 'fa-check-circle' : 'fa-circle' }`}></div>
                                                        <div className="filter-label">{filter}</div>
                                                        <input defaultChecked={ idx === filterType} id={`${filter}-filter-field`} name="type" type="radio" value={idx} onClick={handleFilterType}/>
                                                    </label>
                                                ))
                                            }
                                        </div>
                                    </div>
                                    <div className="download-link d-none">
                                        <Link to="" className="blue-link" >
                                            Export in CSV
                                        </Link>
                                    </div>
                                    <div className="results-count d-none"></div>
                                </div>
                                <div className="search-results-container">
                                    {
                                        showSearchResult ? (
                                            <DomainSearchResultLogin result={displayResult} totalResultCount={totalResultCount} filterType={filterType} />
                                        ) : ''
                                    }
                                </div>
                                <span><div className="domain-search-hint light-grey" id="domain-search-history">
                                {
                                    !showSearchResult ? (
                                        <p>Enter a domain name to launch the search.</p>
                                    ) : ''
                                }
                                </div>
                                </span>
                            </form>
                        </div> 
                    </Container>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      token: state.user.user.token
    }
}

export default connect(mapStateToProps, null)(DomainSearchDashboard)