import _ from 'lodash'

const COL_NUM = 9
const ROW_NUM = 9

const fillDiagonal = (board: string[][]) => {
    for (const x of _.range(3)) {
        const nums = getRan()
        for (let row = x * 3; row < x * 3 + 3; row++) {
            for (let col = x * 3; col < x * 3 + 3; col++) {
                board[row][col] = nums.pop() + ""
            }
        }
    }
}

// const setNum = (board: string[][], row: number, col: number, num: string) => {
//     board[row][col] = num
// }

const isValid = (row: number, col: number, num: string): boolean => {
    return isValidForRowAndCol(row, col, num) && isValidForGrid(row, col, num)
}

class Board {
    board: string[][]
    constructor() {
        this.board = createEmptyBoard(COL_NUM)
    }

    setNum(row: number, col: number, num: string) {
        this.board[row][col] = num
    }
}


const isValidForRowAndCol = (row: number, col: number, num: string): boolean => {
    const res = this.board.some((r, idx) => {
        // if current row is the given row, check every element on that row 
        if (idx === row) return !r.includes(num)
        return r[col] !== num
    })

    // console.log(`isValidForRowAndCol(${row}, ${col}, ${num}): ${res}`)
    return res
}

const isValidForGrid = (row: number, col: number, num: string): boolean => {
    const row_idx = Math.floor(row / 3) * 3

    const board = createEmptyBoard(3)

    for (let i = row_idx; i < row_idx + 3; i++) {
        const col_idx = Math.floor(col / 3) * 3
        for (let j = col_idx; j < col_idx + 3; j++) {
            if ((this.board[i][j]) === num) {
                return false
            }
            board[i - row_idx][j - col_idx] = this.board[i][j]
        }
    }

    // printBoard(board)
    return true
}


const fillAll = (board: string[][]) {
    const backtrack = (row: number, col: number): boolean => {
        // if has reached the end of current row, move to next row
        if (col === COL_NUM) return backtrack(row + 1, 0)
        // if have iterated all rows and found a solution 
        if (row === ROW_NUM) return true
        // if the box has alredy be taken, skip it 
        if (board[row][col] !== '#') return backtrack(row, col + 1)

        for (let i = 1; i <= 9; i++) {
            if (!isValid(row, col, String(i))) continue
            setNum(row, col, String(i))
            if (backtrack(row, col + 1)) return true
            setNum(row, col, "#")
        }

        return false
    }

    backtrack(0, 0)
}

const getRan = (): number[] => {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return _.shuffle(nums)
}

const printBoard = (board: string[][]) => {
    console.log(
        "\n" + board
            .map(r => r.join(" "))
            .join("\n")
    )
}

const createEmptyBoard = (size: number): string[][] => {
    return Array(size).fill("").map(() => Array(size).fill("#"))
}

export {
    printBoard,
    createEmptyBoard
}