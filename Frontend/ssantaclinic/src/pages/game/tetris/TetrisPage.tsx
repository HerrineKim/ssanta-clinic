import React from 'react';
import { createStage, isColliding } from './gameHelpers';
import YouTube, { YouTubeProps } from 'react-youtube';

// Custom hooks
import { useInterval } from '../../../hooks/tetris/useInterval';
import { usePlayer } from '../../../hooks/tetris/usePlayer';
import { useStage } from '../../../hooks/tetris/useStage';
import { useGameStatus } from '../../../hooks/tetris/useGameStatus';

// Components
import Stage from '../../../components/game/tetris/Stage/Stage';
import Display from '../../../components/game/tetris/Display/Display';
import StartButton from '../../../components/game/tetris/StartButton/StartButton';

// Styles
import {
  StyledTetrisWrapper,
  StyledTetris,
  GlobalStyles,
} from './TetrisPage.styles';

const TetrisPage: React.FC = () => {
  // YouTube example
  // const onPlayerReady: YouTubeProps['onReady'] = (event) => {
  //   // access to player in all event handlers via event.target
  //   event.target.pauseVideo();
  // };
  const opts: YouTubeProps['opts'] = {
    height: '100',
    width: '100',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      listType: 'playlist',
      list: 'OLAK5uy_lt7KMCvK3ZUc8gkRdaHBwxS8B8dDAMbk4',
      disablekb: 1,
      // controls: 0,
      fs: 0,
      modestbranding: 1,
    },
  };

  const [dropTime, setDroptime] = React.useState<null | number>(null);
  const [gameOver, setGameOver] = React.useState(true);

  const gameArea = React.useRef<HTMLDivElement>(null);

  const { player, updatePlayerPos, resetPlayer, playerRotate } = usePlayer();
  const { stage, setStage, rowsCleared } = useStage(player, resetPlayer);
  const { score, setScore, rows, setRows, level, setLevel } =
    useGameStatus(rowsCleared);

  const movePlayer = (dir: number) => {
    if (!isColliding(player, stage, { x: dir, y: 0 })) {
      updatePlayerPos({ x: dir, y: 0, collided: false });
    }
  };

  const keyUp = ({ keyCode }: { keyCode: number }): void => {
    if (!gameOver) {
      // Change the droptime speed when user releases down arrow
      if (keyCode === 40) {
        setDroptime(1000 / level + 200);
      }
    }
  };

  const handleStartGame = (): void => {
    // Need to focus the window with the key events on start
    if (gameArea.current) gameArea.current.focus();
    // Reset everything
    setStage(createStage());
    setDroptime(1000);
    resetPlayer();
    setScore(0);
    setLevel(1);
    setRows(0);
    setGameOver(false);
  };

  const move = ({
    keyCode,
    repeat,
  }: {
    keyCode: number;
    repeat: boolean;
  }): void => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        // Just call once
        if (repeat) return;
        setDroptime(30);
      } else if (keyCode === 38) {
        playerRotate(stage);
      }
    }
  };

  const drop = (): void => {
    // Increase level when player has cleared 10 rows
    if (rows > level * 10) {
      setLevel((prev: any) => prev + 1);
      // Also increase speed
      setDroptime(1000 / level + 200);
    }

    if (!isColliding(player, stage, { x: 0, y: 1 })) {
      updatePlayerPos({ x: 0, y: 1, collided: false });
    } else {
      // Game over!
      if (player.pos.y < 1) {
        console.log('Game over!');
        setGameOver(true);
        setDroptime(null);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <GlobalStyles>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
        }}
      >
        <YouTube opts={opts} />
      </div>
      <StyledTetrisWrapper
        role="button"
        tabIndex={0}
        onKeyDown={move}
        onKeyUp={keyUp}
        ref={gameArea}
      >
        <StyledTetris>
          <div className="display">
            {gameOver ? (
              <>
                <Display gameOver={gameOver} text="Game Over!" />
                <StartButton callback={handleStartGame} />
              </>
            ) : (
              <>
                <Display text={`Score: ${score}`} />
                <Display text={`Rows: ${rows}`} />
                <Display text={`Level: ${level}`} />
              </>
            )}
          </div>
          <Stage stage={stage} />
        </StyledTetris>
      </StyledTetrisWrapper>
    </GlobalStyles>
  );
};

export default TetrisPage;
