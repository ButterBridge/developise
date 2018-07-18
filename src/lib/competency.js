export class Competency {
    constructor (name, {type, description, difficulty, fields, reliances, favour}) {
        console.log(type, type, type);
        this.name = name;
        this.description = description;
        this.type = type;
        this.difficulty = difficulty;
        this.fields = fields;
        this.reliances = reliances || [];
        this.favour = favour || 0;
    }
}

const competenciesData = {
    '12ML' : {
        type : 'language',
        description : 'The go-to language for making stuff appear on screen. No escaping it.',
        difficulty : 1,
        fields : ['front-end'],
        reliances : [],
        favour : 7
    },
    'TwoSheetsSheets' : {
        type : 'language',
        description : 'Want to make your stuff look pretty? Well, you could try here, I guess.',
        difficulty : 1,
        fields : ['front-end', 'design'],
        reliances : [],
        favour : 5
    }
}
export const getCompetencies = () => {
    return Object.entries(competenciesData).reduce((competencies, [competencyName, competencyData]) => {
        console.log(competencyData);
        competencies[competencyName] = new Competency(competencyName, competencyData);
        return competencies;
    }, {});
}