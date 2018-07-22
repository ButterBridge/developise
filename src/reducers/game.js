import * as types from '../actions/types';
import {generateJob} from '../utils/job';

const initialState = {
    day : 0,
    jobs : []
}

export default (state = initialState, action = {payload : {}}) => {
    switch (action.type) {
    case types.PROGRESS_TO_NEXT_DAY:
        const newJob = generateJob(action.payload.companies);
        return {
            ...state,
            jobs : [...state.jobs, newJob],
            day : state.day + 1
        };
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