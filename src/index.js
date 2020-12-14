import express, { json, request, response, urlencoded } from 'express'
import User from './classes/User'
import Transaction from './classes/Transaction'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const users = []

app.post('/users', (request, response) => {
    const { name, cpf, email, age, id } = request.body

    if (!name || !cpf || !email || !age) return response.status(400).send('Dados não preenchidos corretamente')
    if (users.find(user => user.cpf === cpf)) return response.status(400).send('Cpf já existente')
    
    const user = new User(name, cpf, email, age)
    user.id = users.length + 1
    users.push(user)
    
    return response.json(user)
})

app.get('/users/:id', (request, response) => {

    const { id } = request.params

    users.find(user => {
        if (user.id === parseInt(id)) {
            return response.json(user)
        } 
    })

    return response.sendStatus(400)
})

app.get('/users', (request, response) => {
    if (users.length > 0) {
        return response.json(users)
    }

    return response.status(404).send('Nenhum usuário cadastrado')
})

app.put('/users/:id', (request, response) => {

    const { name, cpf, email, age } = request.body
    const { id } = request.params

    if (!name || !cpf || !email || !age) return response.status(400).send('Dados não preenchidos corretamente')

    users.find(user => {
        if (user.id === parseInt(id)) {
            user.name = name
            user.cpf = cpf
            user.email = email
            user.age = age
            return response.status(201).json(user)
        } 
    })
    return response.sendStatus(400)
})

app.delete('/users/:id', (request, response) => {

    const { id } = request.params

    const deletedUser = users.findIndex(user => user.id === parseInt(id))
    if (deletedUser) {
        users.splice(deletedUser, 1)
        return response.status(200).send('Usuário deletado com sucesso')
    } else {
        return response.status(404).send('Id não encontrado')
    }
    
})

app.post('/users/:id/transactions', (request, response) => {
    const { id } = request.params
    const { title, value, type} = request.body

    if (!title || !value || !type) return response.sendStatus(400).send('Dados não preenchidos corretamente')
    
    users.find(user => {
        if (user.id === parseInt(id)) {
            const transaction = new Transaction(title, value, type)
            transaction.id = user.transactions.length + 1
            user.transactions.push(transaction)
            return response.status(201).json(transaction)
        }
    })
    return response.sendStatus(400)
})

app.get('/user/:id/transactions/:idTransaction', (request, response) => {
    const { id, idTransaction } = request.params

    users.find(user => {
        if (user.id === parseInt(id)) {
            user.transactions.find(transaction => {
                if (transaction.id === parseInt(idTransaction)) {
                    return response.json(transaction)
                }
            })
        }
    })
    return response.sendStatus(400)
})

app.get('/users/:id/transactions', (request, response) => {

    const { id } = request.params

    users.find(user => {
        if (user.id === parseInt(id) && user.transactions.length === 0) {
            return response.status(404).send('Nenhuma transação cadastrada')
        }
        if (user.id === parseInt(id)) {
            Transaction.balance(user.transactions, response)
        }
        return response.sendStatus(400)
    })
})

app.put('/users/:id/transactions/:idTransaction', (request, response) => {
    const { id, idTransaction } = request.params
    const { title, value, type } = request.body

    users.find(user => {

        if (user.id === parseInt(id)) {
            user.transactions.find(transaction => {
                if (transaction.id === parseInt(idTransaction)) {
                    transaction.title = title
                    transaction.value = value
                    transaction.type = type
                    return response.status(200).json(transaction)
                }
            })
        }
        return response.sendStatus(400)
    })

})

app.delete('/users/:id/transactions/:idTransaction', (request, response) => {
    const { id, idTransaction } = request.params

    users.find(user => {

        if (user.transactions.length === 0) {
            return response.status(404).send('Nenhuma transação cadastrada')
        }

        if (user.id === parseInt(id)) {
            const index = user.transactions.findIndex(transação => transação.id === parseInt(idTransaction))
            console.log(index)
            user.transactions.splice(index, 1)
            return response.sendStatus(200)
        }
        return response.sendStatus(400)
    })
})


app.listen(3030)