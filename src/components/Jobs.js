import React, { Component } from 'react';
import {connect} from 'react-redux';

class Jobs extends Component {
    render() {
        const {game} = this.props;
        console.log(game.jobs);
        return (
            <div>
                <h4>Jobs available:</h4>
                <ul>
                    {game.jobs.reduce((acc, job, i) => {
                        if (job.hoursToDiscover <= 0) {
                            acc.push(<li key={i}>A job working for {job.company.name}. It pays {job.pay ? `£${job.pay}` : 'nothing'}. {job.deadline ? `Applications close in ${job.deadline} days` : 'Applications will remain open until a suitable candidate is found'}. This job uses {Object.keys(job.competencies).join(', ')}. It should take about {job.hoursToComplete} hours.</li>)
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
})

export default connect(mapStateToProps)(Jobs);