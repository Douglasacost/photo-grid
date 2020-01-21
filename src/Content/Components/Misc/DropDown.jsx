import React from 'react'
import { Dropdown as DD } from 'semantic-ui-react'

const Dropdown = () => (
  <DD text='Select View'>
    <DD.Menu>
      <DD.Item text='All' />
      <DD.Item text='Only my photos' />
    </DD.Menu>
  </DD>
)

export default Dropdown