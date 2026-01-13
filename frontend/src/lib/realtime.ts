import { socketManager } from "./socketManager"

type Callback<T = any> = (data: T) => void

class RealtimeService {
  on<T>(event: string, cb: Callback<T>) {
    try {
      const socket = socketManager.getSocket()
      socket.on(event, cb)
    } catch (error) {
      // Socket not connected, ignore
    }
  }

  off<T>(event: string, cb?: Callback<T>) {
    try {
      const socket = socketManager.getSocket()
      cb ? socket.off(event, cb) : socket.off(event)
    } catch (error) {
      // Socket not connected, ignore
    }
  }

  emit(event: string, payload?: any) {
    try {
      const socket = socketManager.getSocket()
      socket.emit(event, payload)
    } catch (error) {
      // Socket not connected, ignore
    }
  }
}

export const realtime = new RealtimeService()