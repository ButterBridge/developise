import { combineReducers } from 'redux';

import game from './game';
import player from './player';
import companies from './companies';
import competencies from './competencies';
export default combineReducers({
    game, player, companies, competencies
});