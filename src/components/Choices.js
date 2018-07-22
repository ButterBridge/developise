import React, { Component } from 'react';
import {connect} from 'react-redux';

class Choices extends Component {
    render() {
        const {player, competencies} = this.props;
        return (
            <div>
                <h4>Here's something you know how to do:</h4>
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

export default connect(mapStateToProps)(Choices);