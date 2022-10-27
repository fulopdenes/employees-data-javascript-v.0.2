const { Router } = require("express");
const EmployeeModel = require("../db/employee.model");

const employeesRouter = new Router();
employeesRouter.get("/valami", async (req, res) => {
  console.log("sajt");
  res.send("ok");
});
employeesRouter.use("/:id", async (req, res, next) => {
  let employee = null;

  try {
    employee = await EmployeeModel.findById(req.params.id);

    if (!employee) {
      return res.status(404).end("Employee not found");
    }
  } catch {
    return res.status(400).end("Bad request");
  }

  req.employee = employee;
  next();
});

employeesRouter.get("/", async (req, res) => {
  const sortObject = {};
  sortObject[req.query.sort] = req.query.by;
  const filterArray = req.query.filter;

  const filterInput = req.query.filterInput;
  const filterObject = {};

  if (Array.isArray(filterArray)) {
    filterArray.forEach((element) => {
      filterObject[element] = new RegExp(filterInput);
    });
    const employees = await EmployeeModel.find(filterObject).sort(sortObject);
    return res.json(employees);
  } else {
    filterObject[filterArray] = new RegExp(filterInput);
    const employees = await EmployeeModel.find(filterObject).sort(sortObject);
    return res.json(employees);
  }

  // console.log(filterObject);
});

employeesRouter.get("/:id", (req, res) => {
  return res.json(req.employee);
});

employeesRouter.post("/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

employeesRouter.patch("/:id", async (req, res, next) => {
  const employee = req.body;

  try {
    const updated = await req.employee.set(employee).save();
    return res.json(updated);
  } catch (err) {
    return next(err);
  }
});

employeesRouter.delete("/:id", async (req, res, next) => {
  try {
    const deleted = await req.employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

module.exports = employeesRouter;
