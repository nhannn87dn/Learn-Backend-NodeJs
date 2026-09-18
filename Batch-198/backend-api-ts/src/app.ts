import express, { Express, Request, Response } from "express";
import { ENV } from "./config/env";
import studentsRouter from "./routes/students.route";

const app: Express = express();
const PORT = ENV.PORT;

//Parse JSON và URL-encoded data từ request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript Server" });
});

/* ==== THÊM CÁC ROUTE HERE ==== */
app.use('/api/students', studentsRouter);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});