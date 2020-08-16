
import React, { Component } from 'react';
import styled from 'styled-components';

const AboutStyle = styled.div`

`;

export default class About extends Component {
    
    constructor(props) {
        super(props);

        this.mounted = false;

        this.state = {
            loggedIn: 0
        }
    }

    componentDidMount() {
        this.mounted = true;

        const lsLoggedIn = localStorage.getItem('loggedIn');
        if (lsLoggedIn === 1) {
            console.log("We are already logged in at ABOUT")
            this.setState({
                loggedIn: 1
            })
        }       
    }

    componentWillMount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props !== undefined) {
            if (this.props.stateLogin !== prevProps.stateLogin) {
                this.setState({
                    loggedIn: this.props.stateLogin
                })
            }
        }
    }

    render() {
        const isLoggedIn = this.state.loggedIn
        let about;
        if (isLoggedIn === 1) {
            about = (
                <AboutStyle>
                <div className="about-container">
                    <h2 className="about-title">About Home Temperature Control</h2>

                </div>
                </AboutStyle>
            )
        } else {
            about = (
                <div className="about-container"></div>
            )
        }
        // Render the page
        return (
            <div>
                {about}
            </div>
        )
    }
}