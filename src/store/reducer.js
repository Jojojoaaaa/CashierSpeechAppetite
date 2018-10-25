import * as actionTypes from './actionTypes';

const initialState = {
    auth: false,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHORIZE:
            return {...state, auth: true};
        default:
            return state;
    }
};

export default reducer;