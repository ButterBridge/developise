import React, { Component } from 'react';
import './App.css';
import { Person } from './lib/player';

class App extends Component {
    state = {
        day : 0,
        player : null
    }

    componentDidMount = () => {
        this.setState({
            player : new Person('Jonty')
        })
    }

    render() {
        const {player, day} = this.state;
        if (!player) return null;
        return (
            <div className="App">
                <h1>Hi {player.name}! It's day {day}.</h1>
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
