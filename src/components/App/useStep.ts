import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { DEFAULT_STEP_INTERVAL } from '../../const'
import { getNextGeneration } from '../../utils/getNextGeneration'
import { Grid } from '../../types'

export function useStep({
  setGrid,
}: {
  setGrid: Dispatch<SetStateAction<Grid>>
}) {
  const [stepInterval] = useState(DEFAULT_STEP_INTERVAL)
  const lastTimeRef = useRef(0)
  const frameRef = useRef(0)
  const [isRunning, setIsRunning] = useState(false)
  const [fps, setFps] = useState(0)
  const frameTimesRef = useRef<number[]>([])

  const step = useCallback(() => {
    const currentTime = performance.now()

    // -- calculate FPS --

    // add current time to frame times
    frameTimesRef.current.push(currentTime)
    // remove an old frame
    if (frameTimesRef.current.length > 60) {
      frameTimesRef.current.shift()
    }
    // calculate average frame time
    if (frameTimesRef.current.length > 1) {
      const averageFrameTime =
        (frameTimesRef.current[frameTimesRef.current.length - 1] -
          frameTimesRef.current[0]) /
        (frameTimesRef.current.length - 1)
      setFps(Math.round(1000 / averageFrameTime))
    }

    // -- step --

    // step if enough time has passed
    if (currentTime - lastTimeRef.current >= stepInterval) {
      setGrid((prevGrid) => getNextGeneration(prevGrid))
      lastTimeRef.current = currentTime
    }

    if (isRunning) {
      // request next frame
      frameRef.current = requestAnimationFrame(step)
    }
  }, [isRunning])

  useEffect(() => {
    if (isRunning) {
      // start animation
      frameRef.current = requestAnimationFrame(step)
    }

    return () => cancelAnimationFrame(frameRef.current) // required to properly stop animation
  }, [isRunning])

  const toggleIsRunning = useCallback(
    () => setIsRunning((prev) => !prev),
    [setIsRunning]
  )

  return { isRunning, toggleIsRunning, fps }
}
