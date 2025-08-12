import http from "http";
import express from "express";
import contributionRoutes from "./routes/contribution.routes";
import courseRoutes from "./routes/course.routes";
import learnRoutes from "./routes/learn.routes";
import postRoutes from "./routes/post.routes";
import progessRoutes from "./routes/progress.routes"
//import cors from "cors";

/*
import cookieParser from "cookie-parser";


import filesRoutes from "./routes/files.routes";
import languageRoutes from './routes/language.routes';
import authRoutes from "./routes/auth.routes";
import userRoutes from "./routes/user.routes";
import userProgressRoutes from "./routes/userProgress.route";


import helmet from "helmet";
import morgan from "morgan";




require("dotenv").config();

const app = express();
const server = http.createServer(app);
const PORT = 3000;
app.use(helmet());              
app.use(morgan('dev')); 

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
     origin: [
          'http://localhost:3000',
          'http://localhost:5173'
     ]
}));
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use(helmet());
app.use(morgan("dev"));


app.use("/", authRoutes);
app.use("/", userRoutes);
app.use("/files", filesRoutes);

app.use("/languages", languageRoutes);

app.use("/api", contributionRoutes);
*/

//app.use("/users", userProgressRoutes);

/*
server.listen(PORT, () => {
	console.log(`🚀 Server running at http://localhost:${PORT}`);
});

*/

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", contributionRoutes);
app.use("/api/fetchCourses", courseRoutes);
app.use("/api/fetchLearning", learnRoutes);
app.use("/posts", postRoutes);
app.use("/api/user", progessRoutes)

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
