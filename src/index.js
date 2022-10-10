const express = require("express");
require("dotenv").config();
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());
const PORT = process.env._PORT || 8080;

const projects = [];

// MIDDLEWARE LOG ROUTES
function logRoutes(req, res, next) {
  const { method, url } = req;
  const route = `[${method.toUpperCase()} ➡️ ${url}]`;
  console.log(route);
  return next();
}

// LIST PROJECTS
app.get("/projects", logRoutes, (req, res) => {
  return res.json(projects);
});

// CREATE PROJECT
app.post("/projects", (req, res) => {
  const { name, owner } = req.body;
  const project = {
    id: uuidv4(),
    name,
    owner,
  };
  projects.push(project);
  return res.status(201).json(project);
});

// EDIT PROJECT
app.put("/projects/:id", (req, res) => {
  const { id } = req.params;
  const { name, owner } = req.body;

  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(404).json({
      error: "Project not found...",
    });
  }

  if (!name || !owner) {
    return res.status(400).json({
      error: "Name and owner are required!",
    });
  }

  const project = {
    id,
    name,
    owner,
  };

  projects[projectIndex] = project;

  return res.json(project);
});

// DELETE PROJECT
app.delete("/projects/:id", (req, res) => {
  const { id } = req.params;
  const projectIndex = projects.findIndex((project) => project.id === id);

  if (projectIndex < 0) {
    return res.status(404).json({
      error: "Project not found...",
    });
  }

  projects.splice(projectIndex, 1);

  return res.status(204).send();
});

app.listen(PORT, () => {
  console.log(
    `Server started on port ${PORT}! 🚀 \nGÖ♥5♣« http://localhost:${PORT}/`
  );
});
