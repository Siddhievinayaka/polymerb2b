import { useEffect, useState } from "react"
import { realtime } from "@/lib/realtime"

export function useNotifications() {
  const [notifications, setNotifications] = useState<any[]>([])

  useEffect(() => {
    const handler = (data: any) => {
      setNotifications(prev => [data, ...prev])
    }

    realtime.on("notification", handler)
    return () => realtime.off("notification", handler)
  }, [])

  return notifications
}