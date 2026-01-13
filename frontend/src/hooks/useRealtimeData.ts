import { useEffect, useState } from "react"
import { realtime } from "@/lib/realtime"
import { socketManager } from "@/lib/socketManager"

export function useRealtimeData<T>(
  event: string,
  initialValue: T
) {
  const [data, setData] = useState<T>(initialValue)

  useEffect(() => {
    try {
      const handler = (payload: T) => setData(payload)

      realtime.on(event, handler)
      return () => realtime.off(event, handler)
    } catch (error) {
      // Socket not connected, ignore
      console.log('Socket not connected for event:', event)
      return () => {}
    }
  }, [event])

  return data
}