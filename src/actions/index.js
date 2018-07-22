import * as types from './types';

export const progressToNextDay = () => dispatch => {
    dispatch({
        type : types.PROGRESS_TO_NEXT_DAY
    })
}