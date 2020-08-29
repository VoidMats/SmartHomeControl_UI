
import React, { Component } from "react";
import styled from 'styled-components';
import API from '../classes/API.js';

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
        this.api = new API();

        this.state = {
            loggedIn: 0,
            loggedInAs: '',
            formUser: '',
            formPassword: '' 
        }

        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogut = this.handleLogut.bind(this);
        this.handleChangeForm = this.handleChangeForm.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
        
        /*
        const lsLoggedIn = localStorage.getItem('loggedIn');
        const lsLoggedInAs = localStorage.getItem('loggedInAs');
        if (lsLoggedIn === 1) {
            console.log("We are in componentDidMount - Login and we are already login")
            this.setState({
                loggedIn: 1,
                loggedInAs: lsLoggedInAs
            })
            this.props.onLogin(1);
        }*/
    }

    componentWillUnmount() {
        this.mounted = false;
        this.api.abort();
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== undefined) {
            // Only update if props changed
            if (this.props.stateLogin !== prevProps.stateLogin) {
                console.log("We gona update UI Login here")
                this.setState({
                    loggedIn: this.props.stateLogin
                })
            }
        }
    }

    handleChangeForm(event) {
        const target = event.target;
        const name = target.name;
        let value = '';
        switch (name) {
            case 'formUser':
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
        
        let apiResult = false;
        this.api.login(this.state.formUser, this.state.formPassword)
            .then(result => {
                if (result !== undefined) {
                    localStorage.setItem('jwt', result);
                    localStorage.setItem('loggedIn', 1);
                    localStorage.setItem('loggedInAs', this.state.formUser);
                    apiResult = true;
                }
            })
            .catch(error => {
                console.warn(error)
            })

        if (apiResult) {
            this.setState({
                loggedIn: 1,
                loggedInAs: this.state.formUser 
            });
            this.props.onLogin(1);
        }

        event.preventDefault();
    }

    handleLogut(event) {
        this.setState({
            loggedIn: 0,
            loggedInAs: ''
        });
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('loggedInAs');
        localStorage.removeItem('jwt');
    }
    
    render() {
        const isLoggedIn = this.state.loggedIn
        let login;
        if (isLoggedIn === 0) {
            login = (
                <LoginStyle>
                <div className="login-container">
                    <form className="login-form">
                        <h3 className="login-title">Sign In</h3>
    
                        <div className="login-form-input">
                            <label>Username</label>
                            <input 
                                type="username"
                                className="login-form-input"
                                name="formUser" 
                                placeholder="Enter username"
                                value={this.state.formUser}
                                onChange={this.handleChangeForm} />
                        </div>
    
                        <div className="login-form-input">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="login-form-input"
                                name="formPassword" 
                                placeholder="Enter password"
                                value={this.state.formPassword}
                                onChange={this.handleChangeForm} />
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
            )
        } else {
            login = (
                <div className="login-container"></div>
            )
        }

        return ( 
            <div>
                {login}
            </div>
        )
    }
}

