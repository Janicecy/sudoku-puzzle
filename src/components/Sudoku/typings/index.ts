export interface ICoordinate {
  row: number,
  col: number
}

export interface IStep {
  coord: ICoordinate,
  value: string,
}

export interface ICell {
  coord: ICoordinate,
  val: string,
  disabled: boolean
} 

export type IBoard = ICell[][]