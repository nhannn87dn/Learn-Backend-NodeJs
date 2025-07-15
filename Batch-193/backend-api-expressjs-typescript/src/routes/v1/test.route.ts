import express from "express";
import Test from "../../models/Test.model";
const router = express.Router();

// Test route
router.get("/test", async (req, res) => {
  // Example of using the Test model
  //get all documents from the Test collection
  //const items =  await Test.find({});

  //insert 1 document into the Test collection
  const item = await Test.create({
    firstName: "John",
    lastName: "Doe",
    age: 30,
  });

  item.save()

  res.json({ message: "Test route is working!" });
});
export default router;
