import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Server } from 'socket.io';
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "../auth/auth.guard";

@WebSocketGateway({
  namespace: 'events',
  cors: {
    origin: '*',
  },
})
@UseGuards(AuthGuard)
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('joinLobby')
  joinLobby(@MessageBody() data: string): string {
    return data
  }

  @SubscribeMessage('leaveLobby')
  async leaveLobby(@MessageBody() data: number): Promise<number> {
    return data;
  }

  @SubscribeMessage('startGame')
  async identity(@MessageBody() data: number): Promise<number> {
    return data;
  }
}
