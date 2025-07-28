import http from "http";
import express from "express";
import cookieParser from "cookie-parser";

<<<<<<< HEAD
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import filesRoutes from "./routes/files.routes";
=======
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import languageRoutes from './routes/language.routes';
>>>>>>> feat/language-api

import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = 3000;

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({ origin: "http://localhost:3000", credentials: true }));

<<<<<<< HEAD
app.use(helmet());
app.use(morgan("dev"));

app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/files", filesRoutes);
=======
app.use(helmet());              
app.use(morgan('dev')); 
app.use("/",authRoutes);
app.use("/", userRoutes);
app.use("/languages", languageRoutes);




>>>>>>> feat/language-api

server.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});
