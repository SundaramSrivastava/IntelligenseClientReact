import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import Alert from 'react-bootstrap/Alert';
import { connect } from "react-redux";
import Papa from 'papaparse';
import throttledQueue from 'throttled-queue';
import { CSVLink, CSVDownload } from "react-csv";

import './bulkVerifierPage.styles.css';

import DashboardHeader from '../../components/DashboardHeader/dashboardHeader.component';
import EmailVerifyResultNoLogin from '../../components/EmailVerifyResultNoLogin/EmailVerifyResultNoLogin.component';
import SubmitButton from '../../components/submitButton/submitButton.component';

import { validateEmail, isEmailBusiness } from '../../assets/utils/inputCheck.utils';
import config from '../../config/config';

class BulkVerifierPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            searchInput: '',
            searchInputEmpty: false,
            result: [],
            loaderVisible: false,
            emailList: [],
            errMessage: 'Please enter a valid domain'
        }


        this.throttle = throttledQueue(1500, 5000);
        this.EmailfileInput = React.createRef()
        
    }

    // res = {
    //     Domain: 'newgenapps.com',
    //     Format: 'Valid',
    //     ServerStatus: 'Valid',
    //     Type: 'Professional',
    //     EmailStatus: 'accept all'
    // }

    updateResult = (data, email) =>{
        console.log(data)
        this.setState({result: [...this.state.result, {email: email, EmailStatus: data.response.acceptAll ? 'accept all' : data.response.validMailbox ? 'Valid' : 'In-Valid'}]})
    }

    apicalling = email => {

        console.log(this.props.token)
        let header = {
            'Authorization': `<Bearer> ${this.props.token}`,
            'Content-Type': 'application/json',
          }
            console.log("sent")
            fetch(`${config.prod_server_api}/api-v1/verifier`, {
              method: 'POST',
              headers: header,
              body: JSON.stringify({ post: email })
            })
              .then((response) => response.json())
              .then(data => {
                console.log(data)
                // if (data.response.validMailbox) {
                //   localVerifiedList.push(email)
                //   setVerifiedList([...localVerifiedList])
                // } else {
                //   localUnVerifiedList.push(email)
                //   setUnVerifiedList([...localUnVerifiedList])
                // }
                this.updateResult(data, email)
              })
              .then( () => console.log(this.state.result) )
              .catch(err => {
                console.log(err)
              })
          }
    mailChecker = (email, index) => {
        this.throttle(this.apicalling(email))
      }

    onSearchHandle = async (event) => {
        event.preventDefault();
        const {searchInput} = this.state;
        const EmailfileInput = this.EmailfileInput

        this.setState({loaderVisible: true})

        const updateData = async (result) => {
            const data = await result.data;
            let localEmailList = await data;
            await console.log(localEmailList)
            await localEmailList.map(email => this.mailChecker(email))
            await this.setState({loaderVisible: false})
            // Here this is available and we can call this.setState (since it's binded in the constructor)
            //this.setState({data: data}); // or shorter ES syntax: this.setState({ data });
          };

        if (EmailfileInput.current && EmailfileInput.current.files.length > 0) {


            Papa.parse(EmailfileInput.current.files[0], {
              header: false,
              download: true,
              skipEmptyLines: true,
              // Here this is also available. So we can call our custom class method
              complete: updateData
            });
          }
          else if(searchInput != "") {
              console.log(searchInput)
              console.log(searchInput.split(','))
            await this.setState({emailList: searchInput.split(',')})
            await updateData({data: this.state.emailList})
        }
          else {
            this.setState({loaderVisible: false, errMessage: "please give some inputs", searchInputEmpty: true})
          }
    }

    onInputChange = (e) => {
        this.setState({ searchInputEmpty: false });
        this.setState({ searchInput: e.target.value, result: [] })
    }
    render() {
        const { searchInput, result, searchInputEmpty, loaderVisible, errMessage } = this.state;
        const showSearchResult = result ? true : false;
        const onSearchHandle = this.onSearchHandle;
        const EmailfileInput = this.EmailfileInput

        return (
            <div className="dashboard comminsoon domainsearch">
                <DashboardHeader activePage={"Bulks"}/>
                <div className="dashboard-body">
                    <div className="top-banner">
                        COMMING SOON...
                    </div>
                    <Container>
                        <div className="board-box">
                            <h2>
                                Bulk Email Verifier
                            </h2>
                            <form>
                                <div id="bulk-upload">
                                    <h3>Enter your list of email addresses</h3>
                                </div>
                                <label htmlFor="bulk_verification_emails">
                                    Enter the email addresses
                                </label>
                                <span className="grey">(comma-separated)</span>
                                <textarea className="text required form-control emails-textarea light-grey" rows="3" required="required" aria-required="true" name="bulk_verification" id="bulk_verification_emails" value={searchInput} onChange={this.onInputChange}></textarea>
                                <br />
                                <div>
                                    <label htmlFor="select-file">
                                        Or load the list from a file
                                    </label>
                                    <span className="grey">(CSV)</span>


                                    <div className="inputcontainer">
                                    <div className="full-width file-area" data-action="click->file-upload#openFileSelection">
                                        <div className="far fa-folder-open"></div>
                                        Select a file
                                    </div>
                                        <input className="file-field" ref={this.EmailfileInput} data-file-upload-target="fileInput" data-action="change->file-upload#selectFile" type="file" name="bulk_verification[file]" id="bulk_verification_file" accept=".csv" />
                                    </div>
                                </div>
                                <div className="button-container">
                                    <SubmitButton dataloading="Searching..." onButtonClickHandle={onSearchHandle} isLoaderVisible={loaderVisible}>
                                        Verify
                                    </SubmitButton>
                                </div>
                            </form>

                            <div className="bulk-preview">
                                <h3 className="header">Preview</h3>
                                <div className={`previewLoader d-none`}>
                                    <span className="fas fa-spinner-third fa-spin"></span>
                                    Loading...
                                </div>
                                <div id="preview-container">
                                    <div className="horizontal-scroll verticle-scroll">
                                        <table className="preview-table full-width-table">
                                            <tbody><tr>
                                                <th>Email</th>
                                                <th>
                                                    Status
                                                </th>
                                            </tr>
                                            {
                                                result.map( data => <tr key={data.email}>
                                                    <td>{data.email}</td>
                                                    <td>
                                                        <div className={`legend-color ${data.EmailStatus.toUpperCase() === "accept all".toUpperCase() ? 'accept_all-color' : data.EmailStatus.toUpperCase() === "valid".toUpperCase() ? "valid-color" : "invalid-color" }`}></div>
                                                        {data.EmailStatus}
                                                    </td>
                                                </tr>)
                                            }
                                            </tbody></table>
                                    </div>
                                </div>
                            </div>
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

export default connect(mapStateToProps, null)(BulkVerifierPage);