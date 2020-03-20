exports.seed = function(knex) {
  // Deletes ALL existing entries  // Inserts seed entries
  return knex("projects").insert([
    {
      project_name: "Project One",
      project_desc: "description of project 1"
    },
    {
      project_name: "Project Two",
      project_desc: "description of project 2"
    },
    {
      project_name: "Project Three",
      project_desc: "description of project 3"
    }
  ]);
};
