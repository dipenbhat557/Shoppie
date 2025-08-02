import express, { Request, Response } from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import router from "./routes";
import path from "path";

const app = express();
configDotenv();

const PORT = process.env.PORT || 3001;

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

app.use(express.json());
app.use(
  cors({
    origin: "http://kinamna.com",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Working");
});

app.get("/health", (req: Request, res: Response) => {
  res.send("Server is healthy");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
