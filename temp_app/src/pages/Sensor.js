
import React from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';
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

export const Sensor = () => (
    <GridWrapper>
        <h2>Sensor Page</h2>
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
                <Form.Text className="text-muted">
                We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
        <p>I am a kitty cat, sup, feed me, no cares in the world</p>
        <p>Meow meow, I tell my human purr for no reason but to chase after</p>
    </GridWrapper>
)