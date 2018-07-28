import * as jobUtils from '../utils/job';
import {expect} from 'chai';
import * as samples from './spec-data';

describe('utils: job', () => {
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

    describe('determineJobCompetencies', () => {
        it('returns the competency when it is the only one for the company\'s only listed field', () => {
            const competencies = samples.getSampleCompetencies();
            const pseudoCompany = {
                fields : {
                    'back-end' : 1
                },
            }
            const result = jobUtils.determineJobCompetencies(pseudoCompany, 1, competencies);
            expect(result).to.eql({
                'WordRelease' : 1
            })
        });
        it('matches the difficulty of the job provided', () => {
            const competencies = samples.getSampleCompetencies();
            const pseudoCompany = {
                fields : {
                    'back-end' : 1
                },
            }
            let result = jobUtils.determineJobCompetencies(pseudoCompany, 10, competencies);
            expect(result).to.eql({
                'WordRelease' : 10
            })
            const theNeighbourhood = samples.getSampleCompanies().neighbourhood;
            result = jobUtils.determineJobCompetencies(theNeighbourhood, 5, competencies);
            const totalSkillDemand = Object.values(result).reduce((total, val) => total + val);
            expect(totalSkillDemand).to.equal(5);
        });
        it('ensures all skills are valid competencies', () => {
            const competencies = samples.getSampleCompetencies();
            const theNeighbourhood = samples.getSampleCompanies().neighbourhood;
            let result = jobUtils.determineJobCompetencies(theNeighbourhood, 10, competencies);
            expect(Object.keys(result).every(compName => competencies[compName])).to.be.true;
        });
    });

    describe('determineJobLength', () => {
        it('provides a reliable length when given a seed', () => {
            let pseudoCompany = {prestige : 10};
            let result = jobUtils.determineJobLength(pseudoCompany, 0.5);
            expect(result).to.equal(22);
            pseudoCompany = {prestige : 7};
            result = jobUtils.determineJobLength(pseudoCompany, 0.7);
            expect(result).to.equal(23);
        });
        it('returns at least 2 even when algorithmically it would return less', () => {
            const pseudoCompany = {prestige : 0.1};
            const result = jobUtils.determineJobLength(pseudoCompany, 0.01);
            expect(result).to.equal(2);
        });
    });

    describe('determinePay', () => {
        it('provides a reliable value when given a seed', () => {
            let pseudoCompany = {prestige : 10};
            let result = jobUtils.determinePay(pseudoCompany, 4, 10, 0.5);
            expect(result).to.equal(2000);
            pseudoCompany = {prestige : 4};
            result = jobUtils.determinePay(pseudoCompany, 4, 4, 0.6);
            expect(result).to.equal(40);
        });
        it('returns at least 0 even when algorithmically it would return less', () => {
            const pseudoCompany = {prestige : 1};
            const result = jobUtils.determinePay(pseudoCompany, 1, 1, 0.1);
            expect(result).to.equal(0);
        });
    });

    describe('determineDeadline', () => {
        it('returns null for deadline when the formality is low compared to the seed', () => {
            let pseudoCompany = {formality : 0.1};
            let result = jobUtils.determineApplicationDeadline(pseudoCompany, 0.5);
            expect(result).to.equal(null);
        });
        it('returns a reliable result for deadline when the formality is high compared to the seed', () => {
            let pseudoCompany = {formality : 0.9};
            let result = jobUtils.determineApplicationDeadline(pseudoCompany, 0.5);
            expect(result).to.equal(6);
        });
    });

    describe('generateJob', () => {
        it('generates all expected properties of a job', () => {
            const companies = samples.getSampleCompanies();
            const competencies = samples.getSampleCompetencies();
            const newJob = jobUtils.generateJob(companies, competencies, 0.5);
            expect(newJob.id).to.be.a('string');
            expect(newJob.age).to.equal(1);
            expect(newJob.status).to.equal('open');
            expect(newJob.company.name).to.equal('family & friends');
            expect(Object.keys(newJob.competencies).length).to.equal(1);
            expect(newJob.deadline).to.equal(null);
            expect(newJob.pay).to.equal(0);
            expect(newJob.advertisedIn).to.eql(['family-friends']);
            expect(newJob.hoursToDiscover).to.equal(12);
            expect(newJob.discoveredIn).to.equal(null);
            expect(newJob.applicants).to.equal(0);
            expect(newJob.hoursToComplete).to.equal(13);
            expect(newJob.undertaken).to.be.false;
            expect(newJob.hoursPutIn).to.equal(0);
        });
    });

    describe('progressOpenJobByOneDay', () => {
        let sampleJob = samples.getSampleJob();
        const competencies = samples.getSampleCompetencies();
        it('returns a job that is not yet at its deadline with an increased age', () => {
            sampleJob = jobUtils.progressOpenJobByOneDay(sampleJob, competencies, 0.5);
            expect(sampleJob.age).to.equal(6);
        });
        it('does not return a job that has reached its deadline', () => {
            sampleJob = jobUtils.progressOpenJobByOneDay(sampleJob, competencies, 0.5)
            expect(sampleJob).to.be.undefined;
        });
    });
});