class User {
    constructor(id, login, password, name, lastname, company, role) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.name = name;
        this.lastname = lastname;
        this.company = company;
        this.role = role;
    }
  }

  module.exports = {
    User
  }