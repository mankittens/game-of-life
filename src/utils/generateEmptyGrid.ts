import { Grid } from '../types'

export function generateEmptyGrid(size: number): Grid {
  return new Array(size).fill(undefined).map(() => new Array(size).fill(0))
}
