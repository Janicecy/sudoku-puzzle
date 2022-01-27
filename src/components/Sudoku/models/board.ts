import _ from 'lodash'
import { IBoard, ICoordinate, IStep } from '../typings'
import { DIFFICULTIES } from '../SelectDifficulty'
export const BOARD_SIZE = 9

export const isValid = (bd: IBoard, coord: ICoordinate, num: string): boolean => {
  const { col, row } = coord
  for (let i = 0; i < 9; i++) {
    const offsetRow = (Math.floor(row / 3)) * 3 + Math.floor(i / 3)
    const offsetCol = (Math.floor(col / 3)) * 3 + i % 3
    if (bd[row][i].val === num && i !== col) return false
    if (bd[i][col].val === num && i !== row) return false
    if (bd[offsetRow][offsetCol].val === num && !(offsetRow === row && offsetCol === col))
      return false;
  }
  return true
}

const backtrack = (bd: IBoard, coord: ICoordinate, steps: IStep[] = []): boolean => {
  const { col, row } = coord
  if (col === BOARD_SIZE) return backtrack(bd, { row: row + 1, col: 0 }, steps)
  if (row === BOARD_SIZE) return true
  if (bd[row][col].disabled) return backtrack(bd, { row, col: col + 1 }, steps)

  for (let i = 1; i <= 9; i++) {
    steps.push({ coord, value: String(i) })
    if (!isValid(bd, coord, String(i))) continue
    bd[row][col].val = String(i)
    bd[row][col].disabled = true
    if (backtrack(bd, { row, col: col + 1 }, steps)) return true
    bd[row][col].val = ""
    bd[row][col].disabled = false
  }
  return false
}

const initBoard = (difficulty: string) => {
  // init empty 9x9 board 
  const twoDArray: IBoard = _.range(BOARD_SIZE).map(() => Array(BOARD_SIZE).fill(""))
  const board: IBoard = twoDArray.map((arr, row) => arr.map((v, col) => ({
    coord: { row, col },
    val: "",
    disabled: false
  })))

  // first fill in the diagonal 3x3 grid 
  for (const x of _.range(3)) {
    const randomNumbers = _.shuffle(_.range(1, BOARD_SIZE + 1))
    for (let row = x * 3; row < x * 3 + 3; row++) {
      for (let col = x * 3; col < x * 3 + 3; col++) {
        board[row][col].val = randomNumbers.pop() + ""
        board[row][col].disabled = true
      }
    }
  }
  // fill out any non-empty cells with valid numbers 
  backtrack(board, { row: 0, col: 3 })

  // pull out given number of numbers from random position 
  let counter = {
    'Easy': 35,
    'Medium': 40,
    'Hard': 45
  }[difficulty] as number

  while (counter > 0) {
    const [x, y] = [_.random(0, 8), _.random(0, 8)]
    if (board[x][y].val === "") continue
    board[x][y].val = ""
    board[x][y].disabled = false
    counter--
  }

  return board
}


class SudokuGame {
  board: IBoard = []
  steps: IStep[] = []
  difficulty: string = DIFFICULTIES.EASY

  constructor() {
    this.init()
  }

  init() {
    this.steps = []
    this.board = initBoard(this.difficulty)
  }

  setDifficulty(newVal: string) {
    this.difficulty = newVal
  }

  setNum(coord: ICoordinate, num: string) {
    if (this.board[coord.row][coord.col].disabled) return
    if (num === this.board[coord.row][coord.col].val) return
    this.set(coord, num)
  }

  set(coord: ICoordinate, num: string) {
    this.board[coord.row][coord.col] = {
      ...this.board[coord.row][coord.col],
      val: num,
    }
    this.steps.push({ coord, value: num })
  }

  undo(): boolean {
    if (this.steps.length === 0) return false
    const { coord }: IStep = this.steps.pop() as IStep

    this.board[coord.row][coord.col] = {
      ...this.board[coord.row][coord.col],
      val: "",
    }
    return true
  }

  validate(): boolean {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const { disabled, val, coord } = this.board[row][col]
        if (disabled) continue
        if (!isValid(this.board, coord, val)) return false
      }
    }
    return true
  }

  autoPlay() {
    const steps: IStep[] = []
    while (this.undo());
    const newBoard = _.cloneDeep(this.board)
    backtrack(newBoard, { row: 0, col: 0 }, steps)
    return steps
  }
}

export {
  SudokuGame
}
