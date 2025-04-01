import { DEFAULT_GRID_SIZE, NEIGHBOR_OFFSETS } from '../const'
import { Grid } from '../types'
import { generateEmptyGrid } from './generateEmptyGrid'

export const getNextGeneration = (grid: Grid) => {
  const neighborCounts: Record<string, number> = {}
  const newGrid = generateEmptyGrid(DEFAULT_GRID_SIZE)

  for (let y = 0; y < DEFAULT_GRID_SIZE; y++) {
    for (let x = 0; x < DEFAULT_GRID_SIZE; x++) {
      if (grid[y][x] === 1) {
        NEIGHBOR_OFFSETS.forEach(([offsetY, offsetX]) => {
          const nY = y + offsetY
          const nX = x + offsetX

          if (
            // check that neighbor is on the grid
            nY >= 0 &&
            nY < DEFAULT_GRID_SIZE &&
            nX >= 0 &&
            nX < DEFAULT_GRID_SIZE
          ) {
            neighborCounts[`${nY},${nX}`] =
              (neighborCounts[`${nY},${nX}`] || 0) + 1
          }
        })
      }
    }
  }

  Object.entries(neighborCounts).forEach(([key, count]) => {
    const [y, x] = key.split(',').map(Number)
    const isAlive = grid[y][x] === 1

    if (count === 3 || (isAlive && count === 2)) {
      newGrid[y][x] = 1
    }
  })

  return newGrid
}
