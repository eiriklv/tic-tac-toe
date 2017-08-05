/**
 * Import dependencies
 */
import React, { Component } from 'react';

/**
 * Import components
 */
import TicTacToe from './TicTacToe';

/**
 * Import primitives
 */
import {
  AppContainer,
  HeaderContainer,
  ContentContainer,
} from './Primitives';

/**
 * Application container component
 */
class App extends Component {
  render() {
    return (
      <AppContainer>
        <HeaderContainer>
          <h1>Tic-Tac-Toe</h1>
        </HeaderContainer>
        <ContentContainer>
          <TicTacToe />
        </ContentContainer>
      </AppContainer>
    );
  }
}

export default App;
