import { Board, Cell } from '../../interface'
import { makeStyles } from '@mui/styles';
import { useRef, useState, useMemo } from 'react';
import classNames from 'classnames';
import { isValid } from './board'

interface SudokuBoardProps {
  board: Board,
  activeCellOnChange: (cell: Cell) => void
}

const outerBorder = '2px solid rgb(52 72 97)'
const useStyles = makeStyles({
  row: {
    display: 'flex',
    width: '100%',
    "&:nth-child(3n+1)": {
      borderTop: outerBorder
    }
  },
  col: {
    display: 'flex',
    flex: '0 0 11.11%',
    border: '1px solid rgb(194 202 216)',
    "&:nth-child(3n)": {
      borderRight: outerBorder
    }
  },
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    borderLeft: outerBorder,
    borderBottom: outerBorder,
    height: 500,
    flexBasis: '60%'
  },
  highlighted: {
    backgroundColor: 'rgb(226 235 243)'
  },
  activeCell: {
    backgroundColor: 'rgb(187 222 251)'
  },
  cell: {
    height: '100%',
    width: "100%",
    fontSize: 30,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    color: 'rgb(54 74 99)',
  },
  validInput: {
    color: 'green'
  },
  invalidInput: {
    color: 'red'
  },
})

export default function SudokuBoard(props: SudokuBoardProps) {
  const classes = useStyles()
  const { board, activeCellOnChange } = props
  const [activeCell, setActiveCell] = useState<Cell | null>(null)

  const handleCellOnClick = (cell: Cell) => {
    setActiveCell(cell)
    activeCellOnChange(cell)
  }

  const getColor = (cell: Cell): string => {
    const { disabled, coord, val } = cell
    if (disabled) return 'black'
    return isValid(board, coord, val) ? "green" : 'red'
  }

  return (
    <div className={classes.root}>
      {board.map((r, row) => (
        <div key={`row-${row}`} className={classes.row}>
          {r.map((cell: Cell, col) => (
            <div className={
              classNames(
                classes.col,
                (row === activeCell?.coord?.row || col === activeCell?.coord?.col) && classes.highlighted,
                (row === activeCell?.coord?.row && col === activeCell?.coord?.col) && classes.activeCell
              )}
              key={`col-${col} row-${row}`}
            >
              <div
                className={
                  classNames(
                    classes.cell,
                    `row-in-${row}`,
                    `col-in-${col}`,
                  )
                }
                style={{ color: getColor(cell) }}
                key={`${row}-${col}`}
                onClick={() => handleCellOnClick(cell)}
              >
                {cell.val}
              </div>
            </div>
          ))}
        </div>
      ))
      }
    </div >
  )
}