class Company {
    constructor (name, details) {
        this.name = name;
        Object.keys(details).forEach(detail => {
            this[detail] = details[detail];
        })
    }
}

const companiesData = {
    'family-friends' : {
        type : 'locale',
        success : 1,
        prestige : 1
    },
    'neighbourhood' : {
        type : 'locale',
        success : 2,
        prestige : 2
    },
    'social media' : {
        type : 'locale',
        success : 3,
        prestige : 2
    }
}

export const getCompanies = () => {
    return Object.entries(companiesData).reduce((companies, [companyName, companyData]) => {
        companies[companyName] = new Company(companyName, companyData);
        return companies;
    }, {});
}