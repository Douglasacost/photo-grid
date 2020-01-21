import React from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'

function PhotoModal({open, data, onClose}){
    return (
        <Modal open={open} onClose={onClose}>
          <Modal.Header>Photo</Modal.Header>
          <Modal.Content image>
            <Image wrapped size='medium' src={data.url} />
            <Modal.Description>
              <Header>{data.title}</Header>
              <p>
                We've found the following gravatar image associated with your e-mail
                address.
              </p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
          </Modal.Content>
        </Modal>
      )
}

export default PhotoModal