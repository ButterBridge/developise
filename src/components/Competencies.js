import React, { Component } from 'react';
import {connect} from 'react-redux';
import {learnCompetency, progressToNextPhase} from '../actions';

class Competencies extends Component {
    render() {
        const {player, competencies, game, takeTimeToLearnCompetency} = this.props;
        return (
            <div>
                <h4>Your competencies:</h4>
                {Object.entries(player.competencies).map(([competency, level]) => {
                    return <div key={competency}>
                        <p>You have a level {Math.ceil(level / 1000)} in {competency}: {competencies[competency].description}</p>
                        {game.phase !== 3 && <button onClick={() => takeTimeToLearnCompetency(competency)}>Practise {competency}</button>}
                    </div>
                })}
            </div>
        );
    }
}

const mapStateToProps = ({player, competencies, game}) => ({
    player, competencies, game
});

const mapDispatchToProps = dispatch => ({
    takeTimeToLearnCompetency : (competency) => {
        dispatch(learnCompetency(competency))
        dispatch(progressToNextPhase());
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Competencies);