exports.up = function(knex) {
  return knex.schema
    .createTable("projects", tbl => {
      tbl.increments();
      tbl.string("project_name").notNullable();
      tbl.string("project_desc");
    })
    .createTable("tasks", tbl => {
      tbl.increments();
      tbl.string("tasks_desc").notNullable();
      tbl.string("tasks_notes");
      tbl.boolean("task_completed").defaultTo("false");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })

    .createTable("resources", tbl => {
      tbl.increments();
      tbl.string("resource_name").notNullable();
      tbl.string("resource_desc");
    })

    .createTable("project_resources", tbl => {
      tbl.primary(["project_id", "resources_id"]);
      tbl
        .integer("resources_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("resources");
      tbl
        .integer("project_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("projects");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("project_resources")
    .dropTableIfExists("tasks")
    .dropTableIfExists("resources")
    .dropTableIfExists("projects");
};
