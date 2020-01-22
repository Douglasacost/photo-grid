import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageAlert = ({type, message}) => (
  <Message negative={type === 'alert-error'} positive={type === 'alert-success'}>
    <Message.Header>{type}</Message.Header>
    <p>{message}</p>
  </Message>
)

export default MessageAlert