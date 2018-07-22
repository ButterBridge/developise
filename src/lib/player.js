class Player {
    constructor (name) {
        this.name = name;
        this.experience = 0;
        this.portfolio = [];
        this.competencies = {
            'LMTH' : 1,
            'HearSS' : 1
        };
    }
}

export const createPlayer = () => {
    return new Player();
}