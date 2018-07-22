import React, { Component } from 'react';
import {connect} from 'react-redux';

class Head extends Component {
    render() {
        const {game, player} = this.props;
        return (
            <div>
                <h1>Hi {player.name}! It's day {game.day}.</h1>
            </div>
        );
    }
}

const mapStateToProps = ({game, player}) => ({
    game, player
})

export default connect(mapStateToProps)(Head);