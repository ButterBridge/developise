import React, { Component } from 'react';
import './App.css';
import {GameConsumer} from './components/contexts/game-context'

class App extends Component {
    state = {
        day : 0
    }

    render() {
        const {day} = this.state;
        return (
            <GameConsumer>
                {({game}) => {
                    const {player, competencies} = game;
                    return <div className="App">
                        <h1>Hi {player.name}! It's day {day}.</h1>
                        <h4>Here's something you know how to do:</h4>
                        <ul>
                            {Object.entries(player.competencies).map(([competency, level]) => {
                                return <li key={competency}>You have a level {level} in {competency}: {competencies[competency].description}</li>
                            })}
                        </ul>
                        <button onClick={this.progress}>The next day...</button>
                    </div>}}
            </GameConsumer>
        );
    }

    progress = () => {
        this.setState({
            day : this.state.day + 1
        })
    }
}

export default App;
