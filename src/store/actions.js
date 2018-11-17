import * as actionTypes from './actionTypes';

export const authorize = () => {
    return {
        type: actionTypes.AUTHORIZE
    };
};
export const unAuthorize = () => {
    return {
        type: actionTypes.UNAUTHORIZE
    };
};
