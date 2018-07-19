import React from 'react';
import {initialiseGame} from '../../lib/game';

const {Provider, Consumer} = React.createContext({})

export const GameConsumer = Consumer;
export class GameProvider extends React.Component {
    state = {
        game : initialiseGame()
    }

    render () {
        return <Provider value={this.state}>
            {this.props.children}
        </Provider>
    }
}