/**
 * Import dependencies
 */
import React, { Component } from 'react';

/**
 * Import model functions
 */
import { createGame, isFinished, getWinner, getNextPlayer, fillTile } from '../model';

/**
 * Import primitives
 */
import {
  Container,
  Line,
  Tile,
  ResetButton,
} from './Primitives';

/**
 * TicTacToe game component
 */
class TicTacToe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: createGame(),
    };
  }

  handleTileClick(index) {
    console.log(index);
    const { game } = this.state;
    const player = getNextPlayer(game);

    this.setState((state) => {
      return {
        ...state,
        game: fillTile({ player, index }, state.game),
      };
    })
  }

  handleResetClick() {
    this.setState({
      game: createGame(),
    });
  }

  render() {
    const { game } = this.state;
    const gameIsFinished = isFinished(game);
    const winner = getWinner(game);
    const player = getNextPlayer(game);

    const board = game.map((line, i) => {
      const tiles = line.map((tile, j) => {
        return (
          <Tile key={j} onClick={!gameIsFinished && this.handleTileClick.bind(this, j + (line.length * i))}>{tile}</Tile>
        );
      });

      return (
        <Line key={i}>{tiles}</Line>
      );
    });

    return (
      <Container>
        <Container>
          {board}
        </Container>
        <Container>
          {!gameIsFinished && (
            <p>Turn: {player}</p>
          )}
          {gameIsFinished && winner && (
            <p>Winner: {winner}</p>
          )}
          {gameIsFinished && !winner && (
            <p>No winner</p>
          )}
        </Container>
        <Container style={{ height: 50 }}>
          {gameIsFinished && (
            <ResetButton onClick={this.handleResetClick.bind(this)}>Play again</ResetButton>
          )}
        </Container>
      </Container>
    );
  }
}

export default TicTacToe;
