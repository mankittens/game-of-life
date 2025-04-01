import { useCallback, useState } from 'react'

export function useIsDrawing({
  updateCell,
}: {
  updateCell: (x: number, y: number) => void
}) {
  const [isDrawing, setIsDrawing] = useState(false)

  const startDraw = useCallback(
    (x: number, y: number) => {
      setIsDrawing(true)
      updateCell(x, y)
    },
    [setIsDrawing, updateCell]
  )

  const draw = useCallback(
    (x: number, y: number) => {
      if (isDrawing) {
        updateCell(x, y)
      }
    },
    [isDrawing, updateCell]
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
