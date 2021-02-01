"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _index = require('../index'); var _index2 = _interopRequireDefault(_index);

 class User {
    constructor(name, cpf, email, age, transactions) {
        this.id = null
        this.name = name
        this.cpf = cpf
        this.email = email
        this.age = age
        this.transactions = []
    }
} exports.default = User;