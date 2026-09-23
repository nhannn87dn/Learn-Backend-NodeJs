import express, { Express, Request, Response } from "express";

import studentsRouter from "./routes/v1/students.route";
import studentsRouterV2 from "./routes/v2/students.route";

const app: Express = express();


//Parse JSON và URL-encoded data từ request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Express + TypeScript Server" });
});

/* ==== THÊM CÁC ROUTE HERE ==== */
app.use('/api/v1/students', studentsRouter);
app.use('/api/v2/students', studentsRouterV2);


export default app;