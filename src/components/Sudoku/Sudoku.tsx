import React, { useState } from 'react';
import { SudokuGame } from './board'
import { Board, Step, Cell } from '../../interface'
import SudokuBoard from './SudokuBoard';
import InputBoard from './InputBoard';
import { makeStyles } from "@mui/styles";
import {
  Button,
  Typography,
  Box,
  Divider,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
}
  from '@mui/material';
import UndoIcon from '@mui/icons-material/Undo';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import GitHubIcon from '@mui/icons-material/GitHub';
import SelectDifficulty from './SelectDifficulty'

interface CircleButtonProps {
  children: React.ReactNode
  underText: string,
  onClick?: () => void
}

const useStyles = makeStyles({
  root: {
    margin: '20px auto',
    width: 900,
  },
  game: {
    display: 'flex',
    marginTop: 20
  },
  controlPanel: {
    width: 400,
    marginLeft: 20,
    display: 'flex',
    flexWrap: 'wrap'
  },
  button: {
    width: '100%',
    height: 45,
  },
  boldText: {
    fontWeight: 'bold !important'
  },
  header: {
    fontWeight: 'bold',
    fontSize: 30,
    color: 'rgb(54 74 99)',
    marginBottom: 10,
    display: 'flex'
  },
  circle: {
    height: 60,
    width: 60,
    backgroundColor: '#eaeef4',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    cursor: 'pointer'
  },
  circleButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    marginLeft: 20
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
  githubIcon: {
    marginLeft: 'auto',
    cursor: 'pointer',
    color: 'black'
  }
})

const game = new SudokuGame()

export default function Sudoku() {
  const classes = useStyles()
  const [board, setBoard] = useState<Board>(game.board)
  const [activeCell, setActiveCell] = useState<Cell | null>(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleNewGame = () => {
    game.init()
    setBoard(game.board)
  }

  const handleNumOnClick = (num: number) => {
    if (activeCell) {
      game.setNum(activeCell.coord, String(num))
      setBoard([...game.board])
      if (game.validate()) {
        setModalVisible(true)
      }
    }
  }

  const autoPlay = async () => {
    if (game.validate()) return

    const sleep = (ms: number) => new Promise(res => setTimeout(res, ms))
    const steps: Step[] = game.autoPlay()
    for (const step of steps) {
      game.setNum(step.coord, step.value)
      setBoard([...game.board])
      await sleep(20)
    }
    setModalVisible(true)
  }

  const CircleButton = (props: CircleButtonProps) => {
    const { children, underText, onClick } = props
    return (
      <Box className={classes.circleButton}>
        <Box onClick={onClick} className={classes.circle}>
          {children}
        </Box>
        <Typography color='primary'>{underText}</Typography>
      </Box>
    )
  }

  const Header = () => {
    return (
      <Box className={classes.header}>
        <div>Sudoku</div>
        <a
          rel="noopener noreferrer"
          target='_blank'
          className={classes.githubIcon}
          href='https://github.com/Janicecy/sudoku-puzzle'>
          <GitHubIcon />
        </a>
      </Box>
    )
  }

  const GameWonDialog = () => {
    return (
      <Dialog open={modalVisible}>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You just won the game!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setModalVisible(false)}>OK</Button>
        </DialogActions>
      </Dialog>
    )
  }

  const erase = () => {
    if (activeCell) {
      game.setNum(activeCell.coord, "")
      setBoard([...game.board])
    }
  }

  const handleDifficultyChange = (difficulty: string) => {
    game.setDifficulty(difficulty)
    game.init()
    setBoard([...game.board])
  }

  return (
    <Box className={classes.root}>
      <GameWonDialog />
      <Header />
      <Divider />
      <SelectDifficulty onChange={handleDifficultyChange} />
      <Box className={classes.game}>
        <SudokuBoard
          board={board}
          activeCellOnChange={(cell: Cell) => setActiveCell(cell)}
        />
        <Box className={classes.controlPanel}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleNewGame}
          ><Typography className={classes.boldText}>New Game</Typography>
          </Button>

          <Box className={classes.buttonGroup}>
            <CircleButton onClick={erase} underText={'Erase'} >
              <UndoIcon color='primary' />
            </CircleButton>

            <CircleButton onClick={autoPlay} underText='Autoplay' >
              <PlayCircleOutlineIcon color='primary' />
            </CircleButton>
          </Box>

          <InputBoard numberOnClick={handleNumOnClick} />
        </Box>
      </Box>
    </Box>
  );
}
