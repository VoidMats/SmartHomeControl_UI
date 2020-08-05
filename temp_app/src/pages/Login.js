
import React, { Component } from "react";
import styled from 'styled-components';
//import API from '../classes/API.js';

// TODO place login vertically in the middle
const LoginStyle = styled.div`
    .login-container {
        height: 100%;
        width: 100%;
        margin:0;
        display: flex;
    }
    .login-form {
        background-color: #dbeae3;
        border: 2px solid #42554b;
        border-radius: 4px;
        margin: auto;
    }
    .login-title {
        text-align: center;
        padding: 16px 0px; 
    }
    .login-form-input {
        border: 2px solid #8cc3a8;
        border-radius: 4px;
        margin: 8px 8px 8px 8px;
        padding: 4px 4px 4px 4px;
    }
`;

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.mounted = false;
        //this.api = props.api;

        this.state = {
            loggedIn: false,
            loggedInAs: '',
            formUser: '',
            formPassword: '' 
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogut = this.handleLogut.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        this.mounted = true;

        const lsLoggedIn = localStorage.getItem('loggedIn');
        const lsLoggedInAs = localStorage.getItem('loggedInAs');
        if (lsLoggedIn === 'true') {
            this.setState({
                loggedIn: lsLoggedIn,
                loggedInAs: lsLoggedInAs
            })
        }
    }

    componentDidUpdate(prevProps, prevState) {
        // Can't update with undefined props
        if (this.props !== undefined) {
            // TODO place my code here
        }
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;
        let value = '';
        switch (name) {
            case 'formName':
                value = target.value;
                break;
            case 'formPassword':
                value = target.value;
                break;
            default:
                console.error("Error - handleChange got default value")
        }

        this.setState({
            [name]: value
        });
    }

    handleLogin(event) {
        console.log('This is triggered')
        
        const res = this.props.api.login(this.state.formUser, this.state.formPassword)
        console.log(res)

        this.setState({
            loggedIn: true,
            loggedInAs: this.state.formUser 
        });
        localStorage.setItem('loggedIn', true);
        localStorage.setItem('loggedInAs', this.state.formUser);

        event.preventDefault();
    }

    handleLogut() {
        this.setState({
            loggedIn: false,
            loggedInAs: ''
        });
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInAs');
    }
    
    render() {
        return (
            <LoginStyle>
                <div className="login-container">
                    <form className="login-form">
                        <h3 className="login-title">Sign In</h3>

                        <div className="login-form-input">
                            <label>Username</label>
                            <input 
                                type="username"
                                className="login-form-input"
                                name="formName" 
                                placeholder="Enter username"
                                value={this.state.formUser}
                                onChange={this.handleChange} />
                        </div>

                        <div className="login-form-input">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="login-form-input"
                                name="formPassword" 
                                placeholder="Enter password"
                                value={this.state.formPassword}
                                onChange={this.handleChange} />
                        </div>

                        <div className="row justify-content-center">
                            <button 
                                type="submit" 
                                className="btn btn-outline-primary"
                                onClick={this.handleLogin}>Login</button>
                        </div>
                        
                    </form>
                </div>
            </LoginStyle>
        );
    }
}

/* 
<p className="login-forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>



<div className="form-group">
<div className="custom-control custom-checkbox">
    <input type="checkbox" className="custom-control-input" id="customCheck1" />
    <label className="custom-control-label" htmlFor="customCheck1">Remember me</label>
    </div>
</div>
*/