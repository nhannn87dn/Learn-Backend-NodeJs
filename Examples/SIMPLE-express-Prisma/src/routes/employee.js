const express = require("express");
const router = express.Router();
const createError = require("http-errors");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.get("/", async (req, res, next) => {
  try {
    const result = await prisma.employee.findMany();
    res.status(200).json({
      codeStatus: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get(`/:id`, async (req, res, next) => {
  const { id } = req.params;

  try {
    const result = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });

    if (!result) {
      throw createError(404, "Employee not found");
    }

    res.status(200).json({
      codeStatus: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post(`/`, async (req, res, next) => {
  try {
    const {
      email,
      birhay,
      numberPhone,
      fistName,
      lastName,
      address,
      password,
    } = req.body;
    const result = await prisma.employee.create({
      data: {
        email: email,
        birhay: new Date(birhay),
        numberPhone: numberPhone,
        fistName: fistName,
        lastName: lastName,
        address: address,
        password: password,
      },
    });

    res.status(200).json({
      codeStatus: 200,
      message: "Success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
 

  try {
    const { id } = req.params;
    const { email, birhay, numberPhone, fistName, lastName, address, password } =
      req.body;

    const employee = await prisma.employee.findUnique({
      where: { id: Number(id) },
    });
    
    if (!employee) {
      throw createError(404, "Employee not found");
    }

    // Tạo bản sao của existingEmployee mà không bao gồm trường id
    const updatedEmployeeData = { ...employee, id: undefined };
    
    //gộp data cũ và mới lại để update
    Object.assign(updatedEmployeeData, req.body);

    const updatedEmployee = await prisma.employee.update({
      where: { id: Number(id) },
      data: updatedEmployeeData,
    });

    res.status(200).json({
      codeStatus: 200,
      message: "Success",
      data: updatedEmployee,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
