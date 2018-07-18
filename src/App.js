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
        const {player} = this.state;
        if (!player) return null;
        return (
            <div className="App">
                Hi {player.name}!
            </div>
        );
    }

    
}

export default App;
