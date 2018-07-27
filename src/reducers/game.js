import * as types from '../actions/types';
import {generateJob, progressJobsByOneDay, affectJobsBySourceExploration} from '../utils/job';
import { keyByProperty } from '../utils/helpers';

export function getInitialGameState () {
    return {
        day : 0,
        phase : 1,
        jobs : {}
    }
}

export default (state = getInitialGameState(), {payload, type}) => {
    switch (type) {
        case types.PROGRESS_TO_NEXT_DAY:
            const newJobs = keyByProperty(Array(payload.newJobCount).fill().map(x => generateJob(payload.companies, payload.competencies)), 'id');
            const jobsPostProgression = progressJobsByOneDay(Object.values(state.jobs), payload.competencies);
            return {
                ...state,
                jobs : {...jobsPostProgression, ...newJobs},
                day : state.day + 1,
                phase : 0
            };
        case types.PROGRESS_TO_NEXT_PHASE:
            return {
                ...state,
                phase : state.phase + 1
            };
        case types.EXPLORE_SOURCE:
            const jobsPostSourceExploration = affectJobsBySourceExploration(Object.values(state.jobs), payload.source, payload.effectivenessMult);
            return {
                ...state,
                jobs : jobsPostSourceExploration
            }
        case types.CHANGE_JOB_APPLICATION_STATUS:
            const jobsPostApplication = keyByProperty(Object.values(state.jobs).map(job => {
                console.log(payload, job.id)
                return payload.job.id === job.id ?
                    {
                        ...job,
                        status : payload.newStatus,
                        [payload.indicator] : payload.indication
                    } :
                    job
            }), 'id');
            return {
                ...state,
                jobs : jobsPostApplication
            }
        default:
            return state;
    }
}