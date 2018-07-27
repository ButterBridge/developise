import * as jobUtils from '../utils/job';
import {expect} from 'chai';
import * as samples from './spec-data';

describe.only('utils: job', () => {
    describe('determineJobDifficulty', () => {
        it('predictably returns a difficulty when provided a seed', () => {
            let pseudoCompany = {prestige : 2};
            let result = jobUtils.determineJobDifficulty(pseudoCompany, 0.5);
            expect(result).to.equal(1);
            pseudoCompany = {prestige : 10};
            result = jobUtils.determineJobDifficulty(pseudoCompany, 0.9);
            expect(result).to.equal(11);
        });
        it('returns at least 1 even when algorithmically it would return less', () => {
            const pseudoCompany = {prestige : 1};
            const result = jobUtils.determineJobDifficulty(pseudoCompany, 0.1);
            expect(result).to.equal(1);
        });
    });

    describe('determineJobAdvertisedIn', () => {
        it('returns the source when just one is given', () => {
            const pseudoCompany = {advertisesIn : ['soc med']};
            const result = jobUtils.determineJobAdvertisedIn(pseudoCompany);
            expect(result).to.eql(['soc med']);
        });
        it('predictably return the correct length of sources when provided a seed', () => {
            const pseudoCompany = {advertisesIn : ['soc med', 'med soc', 'red boc', 'boc red']};
            let result = jobUtils.determineJobAdvertisedIn(pseudoCompany, 0.5);
            expect(result.length).to.equal(2);
            result = jobUtils.determineJobAdvertisedIn(pseudoCompany, 1);
            expect(result.length).to.equal(4);
            result = jobUtils.determineJobAdvertisedIn(pseudoCompany, 0.01);
            expect(result.length).to.equal(1);
        });
    });
});