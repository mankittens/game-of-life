import { memoizeWith } from 'ramda'

import { SQUARE_BORDER } from '../../const'

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
