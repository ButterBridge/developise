import * as types from './types';
import store from '../store';

export const progressToNextDay = () => dispatch => {
    const {companies, competencies} = store.getState();
    dispatch({
        type : types.PROGRESS_TO_NEXT_DAY,
        payload : {
            companies, competencies
        }
    })
}