import * as types from '../actions/types';

export const getInitialPlayerState = () => {
    return {
        name : 'Jonny',
        portfolio : [],
        competencies : {
            'Skillz' : (Math.random() * 1000 >> 0) + 1000,
            'LMTH' : Math.random() * 500 >> 0,
            'HearSS' : Math.random() * 500 >> 0
        },
        money : 100
    }
}

export default (state = getInitialPlayerState(), action = {payload : {}}) => {
    switch (action.type) {
    case types.LEARN_COMPETENCY:
        return {
            ...state,
            competencies : {
                ...state.competencies,
                [action.payload.competency] : state.competencies[action.payload.competency] + action.payload.increase
            }
        };
    case types.COMPLETE_JOB:
        return {
            ...state,
            portfolio : [...state.portfolio, {
                ...action.payload.job,
                completedOnDay : action.payload.completionDay
            }],
            money : state.money + action.payload.job.pay
        }
    default:
        return state;
    }
}