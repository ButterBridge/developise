import React, { Component } from 'react';
import {connect} from 'react-redux';

class Jobs extends Component {
    render() {
        const {game} = this.props;
        return (
            <div>
                <h4>Jobs available:</h4>
                <ul>
                    {game.jobs.map((job, i) => {
                        console.log(job)
                        return <li key={i}>A job working for {job.company.name}. It pays {job.pay ? `£${job.pay}` : 'nothing'}. {job.deadline ? `Applications close in ${job.deadline} days` : 'Applications will remain open until a suitable candidate is found'}. This job uses {Object.keys(job.competencies).join(', ')}. It should take about {job.hours} hours.</li>
                    })}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = ({game}) => ({
    game
})

export default connect(mapStateToProps)(Jobs);