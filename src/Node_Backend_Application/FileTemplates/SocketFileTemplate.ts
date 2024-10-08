// Write Socket.IO initialization
export const SOCKET_IO_TEMPLATE = `
import { Server } from 'socket.io';

const socketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Define socket events
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);
    
    // Example event
    socket.on('message', (msg) => {
      console.log('Message received:', msg);
      io.emit('message', msg); // Broadcast message to all clients
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });

  return io;
};

export default socketServer;
`;

// Write an example event file
export const SOCKET_EVENT_TEMPLATE = `
export const onUserConnected = (socket) => {
  console.log('User connected:', socket.id);
  };
  
export const onUserDisconnected = (socket) => {
  console.log('User disconnected:', socket.id);
  };
  `;

// ******TS

export const SOCKET_IO_TEMPLATE_TYPESCRIPT = `
import { Server } from 'socket.io'
import { Server as HTTPServer } from 'http'
const socketServer = (httpServer: HTTPServer) => {
  const io = new Server(httpServer, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  })

  // Define socket events
  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    // Example event
    socket.on('message', (msg) => {
      console.log('Message received:', msg)
      io.emit('message', msg) // Broadcast message to all clients
    })

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id)
    })
  })

  return io
}

export default socketServer

 `;
export const SOCKET_EVENT_TEMPLATE_TYPESCRIPT = `
import { Socket } from 'socket.io'
export const onUserConnected = (socket:Socket) => {
  console.log('User connected:', socket.id);
};
  
export const onUserDisconnected = (socket:Socket) => {
    console.log('User disconnected:', socket.id);
};
  `;
