import React from 'react'
import { Button } from 'semantic-ui-react'
import { history } from '../../../helpers';

function HeaderButton({ text, path, ...rest }) {
    function handleClick() {
        history.push(path);
    }
    return (
        <Button as='a' onClick={handleClick} {...rest}>
            {text}
        </Button>
    )
}

export default HeaderButton