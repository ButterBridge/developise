export const keyByProperty = (arr, prop) => {
    return arr.reduce((acc, element) => {
        acc[element[prop]] = element;
        return acc;
    }, {})
}

export const pickViaShare = (entities, key, seed) => {
    const spread = Object.values(entities).reduce((spreadSoFar, entity) => {
        const portion = Array(entity[key]).fill(entity);
        return [...spreadSoFar, ...portion];
    }, []);
    const rNum = Math.floor(seed || Math.random() * spread.length);
    return spread[rNum];
}

export const pickViaLoading = (load, seed) => {
    const spread = Object.entries(load).reduce((spreadSoFar, [name, score]) => {
        return [...spreadSoFar, ...Array(score).fill().map(x => name)]
    }, []);
    const rNum = Math.floor(seed || Math.random() * spread.length);
    return spread[rNum];
}