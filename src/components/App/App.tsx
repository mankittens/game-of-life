import { useCallback, useState } from 'react'

import './App.css'
import { DEFAULT_GRID_SIZE } from '../../const'
import { Grid } from '../../types'
import { deepClone } from '../../utils/deepClone'
import { generateEmptyGrid } from '../../utils/generateEmptyGrid'
import { useIsDrawing } from './useIsDrawing'
import { useStep } from './useStep'
import { getRowStyle } from './styles'
import { Cell } from '../Cell'

export function App() {
  const [grid, setGrid] = useState<Grid>(generateEmptyGrid(DEFAULT_GRID_SIZE))

  const fillCell = useCallback(
    (x: number, y: number) => {
      setGrid((prevGrid) => {
        const newGrid = deepClone(prevGrid)
        newGrid[y][x] = 1
        return newGrid
      })
    },
    [setGrid]
  )

  const { isRunning, toggleIsRunning, fps } = useStep({
    setGrid,
  })

  const { draw, startDraw, stopDraw } = useIsDrawing({ fillCell })

  return (
    <div className="app" onMouseUp={stopDraw} onMouseLeave={stopDraw}>
      <div className="app-inner">
        <div className="app-header">
          <span className="fps-counter">FPS: {fps}</span>
        </div>
        <div>
          {grid.map((row, y) => (
            <div key={y} style={getRowStyle(y)}>
              {row.map((cell, x) => (
                <Cell
                  key={x}
                  cell={cell}
                  draw={draw}
                  fillCell={fillCell}
                  startDraw={startDraw}
                  x={x}
                  y={y}
                />
              ))}
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
