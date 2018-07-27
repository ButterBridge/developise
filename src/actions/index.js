import * as types from './types';
import store from '../store';

export const progressToNextDay = () => {
    const {companies, competencies} = store.getState();
    const newJobCount = Math.random() * 3 >> 0
    return {
        type : types.PROGRESS_TO_NEXT_DAY,
        payload : {
            companies, competencies, newJobCount
        }
    };
}

export const progressToNextPhase = () => ({type : types.PROGRESS_TO_NEXT_PHASE});

export const exploreSource = (source, effectivenessMult) => {
    return {
        type : types.EXPLORE_SOURCE,
        payload : {source, effectivenessMult}
    }
}

export const changeJobApplicationStatus = (job, newStatus, indicator, indication) => {
    return {
        type : types.CHANGE_JOB_APPLICATION_STATUS,
        payload : {job, newStatus, indicator, indication}
    }
}

export const learnCompetency = competency => {
    return {
        type : types.LEARN_COMPETENCY,
        payload : {
            competency,
            increase : Math.random() * 60
        }
    };
}