class Player {
    constructor (name) {
        this.name = name;
        this.experience = 0;
        this.portfolio = [];
        this.competencies = {
            '12ML' : 1,
            'TwoSheetsSheets' : 1
        };
    }
}

export const createPlayer = () => {
    return new Player();
}