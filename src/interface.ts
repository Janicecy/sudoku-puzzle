export interface Coordinate {
  row: number,
  col: number
}

export interface Step {
  coord: Coordinate,
  value: string,
}

export interface Cell {
  coord: Coordinate,
  val: string,
  disabled: boolean
} 

export type Board = Cell[][]