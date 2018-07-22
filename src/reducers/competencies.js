const initialState = {
    'LMTH' : {
        type : 'language',
        description : 'The go-to language for making stuff appear on screen. No escaping it.',
        difficulty : 1,
        fields : ['front-end'],
        reliances : [],
        favour : 7
    },
    'HearSS' : {
        type : 'language',
        description : 'Want to make your stuff look pretty? Well, you could try here, I guess.',
        difficulty : 1,
        fields : ['front-end', 'design'],
        reliances : [],
        favour : 5
    }
}

export default (state = initialState, action = {payload : {}}) => {
    return {
        ...state,
        ...action.payload
    }
}