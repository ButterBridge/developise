import React, { Component } from 'react';
import {connect} from 'react-redux';
import {progressToNextDay} from '../actions';

class Progress extends Component {
    render() {
        const {progressToNextDay} = this.props;
        return (
            <div>
                <button onClick={progressToNextDay}>The next day...</button>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => ({
    progressToNextDay : () => dispatch(progressToNextDay())
})

export default connect(null, mapDispatchToProps)(Progress);