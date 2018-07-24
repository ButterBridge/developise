import {pickViaShare, pickViaLoading, keyByProperty} from './helpers';
import {shuffle} from 'lodash';

export const generateJob = (companies, competencies) => {
    const jobCompany = pickViaShare(companies, 'prestige');
    const jobDifficulty = determineJobDifficulty(jobCompany)
    const jobCompetencies = determineJobCompetencies(jobCompany, jobDifficulty, competencies);
    const jobAdvertisedIn = determineJobAdvertisedIn(jobCompany);
    const jobLength = determineJobLength(jobCompany);
    const jobPay = determinePay(jobCompany, jobDifficulty, jobLength);
    const jobApplicationDeadline = determineApplicationDeadline(jobCompany);
    const job = {
        id : Math.random().toFixed(6),
        age : 1,
        status : 'open',
        company : jobCompany,
        competencies : jobCompetencies,
        deadline : jobApplicationDeadline,
        pay : Math.floor(jobPay / 20) * 20,
        advertisedIn : jobAdvertisedIn,
        hoursToDiscover : Math.random() * 24,
        discoveredIn : null,
        applicants : 0,
        hoursToComplete : jobLength,
        undertaken : false,
        hoursPutIn : 0
    }
    return job;
}

const determineJobDifficulty = company => {
    const prestigeDifficulty = Math.floor(Math.random() * company.prestige, 0);
    const randomDifficulty = Math.floor(Math.random() * 5 - 2.5);
    return Math.max(prestigeDifficulty + randomDifficulty, 1);
}

const determineJobAdvertisedIn = company => {
    const numberOfSourcesAdvertisedIn = Math.max(Math.random() * company.advertisesIn.length >> 0, 1);
    const shuffledSources = shuffle(company.advertisesIn);
    return shuffledSources.slice(0, numberOfSourcesAdvertisedIn);
}

const determineJobCompetencies = (company, difficulty, competencies) => {
    return Array(difficulty).fill().reduce((acc, x) => {
        const field = pickViaLoading(company.fields);
        const fieldCompetencies = Object.values(competencies).reduce((acc, competency) => {
            if (competency.fields.includes(field)) acc[competency.name] = competency;
            return acc;
        }, {});
        const competency = pickViaShare(fieldCompetencies, 'favour');
        acc[competency.name] = acc[competency.name] ? acc[competency.name] + 1 : 1;
        return acc;
    }, {});
}

const determineJobLength = company => {
    const baseHours = Math.floor(Math.random() * 24);
    return Math.max(baseHours + company.prestige, 2); 
}

const determinePay = (company, difficulty, length) => {
    const basePay = Math.pow(company.prestige * (difficulty + 1) * length, 2) / 1000;
    const adjPerc = Math.random() * 100 - 50;
    const adjFactor = basePay.toString().length;
    const adjTotal = basePay * (1 + adjPerc) * adjFactor;
    return Math.max(basePay + adjTotal, 0);
}

const determineApplicationDeadline = company => {
    const rnd = Math.random();
    return rnd < company.formality ?
        Math.floor(3 + Math.random() * 7) :
        null
}

export const progressJobsByOneDay = (jobs, competencies) => {
    return keyByProperty(jobs.reduce((acc, job, i) => {
        if (job.status === 'open') {
            const newAge = job.age + 1;
            if (job.deadline) {
                if (newAge < job.deadline) {
                    console.log(i, 'a job remains open for applications!')
                    acc.push({
                        ...job,
                        age : newAge
                    })
                } else {
                    console.log(i, 'the deadline for a job application has elapsed!')
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
                const applicantRoll = Math.random() * 10;
                if (applicantRoll > applicantChance) {
                    console.log(i, 'there was not a successful applicant today!')
                    acc.push({
                        ...job,
                        age : newAge
                    })
                } else {
                    console.log(i, 'an applicant took this job!')
                }
            }
        } else acc.push({
            ...job,
            age : job.age + 1
        })
        return acc;
    }, []), 'id');
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