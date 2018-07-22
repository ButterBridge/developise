import React, { Component } from 'react';
import Choices from './components/Choices';
import Progress from './components/Progress';
import Head from './components/Head';
import './App.css';

class App extends Component {
    render() {
        return (
            <div>
                <Head />
                <div className="App">
                    <Choices />
                    <Progress />
                </div>
                
            </div>
        );
    }
}

export default App;
