
export const pickViaShare = (entities, key) => {
    const spread = Object.values(entities).reduce((spreadSoFar, entity) => {
        const portion = Array(entity[key]).fill(entity);
        return [...spreadSoFar, ...portion];
    }, []);
    const rNum = Math.floor(Math.random() * spread.length);
    return spread[rNum];
}