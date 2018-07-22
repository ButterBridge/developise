import React, { Component } from 'react';
import {connect} from 'react-redux';

class Competencies extends Component {
    render() {
        const {player, competencies} = this.props;
        return (
            <div>
                <h4>Your competencies:</h4>
                <ul>
                    {Object.entries(player.competencies).map(([competency, level]) => {
                        return <li key={competency}>You have a level {level} in {competency}: {competencies[competency].description}</li>
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({player, competencies}) => ({
    player, competencies
})

export default connect(mapStateToProps)(Competencies);