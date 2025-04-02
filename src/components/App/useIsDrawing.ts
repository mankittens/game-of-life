import { useCallback, useState } from 'react'

export function useIsDrawing({
  fillCell,
}: {
  fillCell: (x: number, y: number) => void
}) {
  const [isDrawing, setIsDrawing] = useState(false)

  const startDraw = useCallback(
    (x: number, y: number) => {
      setIsDrawing(true)
      fillCell(x, y)
    },
    [fillCell, setIsDrawing]
  )

  const draw = useCallback(
    (x: number, y: number) => {
      if (isDrawing) {
        fillCell(x, y)
      }
    },
    [fillCell, isDrawing]
  )

  const stopDraw = useCallback(() => {
    setIsDrawing(false)
  }, [setIsDrawing])

  return {
    draw,
    startDraw,
    stopDraw,
  }
}
