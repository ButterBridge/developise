import React from 'react';
import {connect} from 'react-redux';
import { exploreSource, progressToNextPhase } from "../actions";

const Explore = ({game, sources, takeTimeToExploreSource}) => {
    return (
        <div>
            <h4>Explore...</h4>
            {game.phase !== 3 && Object.values(sources).map(source => {
                return <button key={source.name} onClick={() => takeTimeToExploreSource(source, 1)}>{source.approachDescription}</button>
            })}
        </div>
    );
};

const mapStateToProps = ({sources, game}) => ({
    sources, game
});

const mapDispatchToProps = dispatch => ({
    takeTimeToExploreSource : (source, effectivenessMult) => {
        dispatch(exploreSource(source, effectivenessMult));
        dispatch(progressToNextPhase());
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Explore);