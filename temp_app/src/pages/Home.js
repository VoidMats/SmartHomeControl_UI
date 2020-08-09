
import React, { Component } from 'react';
import styled from 'styled-components';

const GridWrapper = styled.div`
    display: grid;
    grid-gap: 10px;
    margin-top: 1em;
    margin-left: 6em;
    margin-right: 6em;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: minmax(25px, auto);
`;

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.mounted = false;

        this.state = {
            loggedIn: false
        }

    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    componentDidUpdate(prevProps, prevState) {
        // Can't update with undefined props
        if (this.props !== undefined) {
            // Only update if props changed
            if (this.props.stateLogin !== prevProps.stateLogin) {
                console.log("We gona update UI here")
                this.setState({
                    loggedIn: this.props.stateLogin
                })
            }
        }
    }

    render() {
        return (
            () => {

            }
        )
    }
}