import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Container, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { userActions } from '../../actions'
import { Link } from 'react-router-dom';

export const RegisterForm = () => {
    let [user, setUser] = useState({
        fullname: '',
        username: '',
        email: ''
    });
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();
        if (user.fullname && user.username && user.email) {
            dispatch(userActions.register(user))
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
                        Register your account
                </Header>
                    <Form size='large' onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Form.Field>
                                <label>Full Name</label>
                                <Input name="fullname" onChange={handleChange} placeholder='Full Name' />
                            </Form.Field>
                            <Form.Field>
                                <label>Username</label>
                                <Input name="username" onChange={handleChange} placeholder='Username' />
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Input name="email" onChange={handleChange} placeholder='Email' />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox label='I agree to the Terms and Conditions' />
                            </Form.Field>
                            <Button type='submit'>Submit</Button>
                        </Segment>
                    </Form>
                    <Message>
                        Already registered? <Link to="/login">Log In</Link>
                    </Message>
                </Grid.Column>
            </Grid>
        </Container>
    )
}
