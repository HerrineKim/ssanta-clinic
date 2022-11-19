import React, { Fragment } from 'react';
import { createStage, isColliding } from './gameHelpers';
import YouTube, { YouTubeProps } from 'react-youtube';
import { playGameOverSound } from '../../../assets/sound/sound';
import ResultTetris from '../result/ResultTetris';

// Custom hooks
import { useInterval } from '../../../hooks/tetris/useInterval';
import { usePlayer } from '../../../hooks/tetris/usePlayer';
import { useStage } from '../../../hooks/tetris/useStage';
import { useGameStatus } from '../../../hooks/tetris/useGameStatus';

// Components
import Stage from './Stage/Stage';
import Display from './Display/Display';
import StartButton from './StartButton/StartButton';

// Styles
import {
  StyledTetrisWrapper,
  StyledTetris,
  GlobalStyles,
  GameResult,
} from './TetrisPage.styles';

interface TetrisProp {
  onClose: (value: React.SetStateAction<boolean>) => void;
  tetris: (value: React.SetStateAction<boolean>) => void;
}

export const TetrisModal: React.FC<TetrisProp> = ({
  onClose,
  tetris,
}: TetrisProp) => {
  const opts: YouTubeProps['opts'] = {
    height: '60',
    width: '60',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      listType: 'playlist',
      list: 'OLAK5uy_lt7KMCvK3ZUc8gkRdaHBwxS8B8dDAMbk4',
      disablekb: 1,
      fs: 0,
      modestbranding: 1,
    },
  };

  const [dropTime, setDroptime] = React.useState<null | number>(null);
  const [gameOver, setGameOver] = React.useState(true);
  const [isResult, setIsResult] = React.useState<boolean>(false);
  const [isFail, setIsFail] = React.useState<boolean>(false);
  const [money, setMoney] = React.useState<number>(0);

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
  const result = () => {
    const number = Math.floor(score / 10);
    setMoney(number);

    setIsResult(true);
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
        playGameOverSound();
        setIsFail(true);
        // alert(`게임 오버! 내 점수는 ${score}`);
      }
      updatePlayerPos({ x: 0, y: 0, collided: true });
    }
  };

  useInterval(() => {
    drop();
  }, dropTime);

  return (
    <Fragment>
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
          <button
            className="outbtn"
            onClick={() => {
              onClose(false);
            }}
          >
            X
          </button>
          <StyledTetris>
            <div className="display">
              {gameOver ? (
                <Fragment>
                  <Display gameOver={gameOver} text="게임 오버" />
                  <StartButton callback={handleStartGame} />
                </Fragment>
              ) : (
                <Fragment>
                  <Display text={`점수: ${score}`} />
                  <Display text={`줄 수: ${rows}`} />
                  <Display text={`레벨: ${level}`} />
                </Fragment>
              )}
            </div>
            <GameResult>
              {isResult ? (
                <ResultTetris
                  tetris={tetris}
                  isSucces={true}
                  money={money}
                  time={null}
                  round={level}
                  onClose={onClose}
                ></ResultTetris>
              ) : null}
              {isFail ? (
                <div
                  className="wit-over"
                  style={{
                    fontFamily: 'Cafe24Ssurround',
                    textShadow: '0 0 10px #fff',
                  }}
                >
                  Game Over!
                </div>
              ) : null}
              <span
                className="memory-'start__text"
                style={{
                  fontSize: isFail ? '5vmin' : '20vmin',
                  color: 'green',
                  cursor: 'pointer',
                  fontFamily: 'Cafe24Ssurround',
                  textShadow: '0 0 10px black',
                }}
                onClick={() => {
                  if (isFail) {
                    result();
                  }
                }}
              >
                {isFail ? '결과 확인' : null}
              </span>
            </GameResult>
            <Stage stage={stage}></Stage>
          </StyledTetris>
        </StyledTetrisWrapper>
      </GlobalStyles>
      <div className="snowflake">❅</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
      <div className="snowflake">❅</div>
      <div className="snowflake">❆</div>
      <div className="snowflake">❄</div>
    </Fragment>
  );
};
