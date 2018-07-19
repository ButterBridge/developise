import { getCompetencies } from "./competency";
import { createPlayer } from './player';

class Game {
    constructor () {
        this.competencies = getCompetencies();
        this.player = createPlayer('Jonny');
    }
}

export const initialiseGame = () => {
    const newGame = new Game();
    return newGame;
}