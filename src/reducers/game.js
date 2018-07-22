import * as types from '../actions/types';
import {generateJob} from '../utils/job';

const initialState = {
    day : 0,
    phase : 1,
    jobs : []
}

export default (state = initialState, action = {payload : {}}) => {
    switch (action.type) {
    case types.PROGRESS_TO_NEXT_DAY:
        const newJob = generateJob(action.payload.companies, action.payload.competencies);
        return {
            ...state,
            jobs : [...state.jobs, newJob],
            day : state.day + 1,
            phase : 0
        };
    case types.PROGRESS_TO_NEXT_PHASE:
        return {
            ...state,
            phase : state.phase + 1
        };
    default:
        return state;
    }
}