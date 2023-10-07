import { useEffect, useRef, useState } from "react"

export default function useAppearDelay(shouldAppear: boolean, delay = 2000) {
  const [isAppeared, setAppeared] = useState(shouldAppear)
  const timerRef = useRef<number>()

  useEffect(
    () => () => {
      clearTimeout(timerRef.current)
    },
    [],
  )

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (shouldAppear) {
      timerRef.current = window.setTimeout(() => {
        setAppeared(true)
      }, delay)
    } else {
      setAppeared(false)
    }
  }, [shouldAppear])

  return isAppeared
}
