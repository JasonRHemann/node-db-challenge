const express = require("express");

const Projects = require("./projects-model");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.getProjects()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ message: "Error getting projects" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Projects.getProjectById(id)
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(() => {
      res.status(500).json({
        message: "Error getting project"
      });
    });
});

router.post("/", (req, res) => {
  const projectData = req.body;
  Projects.addProject(projectData)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json({ message: "Error creating project" });
    });
});

router.get("/tasks", (req, res) => {
  const { id } = req.params;
  Projects.getTasks(id)
    .then(tasks => {
      res.status(200).json(task);
    })
    .catch(err => {
      res.status(500).json({ message: "Error getting task" });
    });
});

router.post("/tasks", (req, res) => {
  const taskData = req.body;

  Projects.addTask(taskData)
    .then(task => {
      res.status(200).json(task);
    })
    .catch(() => {
      res.status(500).json({ message: "Error adding task" });
    });
});

router.get("/resources", (req, res) => {
  const { id } = req.params;

  Projects.getResource(id)
    .then(resource => {
      if (resource.length) {
        res.json(resource);
      } else {
        res.status(404).json({ message: "Error getting resource" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Error getting resource" });
    });
});

router.post("/:id/resource", (req, res) => {
  const data = req.body;
  const { id } = req.params;
  Projects.addResource(id)
    .then(resource => {
      if (resource) {
        Projects.addResource(data, id).then(resource => {
          res.status(201).json(resource);
        });
      } else {
        res.status(404).json({ message: "Error creating resource" });
      }
    })
    .catch(() => {
      res.status(500).json({ message: "Error creating resource" });
    });
});

module.exports = router;
