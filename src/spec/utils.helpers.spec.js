import * as helpers from '../utils/helpers';
import {expect} from 'chai';

describe('utils: helpers', () => {
    describe('pickViaShare', () => {
        it('picks the entity given when it is the only key available', () => {
            const entities = {'me' : {'name' : 'me', 'age' : 3}};
            const result = helpers.pickViaShare(entities, 'age');
            expect(result).to.eql({'name' : 'me', 'age' : 3});
        });
        it('chooses the only value with a positive keyed number from the entity collection', () => {
            const entities = {
                'me' : {
                    'name' : 'me',
                    'age' : 3
                },
                'you' : {
                    'name' : 'you',
                    'age' : 0
                }
            };
            const result = helpers.pickViaShare(entities, 'age', 0);
            expect(result).to.eql({'name' : 'me', 'age' : 3});
        });
        it('always returns a value that exists in the entity collection', () => {
            const entities = {
                'me' : {
                    'name' : 'me',
                    'age' : 3
                },
                'you' : {
                    'name' : 'you',
                    'age' : 2
                },
                'other' : {
                    'name' : 'other',
                    'age' : 1
                }
            };
            const result = helpers.pickViaShare(entities, 'age', 0.5);
            expect(['me', 'you', 'other'].includes(result.name)).to.be.true
        });
    });

    describe('pickViaLoading', () => {
        it('picks the key given when it is the only key available', () => {
            const entities = {'me' : 3};
            const result = helpers.pickViaLoading(entities);
            expect(result).to.equal('me');
        });
        it('chooses the only value with a positive keyed number from the entity collection', () => {
            const entities = {
                'me' : 0,
                'you' : 3
            };
            const result = helpers.pickViaLoading(entities);
            expect(result).to.equal('you');
        });
        it('always returns a value that exists in the entity collection', () => {
            const entities = {
                'me' : 1,
                'you' : 3,
                'other' : 33
            };
            const result = helpers.pickViaLoading(entities);
            expect(['me', 'you', 'other'].includes(result)).to.be.true
        });
    })
})