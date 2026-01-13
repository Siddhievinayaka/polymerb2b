import { WebSocketGateway, WebSocketServer, OnGatewayConnection, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationsGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  constructor(private jwtService: JwtService) {}

  handleConnection(@ConnectedSocket() client: Socket) {
    try {
      const token = client.handshake.auth.token;
      if (token) {
        const payload = this.jwtService.verify(token);
        const userId = payload.sub;
        
        // Join user to their own room
        client.join(userId);
        console.log(`User ${userId} joined their room`);
      }
    } catch (error) {
      console.log('Invalid token on connection');
    }
  }

  emitPendingUser(user: any) {
    console.log('WebSocket: Emitting pending-user-added event');
    this.server.emit('pending-user-added', user);
  }

  emitUserStatusUpdate(userId: string, status: string) {
    console.log(`Emitting status update to user ${userId}: ${status}`);
    this.server.to(userId).emit('user:status:update', status);
  }

  emitNewOrder(order: any) {
    this.server.emit('new-order', order);
  }

  emitNewFeedback(feedback: any) {
    this.server.emit('new-feedback', feedback);
  }
}