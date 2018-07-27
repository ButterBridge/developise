export const getInitialSourcesState = () => {
    return {
        'family-friends' : {
            ref : 'family-friends',
            name : 'family & friends',
            approachDescription : 'talk to family & friends',
            type : 'personal',
            prestige : 1,
            hoursToDiscover : 0
        },
        'neighbourhood' : {
            ref : 'neighbourhood',
            name : 'the neigbourhood',
            approachDescription : 'read the neighbourhood notice board',
            type : 'personal',
            prestige : 2,
            hoursToDiscover : 0
        },
        'social media' : {
            ref : 'social media',
            name : 'your social media accounts',
            approachDescription : 'check your social media accounts',
            type : 'internet',
            prestige : 2,
            hoursToDiscover : 0
        }
    }
}

export default (state = getInitialSourcesState(), action = {payload : {}}) => {
    return state
}