import {expect} from 'chai';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import * as actions from '../actions';
import gameReducer, {getInitialGameState} from '../reducers/game';
import companiesReducer, {getInitialCompaniesState} from '../reducers/game';
import competenciesReducer, {getInitialCompetenciesState} from '../reducers/game';
import playerReducer, {getInitialPlayerState} from '../reducers/game';
import sourcesReducer, {getInitialSourcesState} from '../reducers/game';
import {generateJob, progressJobsByOneDay, affectJobsBySourceExploration} from '../utils/job';
import { keyByProperty } from '../utils/helpers';

createStore(combineReducers({gameReducer}));

describe('gameReducer', () => {
    describe('default behaviour', () => {
      it('returns the passed prevState if passed an unrecognised action', () => {
        const prevState = {};
        const newState = gameReducer(prevState, {
          type: 'whatever'
        });
        expect(newState).to.equal(prevState)
      });
      it('uses the default initialState if no prevState is passed', () => {
        const newState = gameReducer(undefined, {
          type: 'whatever'
        });
        expect(newState).to.eql(getInitialGameState());
      });
    });

    describe('type: PROGRESS_TO_NEXT_DAY', () => {
        let prevState = getInitialGameState();
        const action = actions.progressToNextDay();
        let newState = gameReducer(prevState, action);
        it('should add some jobs', () => {
            expect(Object.keys(newState.jobs).length).to.equal(action.payload.newJobCount);
        });
    })

});