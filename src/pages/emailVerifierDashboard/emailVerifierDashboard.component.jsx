import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { connect } from "react-redux";
import AWS from 'aws-sdk'

import './emailVerifierDashboard.styles.css';

import DashboardHeader from '../../components/DashboardHeader/dashboardHeader.component';
import EmailVerifyResultNoLogin from '../../components/EmailVerifyResultNoLogin/EmailVerifyResultNoLogin.component';
import SubmitButton from '../../components/submitButton/submitButton.component';

import { validateEmail, isEmailBusiness } from '../../assets/utils/inputCheck.utils';
import config from '../../config/config';

class EmailVerifierDashboard extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchInput: '',
            searchInputEmpty: false,
            result: undefined,
            loaderVisible: false,
            errMessage: 'Please enter a valid domain'
        }
        AWS.config.update({
            accessKeyId: process.env.REACT_APP_ACCESS_ID,
            secretAccessKey: process.env.REACT_APP_SECRET_KEY,
            region: 'us-east-1'
          })
        
    }

    

    // res = {
    //     Domain: 'newgenapps.com',
    //     Format: 'Valid',
    //     ServerStatus: 'Valid',
    //     Type: 'Professional',
    //     EmailStatus: 'accept all'
    // }

    onSearchHandle = async (event) => {

        event.preventDefault();
        const { searchInput } = this.state;
        this.setState({result: undefined})
        
        let lambda = new AWS.Lambda();
        if (validateEmail(searchInput)) {

            this.setState({ loaderVisible: true });
            let EmailFormat = validateEmail(searchInput)
            if(EmailFormat){
                let params = {
                    FunctionName: 'EmailVerifier', /* required */
                    Payload: JSON.stringify({
                      'email': searchInput
                    })
                  };
                  lambda.invoke(params, function (err, data) {
                    if (err) console.log(err, err.stack); // an error occurred
                    else {
                      console.log(JSON.parse(data.Payload))
                    }          // successful response
                  });
            }else{
                this.setState({ loaderVisible: false ,
                    result: {
                        Format: 'In-Valid',
                        ServerStatus: 'In-Valid',
                        EmailStatus: 'In-Valid',
                        Type: 'In-Valid',
                        Domain: 'In-Valid'
                    }
                })
            }
            

            //   await fetch(`${config.prod_server_api}/api-v1/verifier`, {
            //     method: 'POST',
            //     headers: {
            //         'Authorization': `<Bearer> ${this.props.token}` ,
            //         'Content-Type': 'application/json',
            //     },

            //     body: JSON.stringify({ post: searchInput }),

            //     })
            //     .then( res => res.json() )
            //     .then( res => {
            //         let mail = res.response
            //         console.log(mail)
            //         if(mail){
            //             this.setState({
            //                 result: {
            //                     Format: mail.wellformed ? 'Valid' : 'In-Valid',
            //                     ServerStatus: mail.validDomain ? 'Valid' : 'In-Valid',
            //                     EmailStatus: mail.acceptAll ? 'accept all' : mail.validMailbox ? 'Valid' : 'In-Valid',
            //                     Type: isEmailBusiness(searchInput) ? 'Professional' : mail.validMailbox ? 'Personal' : 'In-Valid',
            //                     Domain: searchInput.split('@')[1]
            //                 }
            //         })}else{
            //             this.setState({searchInputEmpty: true, errMessage: 'You are out of your daily limits', loaderVisible: false})
            //         }

            //     })
            //     .then( () => {
            //         this.setState({ loaderVisible: false });
            //     })
            //     .catch( err => {
            //         console.log(err)
            //         this.setState({searchInputEmpty: true, errMessage: 'Please Try again later', loaderVisible: false})
            //     })
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

        return (
            <div className="dashboard domainsearch">
                <DashboardHeader activePage={"Verifier"}/>
                <div className="dashboard-body">
                    <Container>
                        <div className="board-box">
                            <h2>
                                Email Verifier
                            </h2>
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

export default connect(mapStateToProps, null)(EmailVerifierDashboard);