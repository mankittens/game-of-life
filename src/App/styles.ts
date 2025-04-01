import { memoizeWith } from 'ramda'

import './App.css'
import {
  DEFAULT_SQUARE_SIZE,
  SQUARE_BACKGROUND_COLOR,
  SQUARE_BORDER,
} from '../const'

export const getRowStyle = memoizeWith(
  (y) => `${y}`,
  (y: number) => ({
    display: 'flex',
    ...(y
      ? undefined
      : {
          borderTop: SQUARE_BORDER,
        }),
  })
)

export const getCellStyle = memoizeWith(
  (x) => `${x}`,
  (x: number) => ({
    borderBottom: SQUARE_BORDER,
    borderRight: SQUARE_BORDER,
    cursor: 'pointer',
    fontSize: 7,
    height: DEFAULT_SQUARE_SIZE,
    width: DEFAULT_SQUARE_SIZE,
    ...(x
      ? undefined
      : {
          borderLeft: SQUARE_BORDER,
        }),
  })
)

export const getCellInnerStyle = memoizeWith(
  (on) => `${on}`,
  (on: boolean) => ({
    height: DEFAULT_SQUARE_SIZE,
    width: DEFAULT_SQUARE_SIZE,
    ...(on
      ? {
          backgroundColor: SQUARE_BACKGROUND_COLOR,
        }
      : undefined),
  })
)
