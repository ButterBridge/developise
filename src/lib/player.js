export class Person {
    constructor (name) {
        this.name = name;
        this.experience = 0;
        this.portfolio = [];
        this.competencies = {
            '12ML' : 1,
            'TwoSheetsSheets' : 1
        };
    }

    cloneMe () {
        const newThis = Object.assign(Object.create(Object.getPrototypeOf(this)), this);
        console.log(Object.entries(this))
    }
}
