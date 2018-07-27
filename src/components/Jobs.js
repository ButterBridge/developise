import React, { Component } from 'react';
import {connect} from 'react-redux';
import { changeJobApplicationStatus, progressToNextPhase } from '../actions';
import {getJobDescription} from '../dialogue/jobs';

class Jobs extends Component {
    render() {
        const {game, player, takeTimeToApplyForJob, rescindApplication} = this.props;
        console.table(game.jobs);
        return (
            <div>
                <h4>Jobs available:</h4>
                {Object.values(game.jobs).reduce((acc, job, i) => {
                    if (job.hoursToDiscover <= 0) {
                        acc.push(<div key={i}>
                            <p>{getJobDescription(job)}</p>
                            {game.phase !== 3 && <button onClick={() => job.status === 'applied' ? rescindApplication(job) : takeTimeToApplyForJob(job, player)}>{job.status === 'applied' ? 'Cancel application!' : 'Apply for job!'}</button>}
                        </div>)
                    }
                    return acc;
                }, [])}
            </div>
        );
    }
}

const mapStateToProps = ({game, player}) => ({
    game, player
});

const mapDispatchToProps = dispatch => ({
    takeTimeToApplyForJob : (job, player) => {
        dispatch(changeJobApplicationStatus(job, 'applied', 'application', { portfolio : player.portfolio.reduce((acc, portfolioJob) => {
            Object.keys(portfolioJob.competencies).forEach(competency => {
                if (Object.keys(job.competencies).includes(competency)) {
                    acc *= portfolioJob.competencies[competency];
                }
            })
            return acc;
        }, 1)}));
        dispatch(progressToNextPhase());
    },
    rescindJobApplication : (job) => {
        dispatch(changeJobApplicationStatus(job, 'open'));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);