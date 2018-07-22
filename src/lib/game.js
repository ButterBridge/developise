import { getCompetencies } from "./competency";
import { createPlayer } from './player';
import { getCompanies } from "./company";
import { generateJob } from "./job";

class Game {
    constructor () {
        this.competencies = getCompetencies();
        this.player = createPlayer('Jonny');
        this.companies = getCompanies();
        this.jobs = []
    }

    nextDay () {
        const newJob = generateJob(this.companies);
        this.jobs.push(newJob)
    }
}

export const initialiseGame = () => {
    const newGame = new Game();
    return newGame;
}