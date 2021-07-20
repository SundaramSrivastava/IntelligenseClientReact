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
import AWS from 'aws-sdk'

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
            displayResult: [],
            splitElement: null
        }
        AWS.config.update({
            accessKeyId: process.env.REACT_APP_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_SECRET_KEY,
            region: 'us-east-1'
          })
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

    extractEmails = ( text ) => {
        return text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/gi)[0];
    }

    extractContact = (text) => {
        return text.match(/\d+/g);
    }

    getCommmonSpliter = (dividerMap) => {
        let keysAre = Object.keys(dividerMap)

        let highest = keysAre[0]
        keysAre.map( (item, index) => {
            if(highest < dividerMap[item]){
                highest = keysAre[index]
            }
        })
        console.log('highest -> ', highest)
        return highest
    }

    getAllData = (err, data) => {
        /**
         *  designation: "software developer"
         *  emails: "sundaram.srivastava@newgenapps.com"
         *  firstname: "sundaram"
         *  isVerified: true
         *  lastname: "srivastava"
        */
        if(err){
            console.log(err)
        }else{
            //  getting response in array
            let responseData = JSON.parse(JSON.parse(data.Payload)).searchResult[0].split(/\r?\n/)
            responseData.shift()
            let outputData = []
            let commonSpliter = {}
            responseData.map( item => {
                let email = this.extractEmails(item)

                let contact = this.extractContact(item)
                contact = contact != null ? contact.join('') : null

                let name = item.split(email)
                name = name.length !== 0 ? name[0] : null
                let firstname = name.split(' ')[0]
                let lastname = name.split(' ')[1] ? name.split(' ')[1] : null

                // let splitter = email.split('@')[0]
                // let isSplitter = splitter.split(firstname.toLowerCase())[1].length >= 1 ? splitter.split(firstname.toLowerCase())[1][0] : null

                // if(isSplitter) {
                //     if(commonSpliter[isSplitter]){
                //         commonSpliter[isSplitter] += 1
                //     }else{
                //         commonSpliter[isSplitter] = 1
                //     }
                // }
                outputData.push({emails: email, designation: contact, firstname: firstname, lastname: lastname})
            })

            // let finalSplitterString = commonSpliter.length > 0 ?  this.getCommmonSpliter(commonSpliter) : null

            this.setState({displayResult: outputData, splitElement: '.' })
            this.setState({result: outputData, loaderVisible: false})
        }
    }

    onSearchHandle = (event) => {
        this.setState({ searchInputEmpty: false });
        const {searchInput} = this.state;
        this.setState({loaderVisible: true})

        /*
         *  GETTING RESPONSE FROM LAMBDA FUNCTION
         *  After response is recieved getAllData function will be called on the
         *  response.
         *  getAllData funciton is passed as callback function
         *  and it takes err and data as its parameter. 
        */
        if(CheckIsValidDomain(searchInput)){
            let lambda = new AWS.Lambda();
            let params = {
                FunctionName: 'emailFinder', /* required */
                Payload: JSON.stringify({
                'domainname': searchInput
                })
            }
            lambda.invoke(params, (err, data) => this.getAllData(err, data));
        }
        /**
         * Below this line a api request to node server is made
         * this code will not be used for a while untill our db is
         * filled with some data.
        */
        // if(CheckIsValidDomain(searchInput)){

        //     fetch(`${config.prod_server_api}/email-search/domain-search`, {
        //         method: 'POST',
        //         mode: 'cors',
        //         cache: 'no-cache',
        //         credentials: 'same-origin',
        //         headers: {
        //             'Authorization': `<Bearer> ${this.props.token}` ,
        //             'Content-Type': 'application/json'
        //         },
        //         redirect: 'follow',
        //         referrerPolicy: 'no-referrer',
        //         body: JSON.stringify({
        //             "details": {
        //                 "domain": `${searchInput}`
        //             }
        //         })
        //     })
        //         .then((response) => response.json())
        //         .then((data) => {

        //             console.log(data)
        //             let details = data.rows
        //                 if(data.rowCount !== 0){
        //                     this.setState({result: details, totalResultCount: data.count})
        //                 }else{
        //                     this.setState({searchInputEmpty: true, errMessage: 'Sorry we are not able to find data for this domain'})
        //                 }
                    
        //             this.setState({loaderVisible: false})
        //         })
        //         .then(() => this.setresult(this.state.filterType))
        //         .catch( err => { 
        //             console.log(err)
        //             this.setState({searchInputEmpty: true, errMessage: 'Sorry we are not able to find data for this domain', loaderVisible: false})
        //         } 
        //         )
        // }else{
        //     this.setState({searchInputEmpty: true, errMessage: 'Please enter a valid domain', loaderVisible: false});
        // }
        event.preventDefault();
    }

    //          INPUT HANDLERS BELLOW         //
    onInputChange = (e) => {
        this.setState({ searchInputEmpty: false });
        this.setState({ searchInput: e.target.value, result: [] })
    }

    handleFilterType = (e) => {
        let filterTypeValue = parseInt(e.target.value)
        this.setState({filterType: filterTypeValue})
        this.setresult(filterTypeValue)
    }
    // ______________________________________ //

    //      Result filter handler below      //
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
    //_________________________________________//


    render() {
        const {filterType, searchInput,splitElement, result, searchInputEmpty, totalResultCount, errMessage, loaderVisible,displayResult } = this.state;
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
                                            {/* {
                                                FilterArray.map( (filter, idx) => (
                                                    <label className="radio-container" htmlFor={`${filter}-filter-field`} key={idx}>
                                                        <div className={`radio-icon fas ${ idx === filterType ? 'fa-check-circle' : 'fa-circle' }`}></div>
                                                        <div className="filter-label">{filter}</div>
                                                        <input defaultChecked={ idx === filterType} id={`${filter}-filter-field`} name="type" type="radio" value={idx} onClick={handleFilterType}/>
                                                    </label>
                                                ))
                                            } */}
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
                                        console.log(splitElement)
                                    }
                                    {
                                        showSearchResult ? (
                                            <DomainSearchResultLogin result={displayResult} totalResultCount={totalResultCount} splitElement filterType={filterType} url={searchInput} />
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