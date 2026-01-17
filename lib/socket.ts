import { Server as HTTPServer } from 'http'
import { Server as SocketIOServer } from 'socket.io'
import { NextApiRequest } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from './auth'

export type ServerWithSocket = HTTPServer & {
  io?: SocketIOServer
}

export const initializeSocket = (server: ServerWithSocket) => {
  if (!server.io) {
    console.log('Initializing Socket.IO...')

    const io = new SocketIOServer(server, {
      path: '/api/socket',
      addTrailingSlash: false,
      cors: {
        origin: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
        methods: ['GET', 'POST'],
      },
    })

    io.on('connection', (socket) => {
      console.log('Client connected:', socket.id)

      // Join draft room
      socket.on('join-draft', async (draftId: string) => {
        console.log(`Socket ${socket.id} joining draft ${draftId}`)
        socket.join(`draft-${draftId}`)
        socket.emit('joined-draft', draftId)
      })

      // Leave draft room
      socket.on('leave-draft', (draftId: string) => {
        console.log(`Socket ${socket.id} leaving draft ${draftId}`)
        socket.leave(`draft-${draftId}`)
      })

      socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id)
      })
    })

    server.io = io
  }

  return server.io
}

// Helper to emit draft events
export const emitDraftEvent = (
  io: SocketIOServer,
  draftId: string,
  event: string,
  data: any
) => {
  io.to(`draft-${draftId}`).emit(event, data)
}
