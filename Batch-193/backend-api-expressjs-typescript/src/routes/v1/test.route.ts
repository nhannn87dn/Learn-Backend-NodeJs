import express from "express";
import { generateToken, verifyToken } from "../../utils/token.util";
const router = express.Router();

// Test route
router.get("/test", async (req, res) => {

  // const token = generateToken({
  //   id: "12345",
  //   email: "test@gmail.com",
  //   role: "user"
  // });

  const user = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1IiwiZW1haWwiOiJ0ZXN0QGdtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzUzMzU2Mjc3LCJleHAiOjE3NTMzNTk4Nzd9.kCak9sLJr74frSRVQp0_27BY4iBCgQSmoT3vQVWKzJg')
  
  res.json({ message: "Test create token!", user });
});
export default router;
