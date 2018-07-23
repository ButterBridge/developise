const initialState = {
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
}

export default (state = initialState, action = {payload : {}}) => {
    return state
}