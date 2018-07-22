import React, { Component } from 'react';
import Progress from './components/Progress';
import Head from './components/Head';
import Status from './components/Status';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Head />
                <div className="main">
                    <Status />
                    <Progress />
                </div>
            </div>
        );
    }
}

export default App;
