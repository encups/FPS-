import { NextRequest, NextResponse } from 'next/server'

// Socket.IO will be initialized on the server side
// This route just confirms the socket endpoint exists
export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'Socket.IO endpoint ready',
    path: '/api/socket',
  })
}
