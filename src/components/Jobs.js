import React, { Component } from 'react';
import {connect} from 'react-redux';
import { changeJobApplicationStatus, progressToNextPhase } from '../actions';
import {getJobDescription} from '../dialogue/jobs';

class Jobs extends Component {
    render() {
        const {game, takeTimeToApplyForJob, rescindApplication} = this.props;
        console.table(game.jobs);
        return (
            <div>
                <h4>Jobs available:</h4>
                {Object.values(game.jobs).reduce((acc, job, i) => {
                    if (job.hoursToDiscover <= 0) {
                        acc.push(<div key={i}>
                            <p>{getJobDescription(job)}</p>
                            {game.phase !== 3 && <button onClick={() => job.status === 'applied' ? rescindApplication(job) : takeTimeToApplyForJob(job)}>{job.status === 'applied' ? 'Cancel application!' : 'Apply for job!'}</button>}
                        </div>)
                    }
                    return acc;
                }, [])}
            </div>
        );
    }
}

const mapStateToProps = ({game}) => ({
    game
});

const mapDispatchToProps = dispatch => ({
    takeTimeToApplyForJob : (job) => {
        console.log('in mapdispatch', job)
        dispatch(changeJobApplicationStatus(job, 'applied'));
        dispatch(progressToNextPhase());
    },
    rescindJobApplication : (job) => {
        dispatch(changeJobApplicationStatus(job, 'open'));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);