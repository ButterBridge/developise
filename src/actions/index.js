import * as types from './types';
import store from '../store';

export const progressToNextDay = () => dispatch => {
    dispatch({
        type : types.PROGRESS_TO_NEXT_DAY,
        payload : {
            companies : store.getState().companies
        }
    })
}