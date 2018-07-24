import React, { Component } from 'react';
import {connect} from 'react-redux';
import { applyForJob, progressToNextPhase } from '../actions';
import {getJobDescription} from '../dialogue/jobs';

class Jobs extends Component {
    render() {
        const {game} = this.props;
        console.table(game.jobs);
        return (
            <div>
                <h4>Jobs available:</h4>
                <ul>
                    {game.jobs.reduce((acc, job, i) => {
                        if (job.hoursToDiscover <= 0) {
                            acc.push(<li key={i}>{getJobDescription(job)}</li>)
                        }
                        return acc;
                    }, [])}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({game}) => ({
    game
});

const mapDispatchToProps = dispatch => ({
    takeTimeToApplyForJob : (job) => {
        dispatch(applyForJob(job));
        dispatch(progressToNextPhase());
    } 
})

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);