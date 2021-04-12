const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getTodos(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, title, description, completed, createdAt as created
    FROM todos LIMIT ?,?`, 
    [offset, config.listPerPage]
  );
  const data = helper.emptyOrRows(rows);

  return {
    data
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
  let date = getDate();

  const result = await db.query(
    `INSERT INTO todos 
    (title, description, createdAt, updatedAt) 
    VALUES 
    (?, ?, ?, ?)`, 
    [
      todoElement.title, todoElement.description, date, date
    ]
  );

  let message = 'Error in creating Task';

  if (result.affectedRows) {
    message = 'Task created successfully';
  }

  return {message};
}

async function update(id, todoElement){
  const result = await db.query(
    `UPDATE todos 
    SET title=?, description=?
    WHERE id=?`, 
    [
      todoElement.title, todoElement.description, id
    ]
  );

  let message = 'Error in updating task';

  if (result.affectedRows) {
    message = 'Task updated successfully';
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

  let message = 'Error in updating task';

  if (result.affectedRows) {
    message = 'Task updated successfully';
  }

  return {message};
}

async function remove(id){
  const result = await db.query(
    `DELETE FROM todos WHERE id=?`, 
    [id]
  );

  let message = 'Error in deleting task';

  if (result.affectedRows) {
    message = 'Task deleted successfully';
  }

  return {message};
}

function getDate() {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0');
  var yyyy = today.getFullYear();
  today = yyyy + '/' + mm + '/' + dd + ' 00:00:00';
  return today;
}

module.exports = {
  getTodos,
  getTodo,
  create,
  update,
  updateStatus,
  remove
}