import * as actionTypes from './actionTypes';

const initialState = {
    auth: true,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTHORIZE:
            return {...state, auth: true};
        case actionTypes.UNAUTHORIZE: 
            return {...state, auth: false};
        default:
            return state;
    }
};

export default reducer;