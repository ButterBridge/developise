import { combineReducers } from 'redux';

import game from './game';
import player from './player';
import companies from './companies';
import competencies from './competencies';
import sources from './sources';
export default combineReducers({
    game, player, companies, competencies, sources
});