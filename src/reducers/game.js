import * as types from '../actions/types';
import {generateJob, progressJobsByOneDay, affectJobsBySourceExploration} from '../utils/job';

const initialState = {
    day : 0,
    phase : 1,
    jobs : []
}

export default (state = initialState, {payload, type}) => {
    switch (type) {
        case types.PROGRESS_TO_NEXT_DAY:
            const newJobs = Array(Math.random() * 3 >> 0).fill().map(x => generateJob(payload.companies, payload.competencies));
            const jobsPostProgression = progressJobsByOneDay(state.jobs, payload.competencies);
            return {
                ...state,
                jobs : [...jobsPostProgression, ...newJobs],
                day : state.day + 1,
                phase : 0
            };
        case types.PROGRESS_TO_NEXT_PHASE:
            return {
                ...state,
                phase : state.phase + 1
            };
        case types.EXPLORE_SOURCE:
            const jobsPostSourceExploration = affectJobsBySourceExploration(state.jobs, payload.source, payload.effectivenessMult);
            return {
                ...state,
                jobs : jobsPostSourceExploration
            }
        case types.APPLY_FOR_JOB:
            const jobsPostApplication = state.jobs.map(job => {
                return payload.job === job ?
                    {
                        ...job,
                        status : 'applied'
                    } :
                    job
            });
            return {
                ...state,
                jobs : jobsPostApplication
            }
        default:
            return state;
    }
}