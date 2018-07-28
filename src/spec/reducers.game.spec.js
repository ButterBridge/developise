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

describe.only('gameReducer', () => {
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
        const prevState = getInitialGameState();
        const action = actions.progressToNextDay();
        const newState = gameReducer(prevState, action);
        it('should add some jobs', () => {
            expect(Object.keys(newState.jobs).length).to.equal(action.payload.newJobCount);
        });
        it('should progress the day by one', () => {
            expect(newState.day).to.equal(1);
        });
        it('should set the the phase to 0', () => {
            expect(newState.phase).to.equal(0);
        });
        it('should not mutate state', () => {
            expect(newState).to.not.equal(prevState);
        });
    });

    describe('type: PROGRESS_TO_NEXT_PHASE', () => {
        const prevState = getInitialGameState();
        const action = actions.progressToNextPhase();
        const newState = gameReducer(prevState, action);
        it('should set the the phase to 0', () => {
            expect(newState.phase).to.equal(2);
        });
        it('should not mutate state', () => {
            expect(newState).to.not.equal(prevState);
        });
    });

    describe('type: EXPLORE_SOURCE', () => {
        const prevState = getInitialGameState();
        const action = actions.exploreSource()
    });

});