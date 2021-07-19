import React, { Component } from 'react';
import { Link , Redirect} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';

import SignHeader from '../../components/signHeader/signHeader.component';
import SubmitButton from '../../components/submitButton/submitButton.component';

import { validateEmail, isEmailBusiness } from '../../assets/utils/inputCheck.utils';
import config from '../../config/config';

import './signUp.styles.css';

class SignUpPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            userId: '',
            userPassword: '',
            userFirstName: '',
            userLastName: '',
            currentStep: 1,
            inputEmpty: false,
            loaderVisible: false,
            isResRecieved: false,
            loginError: false
        }
    }

    

    onButtonClickHandle = (event) => {
        const { userId, userPassword, currentStep, userFirstName, userLastName } = this.state;
        switch (currentStep) {
            case 1:
                if (validateEmail(userId) && isEmailBusiness(userId)) {
                    this.setState({ currentStep: currentStep + 1 })
                } else {
                    this.setState({ inputEmpty: true })
                }
                break;

            case 2:
                if (userPassword !== '' && userFirstName !== '' && userLastName !== '') {
                    this.setState({loaderVisible: true})
                    fetch(`${config.prod_server_api}/register-user/register`, {
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
                                "email": `${userId}`,
                                "firstname": `${userFirstName}`,
                                "lastname": `${userLastName}`,
                                "password": `${userPassword}`,
                                "currentHost": `${config.current_host}`
                            }
                        })
                    })
                    .then(response => response.json())
                    .then( (data) => {
                      if(data.verificationStatus.status === 200){
                        if( data.verificationStatus.isAlreadyCreated ){
                         alert('user already created')
                        }else{
                          this.setState({isResRecieved: true})
                        }
                      }
                      this.setState({loaderVisible: false})
                    })
                    .catch( err => { 
                        this.setState({loaderVisible: false}) 
                        this.setState({loginError: true})
                    } 
                    )
                } else {
                    this.setState({ inputEmpty: true })
                    console.error("enter valid data in the fields")
                }
                break;

            default:
                break;
        }
        event.preventDefault();
    }

    onInputChange = (e) => {
        const { value, name } = e.target;
        this.setState({ inputEmpty: false });
        switch (name) {
            case 'userId':
                this.setState({ userId: value })
                break;

            case 'userPassword':
                this.setState({ userPassword: value })
                break;

            case 'userFirstName':
                this.setState({ userFirstName: value })
                break;


            case 'userLastName':
                this.setState({ userLastName: value })
                break;

            default:
                break;
        }

    }

    render() {
        const { userId, userPassword, inputEmpty, userFirstName, userLastName, currentStep, loaderVisible, isResRecieved } = this.state,
            onButtonClickHandle = this.onButtonClickHandle,
            onInputChange = this.onInputChange;
        return (
                !isResRecieved ? (
                    <div className="dashboard-body login">
                <Container fluid>
                    <SignHeader goToPage='in' />
                    <div className="login-container sign-up">
                        <h1>
                            Create a free account
                            <div className="subtitle hidden-xs">
                                IntelligenSe can be used for free, forever.
                            </div>
                        </h1>
                        <div className="board-box">
                            <form className="email-signup-form">
                                {currentStep === 1 ? (
                                    <div className="form-container containerone">
                                        <div className="form-group group">
                                            <label htmlFor="email-signup-field">
                                                Work email address
                                            </label>
                                            <input autoComplete="email" autoFocus="autofocus" className="form-control input-lg" id="email-signup-field" name="userId" placeholder="you@company.com" required="required" type="email" value={userId} onChange={onInputChange} />
                                        </div>
                                        <button className="full-width btn-lg btn-orange" disabled={userId && validateEmail(userId) ? false : true} id="signup-email-button" onClick={onButtonClickHandle}>Continue</button>
                                        <p className="terms-mention grey">
                                            By signing up, you agree to our
                                            <Link to="/terms-of-service" target="_blank">Terms of Service</Link>
                                            and our
                                            <Link to="/privacy-policy" target="_blank">Privacy Policy</Link>.
                                        </p>
                                    </div>) : (
                                    <div className="form-container containertwo">
                                        <Row>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label htmlFor="first-name-field">
                                                        First name
                                                    </label>
                                                    <input autoComplete="given-name" className="form-control input-lg" id="first-name-field" name="userFirstName" placeholder="First name" required="required" type="text" value={userFirstName} onChange={onInputChange} />
                                                </div>
                                            </Col>
                                            <Col md={6}>
                                                <div className="form-group">
                                                    <label htmlFor="last-name-field">
                                                        Last name
                                                    </label>
                                                    <input autoComplete="family-name" className="form-control input-lg" id="last-name-field" name="userLastName" placeholder="Last name" required="required" type="text" value={userLastName} onChange={onInputChange} />
                                                </div>
                                            </Col>
                                        </Row>
                                        <div className="form-group">
                                            <label htmlFor="password-field">
                                                Password
                                            </label>
                                            <input autoComplete="new-password" className="form-control input-lg" id="password-field" name="userPassword" placeholder="Enter a secured password..." required="required" type="password" value={userPassword} onChange={onInputChange} />
                                        </div>
                                        {/* <button className="btn-lg btn-orange" data-loading="Creating the account..." type="submit" onClick={onButtonClickHandle}>Create account</button> */}
                                        <SubmitButton isLoaderVisible={loaderVisible} onButtonClickHandle={onButtonClickHandle} dataloading="Creating the account..." >Create account</SubmitButton>

                                        {
                                            inputEmpty ?
                                                <Alert variant={'danger'}>
                                                    Please enter a valid data
                                                </Alert> : ''
                                        }
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                </Container>

                {
                    this.state.loginError ?
<                   Alert variant="danger" className="alert-small" onClose={() => this.setState({loginError: false})} dismissible>
                        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                        <p>
                            Please try again later.
                        </p>
                    </Alert>
                    : ''
                }
            </div>
                ) : (<Redirect to='/users/account-setup' /> )
        )
    }
}

export default SignUpPage
