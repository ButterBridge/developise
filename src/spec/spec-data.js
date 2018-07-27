export const getSampleJob = () => ({
    id : 'abc',
    age : 5,
    status : 'open',
    company : 'Kiwi',
    difficulty : 5,
    competencies : {
        'Skillz' : 1,
        'Design' : 1
    },
    deadline : 10,
    pay : 200,
    advertisedIn : 'social media',
    hoursToDiscover : 10,
    discoveredIn : null,
    applicants : 0,
    hoursToComplete : 20,
    undertaken : false,
    hoursPutIn : 0
});

export const getSampleCompetencies = () => ({
    'Skillz' : {
        name : 'Skillz',
        type : 'computers',
        description : 'This is what all your mates who know nothing about computers call what you know about computers.',
        difficulty : 1,
        fields : ['IT'],
        reliances : [],
        favour : 10
    },
    'LMTH' : {
        name : 'LMTH',
        type : 'language',
        description : 'The go-to language for making stuff appear on screen. No escaping it.',
        difficulty : 1,
        fields : ['front-end'],
        reliances : [],
        favour : 7
    },
    'HearSS' : {
        name : 'HearSS',
        type : 'language',
        description : 'Want to make your stuff look pretty? Well, you could try here, I guess.',
        difficulty : 1,
        fields : ['front-end', 'design'],
        reliances : [],
        favour : 5
    },
    'WordRelease' : {
        name : 'WordRelease',
        type : 'system',
        description : 'There is no denying that this is a way for you to get stuff on screen.',
        difficulty : 1,
        fields : ['front-end', 'design', 'back-end'],
        reliances : [],
        favour : 5
    }
});

export const getSampleCompanies = () => ({
    'family-friends' : {
        name : 'family & friends',
        type : 'locale',
        success : 1,
        prestige : 1,
        formality : 0,
        fields : {
            'IT' : 9,
            'design' : 1
        },
        drawToPlayer : 10,
        advertisesIn : ['family-friends']
    },
    'neighbourhood' : {
        name : 'the neigbourhood',
        type : 'locale',
        success : 2,
        prestige : 2,
        formality : 0.1,
        fields : {
            'IT' : 7,
            'front-end' : 1,
            'back-end' : 1,
            'design' : 1
        },
        drawToPlayer : 2,
        advertisesIn : ['neighbourhood']
    },
    'social media' : {
        name : 'someone on social media',
        type : 'locale',
        success : 3,
        prestige : 2,
        formality : 0.1,
        fields : {
            'IT' : 5,
            'front-end' : 2,
            'back-end' : 1,
            'design' : 2
        },
        drawToPlayer : 2,
        advertisesIn : ['social media']
    }
})