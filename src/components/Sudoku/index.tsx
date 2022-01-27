import { SudokuGame } from './models/board'
import React, { ReactElement, useState } from 'react'
import { IBoard, IStep, ICell } from './typings'
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
import Header from '../Header'
import SelectDifficulty from './SelectDifficulty'
import CircularButton from '../CircularButton';

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
  buttonGroup: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%'
  },
})

const game = new SudokuGame()

export default function Sudoku(): ReactElement {
  const classes = useStyles()
  const [board, setBoard] = useState<IBoard>(game.board)
  const [activeCell, setActiveCell] = useState<ICell | null>(null)
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
    const steps: IStep[] = game.autoPlay()
    for (const step of steps) {
      game.setNum(step.coord, step.value)
      setBoard([...game.board])
      await sleep(20)
    }
    setModalVisible(true)
  }

  const GameWonDialog = (): ReactElement => {
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
          activeCellOnChange={(cell: ICell) => setActiveCell(cell)}
        />
        <Box className={classes.controlPanel}>
          <Button
            className={classes.button}
            variant="contained"
            onClick={handleNewGame}
          ><Typography className={classes.boldText}>New Game</Typography>
          </Button>

          <Box className={classes.buttonGroup}>
            <CircularButton onClick={erase} underText={'Erase'} >
              <UndoIcon color='primary' />
            </CircularButton>
            <CircularButton onClick={autoPlay} underText='Autoplay' >
              <PlayCircleOutlineIcon color='primary' />
            </CircularButton>
          </Box>

          <InputBoard numberOnClick={handleNumOnClick} />
        </Box>
      </Box>
    </Box>
  );
}
