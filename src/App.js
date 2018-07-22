import React, { Component } from 'react';
import './App.css';
import {GameConsumer} from './components/contexts/game-context'

class App extends Component {
    state = {
        day : 0
    }

    render() {
        const {day} = this.state;
        const {game : {player, competencies}} = this.props;
        return (
            <div className="App">
                <h1>Hi {player.name}! It's day {day}.</h1>
                <h4>Here's something you know how to do:</h4>
                <ul>
                    {Object.entries(player.competencies).map(([competency, level]) => {
                        return <li key={competency}>You have a level {level} in {competency}: {competencies[competency].description}</li>
                    })}
                </ul>
                <button onClick={this.progress}>The next day...</button>
            </div>
        );
    }

    progress = () => {
        const {game} = this.props;
        game.nextDay();
        this.setState({
            day : this.state.day + 1
        })
    }
}

export default (props) => <GameConsumer>
    {({game}) => <App {...props} game={game}/>}
</GameConsumer>
