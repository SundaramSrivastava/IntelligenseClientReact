import React from 'react';
import { Link } from "react-router-dom";
import { withRouter } from "react-router";

import './EmailVerification.styles.css';

import config from '../../config/config';

class EmailVerification extends React.Component {
    constructor(props) {
        super(props)
    
        this.state = {
             isLoading: true,
             isVerified: false
        }
    }
    
    componentDidMount() {
        fetch( `${config.prod_server_api}/register-user/verification?token=${this.props.match.params.token}&email=${this.props.match.params.email}&jwtToken=${this.props.match.params.jwtToken}` )
    .then(res=> res.json())
    .then( data =>{
     this.setState({isVerified: data.status})
        this.setState({isLoading: false})
    })
    .catch( err => {
      this.setState({isLoading: false})
    })
    }
    render(){
        const {isVerified, isLoading} = this.state;
    return (
        <div className="cym pageHolder404">
            <div className="dialog404">
                <div className="error-code">{
                    isLoading ? 'Verifying ...' : isVerified ? 'User Created' : 'Something went wrong' }</div>
                {
                    isVerified && !isLoading ?
                    (<><h1>Success !!!</h1>
                <p>Congrats.. Your account has been successfully created.</p>
                <Link className="cta" to="/">Homepage</Link><Link className="cta" to="/users/sign-in">Sign In</Link></>) : ('')
                }
                
            </div>
        </div>
    )
    }
}

export default withRouter(EmailVerification)
