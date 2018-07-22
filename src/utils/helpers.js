
export const pickViaShare = (entities, key) => {
    console.log(entities);
    const spread = Object.values(entities).reduce((spreadSoFar, entity) => {
        const portion = Array(entity[key]).fill(entity);
        return [...spreadSoFar, ...portion];
    }, []);
    const rNum = Math.floor(Math.random() * spread.length);
    return spread[rNum];
}

export const pickViaLoading = load => {
    const spread = Object.entries(load).reduce((spreadSoFar, [name, score]) => {
        return [...spreadSoFar, ...Array(score).fill().map(x => name)]
    }, []);
    const rNum = Math.floor(Math.random() * spread.length);
    return spread[rNum];
}