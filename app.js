const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Welcome route
app.get("/", (req, res) => {
  res.send("Welcome to the Prismatic Employees API.");
});

// Get all employees
app.get("/employees", async (req, res) => {
  try {
    const employees = await prisma.employee.findMany();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// Create new employee
app.post("/employees", async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Valid name is required" });
    }

    const employee = await prisma.employee.create({
      data: { name: name.trim() },
    });
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to create employee" });
  }
});

// Get employee by ID
app.get("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
    });

    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee" });
  }
});

// Update employee
app.put("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Valid name is required" });
    }

    const employee = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: { name: name.trim() },
    });

    res.status(200).json(employee);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(500).json({ error: "Failed to update employee" });
  }
});

// Delete employee
app.delete("/employees/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({
      where: { id: parseInt(id) },
    });

    res.status(204).send();
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
