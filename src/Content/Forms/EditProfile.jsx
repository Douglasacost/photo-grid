import React, { useState, useEffect } from 'react'
import { Button, Checkbox, Form, Input, Container, Grid, Header, Message, Segment, Divider } from 'semantic-ui-react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { userActions } from '../../actions'
import _ from 'lodash'
import * as yup from 'yup';

const NUMBER_ERROR = "Must be a number";
export const EditForm = () => {
    const currentUserData = useSelector(state=> state.authentication.user)
    let [user, setUser] = useState({
        name: "",
        username: "",
        email: "",
        address: {
            street: "",
            suite: "",
            city: "",
            zipcode: "",
            geo: {
                lat: "",
                lng: ""
            }
        },
        phone: "",
        website: "",
        company: {
            name: "",
            catchPhrase: "",
            bs: ""
        }    
    });
    let [errorObject, setError] = useState({});

    useEffect(() => {
        setUser(currentUserData)
    }, [currentUserData]);

    let schema = yup.object().shape({
        name: yup.string().required(),
        username: yup.string().required(),
        email: yup.string().email("Please enter a valid email address"),
        address: yup.object().shape({
            street: yup.string().required(),
            suite: yup.string().required(),
            city: yup.string().required(),
            zipcode: yup.string().required(),
            geo: yup.object().shape({
                lat: yup.number().typeError(NUMBER_ERROR).required(),
                lng: yup.number().typeError(NUMBER_ERROR).required(),
            })
        }),
        website: yup.string(),
        phone: yup.string().required(),
        company: yup.object().shape({
            name: yup.string(),
            catchPhrase: yup.string(),
            bs: yup.string(),
        })
    });
    const dispatch = useDispatch();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('sumbiting')
        try {
            await schema.validate(user)
            console.log('sumbited')
            dispatch(userActions.update(user))
        } catch (error) {
            console.log('sumbit error', error)
        }
    }

    const handleChange = async (event) => {
        const { name, value } = event.target;
        const finalUser = _.set(Object.assign({}, user), name, value)
        const objectAux = Object.assign({}, errorObject);
        try {
            await schema.validateAt(name, finalUser);
            _.set(objectAux, name, false)
        } catch (error) {
            _.set(objectAux, name, {
                content: error.message,
                pointing: 'below',
            })
        }
        setError({
            ...errorObject,
            ...objectAux
        })
        setUser({
            ...user,
            ...finalUser
        })
    }

    function error(path) {
        return _.get(errorObject, path, false);
    }

    return (
        <Container>
            <Grid textAlign='center' style={{ height: 'auto' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 660, width: '50%' }}>
                    <Header as='h2' color='teal' textAlign='center'>
                        Edit your profile
                </Header>
                    <Form style={{ textAlign: 'justify' }} size='big' onSubmit={handleSubmit}>
                        <Segment stacked>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    name='name'
                                    value={user.name}
                                    label='Full Name'
                                    placeholder='Full Name'
                                    error={error('name')}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    name='username'
                                    value={user.username}
                                    label='Username'
                                    placeholder='Username'
                                    error={error('username')}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Field
                                control={Input}
                                name='email'
                                value={user.email}
                                label='Email'
                                placeholder='email@host.com'
                                error={error('email')}
                                onChange={handleChange}
                            />
                            <Divider horizontal>Address information</Divider>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    name='address.street'
                                    value={user.address.street}
                                    label='Street'
                                    placeholder='Street'
                                    error={error('address.street')}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    name='address.suite'
                                    value={user.address.suite}
                                    label='Suite'
                                    placeholder='Suite'
                                    error={error('address.suite')}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    name='address.city'
                                    value={user.address.city}
                                    label='City'
                                    placeholder='City'
                                    error={error('address.city')}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    name='address.zipcode'
                                    value={user.address.zipcode}
                                    label='Zip code'
                                    placeholder='Zip code'
                                    error={error('address.zipcode')}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <label><strong>Geo coordinates:</strong></label>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    name='address.geo.lat'
                                    value={user.address.geo.lat}
                                    label='Latitude'
                                    placeholder='Latitude'
                                    error={error('address.geo.lat')}
                                    onChange={handleChange}
                                />
                                <Form.Field
                                    control={Input}
                                    name='address.geo.lng'
                                    value={user.address.geo.lng}
                                    label='Longitude'
                                    placeholder='Longitude'
                                    error={error('address.geo.lng')}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Divider horizontal>Company information</Divider>
                            <Form.Group widths='equal'>
                                <Form.Field
                                    control={Input}
                                    name='company.name'
                                    value={user.company.name}
                                    label='Company Name'
                                    placeholder='Company Name'
                                    error={error('company.name')}
                                    onChange={handleChange}
                                />
                                <Form.Field>
                                    <Form.TextArea onChange={handleChange} label='Cath phrase' value={user.company.catchPhrase} name="company.catchPhrase" placeholder='very long text...' />
                                </Form.Field>
                                <Form.Field>
                                    <Form.TextArea onChange={handleChange} label='Bussines' value={user.company.bs} name="company.bs" placeholder='very long text...' />
                                </Form.Field>
                            </Form.Group>
                            <Divider horizontal>Aditional cotact info</Divider>
                            <Form.Group widths='equal'>
                                <Form.Field>
                                    <label>Phone</label>
                                    <Input name="phone" value={user.phone} onChange={handleChange} placeholder='+123456789' />
                                </Form.Field>
                                <Form.Field>
                                    <label>Webpage</label>
                                    <Input name="website" value={user.website} onChange={handleChange} placeholder='webpage.com' />
                                </Form.Field>
                            </Form.Group>
                            <Button type='submit'>Submit</Button>
                        </Segment>
                    </Form>
                </Grid.Column>
                <Grid.Column style={{ maxWidth: 660, width: '50%' }}>
                    <Message style={{ wordBreak: 'break-word' }}>
                        <code>
                            {JSON.stringify(user)}
                        </code>
                    </Message>

                </Grid.Column>
            </Grid>
        </Container>
    )
}
