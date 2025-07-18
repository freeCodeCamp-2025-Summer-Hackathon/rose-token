require('dotenv').config();
import http from 'http';
import express from 'express';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';


 


const app = express();
const server = http.createServer(app);
const PORT = 3000 ;

app.use(cookieParser()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
     origin: [
          'http://localhost:3000',
          'http://localhost:5173'
     ]
}));

app.use(helmet());              
app.use(morgan('dev')); 

app.use("/",authRoutes);
app.use("/", userRoutes);


server.listen(PORT,()=>{
     console.log(`🚀 Server running at http://localhost:${PORT}`);
});