import compression from "compression";
import cors from "cors";
import express from "express";
import { userRoute } from "./modules/user/user.routes";
import { postRouter } from "./modules/post/post.routes";
import { authRouter } from "./modules/auth/auth.routes";


const app = express();

// Middleware
app.use(cors()); 
app.use(compression()); 
app.use(express.json());

app.use(
  cors({
    origin: "https://portfolio-frontend-phi-virid.vercel.app",
    credentials: true,
  })
);


app.use("/api/v1/auth",authRouter)
app.use("/api/v1/user",userRoute)
app.use("/api/v1/post", postRouter)
app.use(compression());

// Default route for testing
app.get("/", (_req, res) => {
  res.send("API is running");
});


// 404 Handler
app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found",
  });
});

export default app;