const initialState = {
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

export default (state = initialState, action = {payload : {}}) => {
    return {
        ...state,
        ...action.payload
    }
}