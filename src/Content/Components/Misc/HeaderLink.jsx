import React from 'react'
import { Menu } from 'semantic-ui-react'
import { history } from '../../../helpers';

function HeaderLink({ text, path, setView, ...rest }) {
    function handleClick() {
        setView(text)
        history.push(path);
    }
    return (
        <Menu.Item as='a' onClick={handleClick} {...rest}>
            {text}
        </Menu.Item>
    )
}

export default HeaderLink