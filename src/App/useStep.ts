import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { DEFAULT_STEP_INTERVAL } from '../const'
import { getNextGeneration } from '../utils/getNextGeneration'
import { Grid } from '../types'

export function useStep({
  setGrid,
}: {
  setGrid: Dispatch<SetStateAction<Grid>>
}) {
  const [stepInterval] = useState(DEFAULT_STEP_INTERVAL)
  const lastTimeRef = useRef(0)
  const frameRef = useRef(0)
  const [isRunning, setIsRunning] = useState(false)

  const step = useCallback(() => {
    const currentTime = performance.now()

    if (currentTime - lastTimeRef.current >= stepInterval) {
      setGrid((prevGrid) => getNextGeneration(prevGrid))
      lastTimeRef.current = currentTime
    }

    if (isRunning) {
      frameRef.current = requestAnimationFrame(step) // request next frame
    }
  }, [isRunning])

  useEffect(() => {
    if (isRunning) {
      frameRef.current = requestAnimationFrame(step) // start animation
    }

    return () => cancelAnimationFrame(frameRef.current) // required to properly stop animation
  }, [isRunning])

  const toggleIsRunning = useCallback(
    () => setIsRunning((prev) => !prev),
    [setIsRunning]
  )

  return { isRunning, toggleIsRunning }
}
