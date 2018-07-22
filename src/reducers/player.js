import * as types from '../actions/types';

const initialState = {
    name : 'Jonny',
    portfolio : [],
    competencies : {
        'LMTH' : 1,
        'HearSS' : 1
    }
}

export default (state = initialState, action = {payload : {}}) => {
    switch (action.type) {
    // case types.LISTEN_TO_ARTICLES:
    //     return {
    //         ...state,
    //         ...action.payload
    //     };
    // case types.UPDATE_THREAD_KEYS:
    //     return {
    //         ...state,
    //         ...action.payload
    //     };
    default:
        return state;
    }
}