class Job {
    constructor (details) {
        Object.keys(details).forEach(detail => {
            this[detail] = details[detail];
        })
    }
}

export const generateJob = (companies) => {
    const jobCompany = pickViaShare(companies, 'prestige');
    const jobDifficulty = determineJobDifficulty(jobCompany)
    const jobLength = determineJobLength(jobCompany);
    const jobPay = determinePay(jobCompany, jobDifficulty, jobLength);
    const details = {
        company : jobCompany,
        age : 0,
        difficulty : jobDifficulty,
        hours : jobLength,
        pay : Math.floor(jobPay / 20) * 20
    }
    return new Job(details);
}

const pickViaShare = (entities, key) => {
    const spread = Object.values(entities).reduce((spreadSoFar, entity) => {
        const portion = Array(entity[key]).fill(entity);
        return [...spreadSoFar, ...portion];
    }, []);
    const rNum = Math.floor(Math.random() * spread.length);
    return spread[rNum];
}

const determineJobDifficulty = company => {
    const prestigeDifficulty = Math.floor(Math.random() * company.prestige, 0);
    const randomDifficulty = Math.floor(Math.random() * 5 - 2.5);
    return Math.max(prestigeDifficulty + randomDifficulty, 0);
}

const determineJobLength = (company) => {
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