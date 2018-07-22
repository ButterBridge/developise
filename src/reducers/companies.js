const initialState = {
    'family-friends' : {
        name : 'family & friends',
        type : 'locale',
        success : 1,
        prestige : 1,
        formality : 0,
        fields : {
            'front-end' : 3,
            'back-end' : 4,
            'design' : 3
        }
    },
    'neighbourhood' : {
        name : 'the neigbourhood',
        type : 'locale',
        success : 2,
        prestige : 2,
        formality : 0.1,
        fields : {
            'front-end' : 4,
            'back-end' : 3,
            'design' : 3
        }
    },
    'social media' : {
        name : 'someone on social media',
        type : 'locale',
        success : 3,
        prestige : 2,
        formality : 0.1,
        fields : {
            'front-end' : 3,
            'back-end' : 3,
            'design' : 4
        }
    }
}

export default (state = initialState, action = {payload : {}}) => {
    return state
}