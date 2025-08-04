import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { servers } from "./servers";
import { dbService } from "./src/services/db.service";
import { productRoutes } from "./src/routes/product.routes";
import expressLogger from 'morgan'

dotenv.config();

const corsOptions = {
    origin: [
      'http://127.0.0.1:5173',
      'http://localhost:5173',
      'http://127.0.0.1:3000',
      'http://localhost:3000',
    ],
    methods: ['GET', 'POST', 'OPTIONS', 'PUT'],
    allowedHeaders: ['Content-Type'],
    credentials: true,
  }

const app = express();
app.use(express.json());
app.use(cors(corsOptions));
app.use(expressLogger('dev'))

app.use('/product', productRoutes);
  

const startServer = async () => {
  try {
    console.log("🚀 Starting Server...");

    await dbService.connectToMongoDB();
    await servers.startServer(app);
  } catch (error: any) {
    console.error(`❌ Failed to start server: ${error.message}`);
    process.exit(1);
  }
};

startServer();
