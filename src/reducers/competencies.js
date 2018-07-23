const initialState = {
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
}

export default (state = initialState, action = {payload : {}}) => {
    return state
}