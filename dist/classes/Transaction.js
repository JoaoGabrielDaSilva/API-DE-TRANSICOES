"use strict";Object.defineProperty(exports, "__esModule", {value: true}); class Transaction {
    constructor(title, value, type) {
        this.id = null
        this.title = title
        this.value = value
        this.type = type
    }

    static balance(transactions, response) {

        let income = 0
        let outcome = 0
        let total = 0

        for (let value in transactions) {
            if (transactions[value].type === 'income') {
                income += transactions[value].value
            } else {
                outcome += transactions[value].value
            }
        }

        total = income - outcome

        return response.json({
            transactions,
            "balance": {
                "income": income,
                "outcome": outcome,
                "total": total
            }
        })
    }
} exports.default = Transaction;