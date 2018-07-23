import * as types from './types';
import store from '../store';

export const progressToNextDay = () => dispatch => {
    const {companies, competencies} = store.getState();
    dispatch({
        type : types.PROGRESS_TO_NEXT_DAY,
        payload : {
            companies, competencies
        }
    });
}

export const progressToNextPhase = () => dispatch => dispatch({type : types.PROGRESS_TO_NEXT_PHASE});

export const exploreSource = (source, effectivenessMult) => dispatch => {
    dispatch({
        type : types.EXPLORE_SOURCE,
        payload : {source, effectivenessMult}
    })
}

export const learnCompetency = competency => dispatch => {
    dispatch({
        type : types.LEARN_COMPETENCY,
        payload : {
            competency,
            increase : Math.random() * 60
        }
    });
}