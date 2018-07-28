import {pickViaShare, pickViaLoading, keyByProperty} from './helpers';
import {shuffle} from 'lodash';
import {generate as genId} from 'shortid';

export const generateJob = (companies, competencies, seed) => {
    const jobCompany = pickViaShare(companies, 'prestige', seed);
    const jobDifficulty = determineJobDifficulty(jobCompany, seed)
    const jobCompetencies = determineJobCompetencies(jobCompany, jobDifficulty, competencies, seed);
    const jobAdvertisedIn = determineJobAdvertisedIn(jobCompany, seed);
    const jobLength = determineJobLength(jobCompany, seed);
    const jobPay = determinePay(jobCompany, jobDifficulty, jobLength, seed);
    const jobApplicationDeadline = determineApplicationDeadline(jobCompany, seed);
    const job = {
        id : genId(),
        age : 1,
        status : 'open',
        company : jobCompany,
        difficulty : jobDifficulty,
        competencies : jobCompetencies,
        deadline : jobApplicationDeadline,
        pay : jobPay,
        advertisedIn : jobAdvertisedIn,
        hoursToDiscover : (seed || Math.random()) * 24,
        discoveredIn : null,
        applicants : 0,
        hoursToComplete : jobLength,
        undertaken : false,
        hoursPutIn : 0
    }
    return job;
}

export const determineJobDifficulty = (company, seed) => {
    const prestigeDifficulty = Math.floor((seed || Math.random()) * company.prestige);
    const randomDifficulty = Math.floor((seed || Math.random()) * 5 - 2.5);
    return Math.max(prestigeDifficulty + randomDifficulty, 1);
}

export const determineJobAdvertisedIn = (company, seed) => {
    const numberOfSourcesAdvertisedIn = Math.max((seed || Math.random()) * company.advertisesIn.length >> 0, 1);
    const shuffledSources = shuffle(company.advertisesIn);
    return shuffledSources.slice(0, numberOfSourcesAdvertisedIn);
}

export const determineJobCompetencies = (company, difficulty, competencies, seed) => {
    return Array(difficulty).fill().reduce((acc, x) => {
        const field = pickViaLoading(company.fields, seed);
        const fieldCompetencies = Object.values(competencies).reduce((acc, competency) => {
            if (competency.fields.includes(field)) acc[competency.name] = competency;
            return acc;
        }, {});
        const competency = pickViaShare(fieldCompetencies, 'favour', seed);
        acc[competency.name] = acc[competency.name] ? acc[competency.name] + 1 : 1;
        return acc;
    }, {});
}

export const determineJobLength = (company, seed) => {
    const baseHours = Math.floor((seed || Math.random()) * 24);
    return Math.max(baseHours + company.prestige, 2); 
}

export const determinePay = (company, difficulty, length, seed) => {
    const basePay = Math.pow(company.prestige * (difficulty + 1) * length, 2) / 500;
    const adjPerc = ((seed || Math.random()) * 100 - 50) / 100;
    const adjFactor = (basePay >> 0).toString().length;
    const adjTotal = basePay * (1 + adjPerc) * adjFactor;
    const total = Math.floor((basePay + adjTotal) / 20) * 20
    return Math.max(total, 0);
}

export const determineApplicationDeadline = (company, seed) => {
    const rnd = (seed || Math.random());
    return rnd < company.formality ?
        Math.floor(3 + (seed || Math.random()) * 7) :
        null
}

export const progressJobsByOneDay = (jobs, competencies, seed) => {
    return keyByProperty(jobs.reduce((acc, job, i) => {
        if (job.status === 'open') {
            const progressedJob = progressOpenJobByOneDay(job, competencies, seed);
            if (progressedJob) acc.push(progressedJob);
        } else if (job.status === 'applied') {
            const progressedJob = progressAppliedJobByOneDay(job, seed);
        } else acc.push({
            ...job,
            age : job.age + 1
        })
        return acc;
    }, []), 'id');
}

export const progressOpenJobByOneDay = (job, competencies, seed) => {
    const newAge = job.age + 1;
    if (job.deadline) {
        if (newAge < job.deadline) {
            console.log('a job remains open for applications!')
            return {
                ...job,
                age : newAge
            }
        } else {
            console.log('the deadline for a job application has elapsed!')
        }
    } else {
        const baseChance = (job.age * job.company.prestige || 1);
        const totalCompetencyFavour = Object.keys(job.competencies).reduce((total, competency) => {
            return total + competencies[competency].favour;
        }, 0);
        const competencyCount = Object.values(job.competencies).length;
        const favourAvg = totalCompetencyFavour / competencyCount;
        const favourModifier = 1 + (favourAvg - 5) / 10;
        const applicantChance = baseChance * favourModifier;
        const applicantRoll = (seed || Math.random()) * 10;
        if (applicantRoll > applicantChance) {
            console.log('there was not a successful applicant today!')
            return {
                ...job,
                age : newAge
            }
        } else {
            console.log('an applicant took this job!')
        }
    }
}

export const progressAppliedJobByOneDay = (job, player, seed) => {
    const newAge = job.age + 1;
    const timeToReply = (job.timeToReply || 1 + (seed || Math.random()) * job.company.prestige >> 0) - 1;
    if (timeToReply > 0) {
        return {
            ...job,
            age : newAge,
            timeToReply
        }
    } else {
        const suitabilityScore = Object.values(job.application).reduce((acc, factorScore) => {
            return acc * factorScore;
        }, 1);
        const successBarrier = 0.5 * (1 + (suitabilityScore - job.difficulty) / 10);
        //TODO : change application status on success!
    }
}

export const affectJobsBySourceExploration = (jobs, source, effectivenessMult) => {
    return keyByProperty(jobs.map(job => {
        if (job.status === 'open') {
            let newHoursToDiscover = (job.hoursToDiscover > 0 && job.advertisedIn.includes(source.ref)) ? job.hoursToDiscover - (effectivenessMult || 1) * 6 : job.hoursToDiscover;
            let newDiscoveredIn = (newHoursToDiscover <= 0 && !job.discoveredIn) ? source : job.discoveredIn
            return {
                ...job,
                hoursToDiscover : Math.max(newHoursToDiscover, 0),
                discoveredIn : newDiscoveredIn
            }
        } else return job;
    }), 'id');
}