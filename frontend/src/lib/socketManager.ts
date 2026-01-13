import { io, Socket } from "socket.io-client"

class SocketManager {
  private socket: Socket | null = null

  connect(token: string) {
    if (this.socket) return this.socket

    this.socket = io(process.env.NEXT_PUBLIC_WS_URL!, {
      auth: { token },
      transports: ["websocket"],
    })

    return this.socket
  }

  getSocket() {
    if (!this.socket) {
      throw new Error("Socket not connected")
    }
    return this.socket
  }

  disconnect() {
    this.socket?.disconnect()
    this.socket = null
  }
}

export const socketManager = new SocketManager()