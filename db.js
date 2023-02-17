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

function createEmployee(firstName, lastName) {
  return new Promise((res, rej) => {
    db.run(
      `INSERT INTO employees(FirstName, LastName) VALUES ("${firstName}", "${lastName}")`,
      () => {
        getEmployeeByName(firstName).then((employee) => {
          res(employee);
        });
      }
    );
  });
}

function deleteEmployee(firstName) {
  return new Promise((res, rej) => {
    getEmployeeByName(firstName).then((employee) => {
      db.run(`DELETE FROM employees WHERE FirstName = "${firstName}"`, () => {
        res(employee);
      });
    });
  });
}

module.exports = {
  db,
  getAllEmployees,
  getEmployeeByName,
  getEmployeesReportsTo,
  createEmployee,
  deleteEmployee,
};
