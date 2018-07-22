import {pickViaShare, pickViaLoading} from './helpers';

export const generateJob = (companies, competencies) => {
    const jobCompany = pickViaShare(companies, 'prestige');
    const jobDifficulty = determineJobDifficulty(jobCompany)
    const jobCompetencies = determineJobCompetencies(jobCompany, jobDifficulty, competencies);
    const jobLength = determineJobLength(jobCompany);
    const jobPay = determinePay(jobCompany, jobDifficulty, jobLength);
    const jobApplicationDeadline = determineApplicationDeadline(jobCompany);
    const job = {
        company : jobCompany,
        competencies : jobCompetencies,
        deadline : jobApplicationDeadline,
        hoursToComplete : jobLength,
        pay : Math.floor(jobPay / 20) * 20,
        hoursToDiscover : Math.random() * 24
    }
    return job;
}

const determineJobDifficulty = company => {
    const prestigeDifficulty = Math.floor(Math.random() * company.prestige, 0);
    const randomDifficulty = Math.floor(Math.random() * 5 - 2.5);
    return Math.max(prestigeDifficulty + randomDifficulty, 1);
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