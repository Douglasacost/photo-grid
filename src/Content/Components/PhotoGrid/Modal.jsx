import React from 'react'
import { Header, Image, Modal } from 'semantic-ui-react'

function PhotoModal({ open, data, onClose }) {
  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Header>Photo</Modal.Header>
      <Modal.Content image>
        <Image wrapped size='medium' src={data.photoData.url} />
        <Modal.Description>
          <Header>{data.photoData.title}</Header>
          <p>
            The album description: {data.album.title}
          </p>
          <p>This photo belongs to: <strong>{data.user.name}</strong></p>
        </Modal.Description>
      </Modal.Content>
    </Modal>
  )
}

export default PhotoModal