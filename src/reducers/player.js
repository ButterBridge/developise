import * as types from '../actions/types';

const initialState = {
    name : 'Jonny',
    portfolio : [],
    competencies : {
        'LMTH' : Math.random() * 500 >> 0,
        'HearSS' : Math.random() * 500 >> 0
    },
    
}

export default (state = initialState, action = {payload : {}}) => {
    switch (action.type) {
    case types.LEARN_COMPETENCY:
        return {
            ...state,
            competencies : {
                ...state.competencies,
                [action.payload.competency] : state.competencies[action.payload.competency] + action.payload.increase
            }
        };
    default:
        return state;
    }
}