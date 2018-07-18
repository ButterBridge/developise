import React, { Component } from 'react';
import './App.css';
import { Person } from './lib/player';

class App extends Component {
    state = {
        day : 0,
        player : new Person('Jonty')
    }

    render() {
        const {player} = this.state;
        return (
            <div className="App">
                Hi {player.name}!
            </div>
        );
    }

    
}

export default App;
