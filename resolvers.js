const DB = require('./db');

// The root provides a resolver function for each API endpoint
var root = {
  async employees() {
    return await DB.getAllEmployees();
  },
  async employee({ name }) {
    return await DB.getEmployeeByName(name);
  },
  async reportsTo({ manager }) {
    return await DB.getEmployeesReportsTo(manager);
  },
  async createEmployee({ firstName, lastName }) {
    return await DB.createEmployee(firstName, lastName);
  },
  async deleteEmployee({ firstName }) {
    return await DB.deleteEmployee(firstName);
  },
};

module.exports = {
  resolvers: root,
};
