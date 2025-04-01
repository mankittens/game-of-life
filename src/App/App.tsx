import { useCallback, useState } from 'react'

import './App.css'
import { DEFAULT_GRID_SIZE } from '../const'
import { Grid } from '../types'
import { deepClone } from '../utils/deepClone'
import { generateEmptyGrid } from '../utils/generateEmptyGrid'
import { useIsDrawing } from './useIsDrawing'
import { useStep } from './useStep'
import { getCellInnerStyle, getCellStyle, getRowStyle } from './styles'

export function App() {
  const [grid, setGrid] = useState<Grid>(generateEmptyGrid(DEFAULT_GRID_SIZE))

  const updateCell = useCallback(
    (x: number, y: number) => {
      setGrid((prevGrid) => {
        const newGrid = deepClone(prevGrid)
        newGrid[y][x] = 1
        return newGrid
      })
    },
    [setGrid]
  )

  const { isRunning, toggleIsRunning } = useStep({
    setGrid,
  })

  const { draw, startDraw, stopDraw } = useIsDrawing({ updateCell })

  return (
    <div className="app" onMouseUp={stopDraw} onMouseLeave={stopDraw}>
      <div className="app-inner">
        <div>
          {grid.map((row, y) => (
            <div key={y} style={getRowStyle(y)}>
              {row.map((cell, x) => {
                return (
                  <div
                    key={x}
                    onClick={() => updateCell(x, y)}
                    onMouseDown={() => startDraw(x, y)}
                    onMouseEnter={() => draw(x, y)}
                    style={getCellStyle(x)}
                  >
                    <div style={getCellInnerStyle(!!cell)}></div>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
        <div className="button-bar">
          <button onClick={toggleIsRunning}>
            {isRunning ? 'Pause' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  )
}
