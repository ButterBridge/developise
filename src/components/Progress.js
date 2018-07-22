import React, { Component } from 'react';
import {connect} from 'react-redux';
import {progressToNextDay} from '../actions';

class Progress extends Component {
    render() {
        const timeRef = ['morning', 'afternoon', 'evening', 'night'];
        const {progressToNextDay, game} = this.props;
        return (
            <section>
                <p>It's {timeRef[game.phase]}</p>
                {game.phase === 3 && <button onClick={progressToNextDay}>The next day...</button>}
            </section>
        );
    }
}

const mapStateToProps = ({game}) => ({
    game
})

const mapDispatchToProps = dispatch => ({
    progressToNextDay : () => dispatch(progressToNextDay())
})

export default connect(mapStateToProps, mapDispatchToProps)(Progress);