import React, { Component } from 'react';
import './App.css';
import { Person } from './lib/player';
import { getCompetencies } from './lib/competency';

class App extends Component {
    state = {
        day : 0,
        player : null,
        competencies : getCompetencies()
    }

    componentDidMount = () => {
        this.setState({
            player : new Person('Jonty')
        })
    }

    render() {
        const {player, day, competencies} = this.state;
        console.log(competencies);
        if (!player) return null;
        return (
            <div className="App">
                <h1>Hi {player.name}! It's day {day}.</h1>
                <h4>Here's something you know how to do:</h4>
                <ul>
                    {Object.entries(player.competencies).map(([competency, level]) => {
                        console.log(competencies[competency]);
                        return <li>You have a level {level} in {competency}: {competencies[competency].description}</li>
                    })}
                </ul>
                <button onClick={this.progress}>The next day...</button>
            </div>
        );
    }

    progress = () => {
        this.setState({
            day : this.state.day + 1
        })
    }
}

export default App;
