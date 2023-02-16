const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./chinook.db');

function getAllEmployees() {
  return new Promise((res, rej) => {
    db.all('SELECT * FROM employees', (error, rows) => {
      if (rows) {
        res(rows);
      }
    });
  });
}

function getEmployeeByName(name) {
  return new Promise((res, rej) => {
    db.get(
      `SELECT * FROM employees WHERE FirstName = "${name}"`,
      (error, rows) => {
        if (rows) {
          res(rows);
        }
      }
    );
  });
}

function getEmployeesReportsTo(manager) {
  return new Promise((res, rej) => {
    db.all(
      `SELECT * FROM employees WHERE ReportsTo = "${manager}"`,
      (error, rows) => {
        if (rows) {
          res(rows);
        }
      }
    );
  });
}

module.exports = {
  db,
  getAllEmployees,
  getEmployeeByName,
  getEmployeesReportsTo,
};
