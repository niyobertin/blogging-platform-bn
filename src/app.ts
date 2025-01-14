import express from 'express';
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
app.use(express.json());
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1",appRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
});