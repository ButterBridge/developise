import * as types from '../actions/types';
import {generateJob} from '../utils/job';

const initialState = {
    day : 0,
    phase : 1,
    jobs : []
}

export default (state = initialState, action) => {
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
    case types.EXPLORE_SOURCE:
        return {
            ...state,
            jobs : state.jobs.map(job => {
                let newHoursToDiscover = (job.hoursToDiscover > 0 && job.advertisedIn.includes(action.payload.source.name)) ? job.hoursToDiscover - (action.payload.effectivenessMult || 1) * 6 : job.hoursToDiscover;
                let newDiscoveredIn = (newHoursToDiscover <= 0 && !job.discoveredIn) ? action.payload.source : job.discoveredIn
                return {
                    ...job,
                    hoursToDiscover : newHoursToDiscover,
                    discoveredIn : newDiscoveredIn
                }
            }) 
        };
    default:
        return state;
    }
}