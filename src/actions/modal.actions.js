import { modalConstants } from '../constants';

export const modalActions = {
    open,
    close,
};

function open(data) {
    return { type: modalConstants.OPEN, data };
}

function close() {
    return { type: modalConstants.CLOSE };
}