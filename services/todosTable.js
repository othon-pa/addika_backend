const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getTodos(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, title, description, completed 
    FROM todos LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function getTodo(todoId){
  const rows = await db.query(
    `SELECT id, title, description, completed 
    FROM todos WHERE id=?`, 
    [todoId]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
  }
}

async function create(todoElement){
  const result = await db.query(
    `INSERT INTO todos 
    (title, description) 
    VALUES 
    (?, ?)`, 
    [
      todoElement.title, todoElement.description
    ]
  );

  let message = 'Error in creating programming language';

  if (result.affectedRows) {
    message = 'Programming language created successfully';
  }

  return {message};
}

async function update(id, todoElement){
  const result = await db.query(
    `UPDATE todos 
    SET name=?, description=?
    WHERE id=?`, 
    [
      todoElement.name, todoElement.description, id
    ]
  );

  let message = 'Error in updating programming language';

  if (result.affectedRows) {
    message = 'Programming language updated successfully';
  }

  return {message};
}

async function updateStatus(id, todoElement){
  const result = await db.query(
    `UPDATE todos 
    SET completed=?
    WHERE id=?`, 
    [
      todoElement.completed, id
    ]
  );

  let message = 'Error in updating programming language';

  if (result.affectedRows) {
    message = 'Programming language updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM todos WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting programming language';

  if (result.affectedRows) {
    message = 'Programming language deleted successfully';
  }

  return {message};
}

module.exports = {
  getTodos,
  getTodo,
  create,
  update,
  updateStatus,
  remove
}