import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Container, Grid, Header, Message, Segment } from 'semantic-ui-react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../actions'

export const RegisterForm = () => {
    let [user, setUser] = useState({
        email: '',
        username: '',
        password: ''
    });
    const dispatch = useDispatch();

    function handleSubmit(event) {
        event.preventDefault();
        if (user.email && user.username && user.password) {
            dispatch(userActions.register(user.email, user.password))
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
                                <label>Username</label>
                                <Input name="username" onChange={handleChange} placeholder='JhonDoe1994' />
                            </Form.Field>
                            <Form.Field>
                                <label>Email</label>
                                <Input name="email" onChange={handleChange} placeholder='jhon@doe.com' />
                            </Form.Field>
                            <Form.Field>
                                <label>Password</label>
                                <Input name="password" onChange={handleChange} placeholder='******' />
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
