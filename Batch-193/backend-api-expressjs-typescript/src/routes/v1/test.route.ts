import express from "express";
import Test from "../../models/Test.model";
import { faker } from '@faker-js/faker';

const router = express.Router();

// Test route
router.get("/test", async (req, res) => {
  // Example of using the Test model
  //get all documents from the Test collection
  //const items =  await Test.find({});

  //insert 1 document into the Test collection

  const record = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    age: faker.number.int({ min: 18, max: 65 }),
  }
  console.log('<<=== 🚀 record ===>>',record);

  const item = await Test.create(record);

  item.save()

  res.json({ message: "Test route is working!" });
});
export default router;
