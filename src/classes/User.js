import users from '../index'

export default class User {
    constructor(name, cpf, email, age, transactions) {
        this.id = null
        this.name = name
        this.cpf = cpf
        this.email = email
        this.age = age
        this.transactions = []
    }
}