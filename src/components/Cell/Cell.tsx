import { memo } from 'react'
import { getCellInnerStyle, getCellStyle } from './styles'
import { CoordinateFn } from '../../types'

export const Cell = memo(
  ({
    cell,
    draw,
    fillCell,
    startDraw,
    x,
    y,
  }: {
    cell: number
    draw: CoordinateFn
    fillCell: CoordinateFn
    startDraw: CoordinateFn
    x: number
    y: number
  }) => (
    <div
      onClick={() => fillCell(x, y)}
      onMouseDown={() => startDraw(x, y)}
      onMouseEnter={() => draw(x, y)}
      style={getCellStyle(x)}
    >
      <div style={getCellInnerStyle(!!cell)}></div>
    </div>
  )
)
Cell.displayName = 'Cell'
