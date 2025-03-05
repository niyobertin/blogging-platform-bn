import express from 'express';
import http from 'http'; 
import { Server } from 'socket.io';
import dotenv from 'dotenv';
import cors from 'cors';
import { databaseConnection } from './database/dbConnection';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './doc/swagger';
import appRoutes from './routes';

dotenv.config();
databaseConnection();

const app = express();
const port = process.env.PORT || 4000;

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" } 
});

const onlineUsers = new Map<string, string>();

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("user_online", (userId: string) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("disconnect", () => {
    onlineUsers.forEach((socketId, userId) => {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
      }
    });
    console.log("User disconnected:", socket.id);
  });
});

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/v1", appRoutes);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});

export { io, onlineUsers };
