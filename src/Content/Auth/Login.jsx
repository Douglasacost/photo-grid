import React, { useState } from 'react'
import { Button, Form, Container, Grid, Header, Segment, Message } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../actions'
import { Link } from 'react-router-dom';

export const LoginForm = () => {
    let [user, setUser] = useState({
        username: '',
    });
    const dispatch = useDispatch();
    const loggingIn = useSelector(state => state.authentication.loggingIn);

    function handleSubmit(event) {
        event.preventDefault();
        if (user.username) {
            dispatch(userActions.login(user.username));
        }
    }

    function handleChange(event) {
        const { name, value } = event.target;
        setUser({
            ...user,
            [name]: value
        })
    }
    return (
        <Container>
            <Grid textAlign='center' style={{ height: '500px' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Log-in to your account
                    </Header>
                    <Form size='large' onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Form.Input onChange={handleChange} name="username" fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                            <Button className={loggingIn ? 'loading' : ''} color='teal' fluid size='large'>
                                Login
                            </Button>
                        </Segment>
                    </Form>
                    <Message>
                        New to us? <Link to="/register">Sign Up</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </Container>
    )
}