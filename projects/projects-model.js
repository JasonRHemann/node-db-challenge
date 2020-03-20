const db = require("../data/dbConfig");

module.exports = {
  getProjects,
  addProject,
  getProjectById,
  getTasks,
  addTask,
  getResources,
  addResource
};

function getProjects() {
  return db("projects");
}

function addProject(project) {
  return db("projects").insert(project);
}

function getProjectById(id) {
  return db("projects")
    .where({ id })
    .first();
}

function getTasks(id) {
  return db("tasks").join("task");
}

function addTask(task) {
  return db("tasks").insert(task);
}

function getResources(id) {
  return db("resources").join("data", "data.id", "=", "resources.data_id");
}

function addResource(resource) {
  return db("resources")
    .insert(resource, "id")
    .then(ids => findByID(ids[0]));
}
