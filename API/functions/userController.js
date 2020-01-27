const db = require('../databaseCredentials')
const pool = db.pool
const userModel = require('../models/user')
const User = userModel.User

const getAllUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getUserById = (request, response) => {
    const id = request.params.id
    console.log(id)
    pool.query('SELECT * FROM users WHERE id_u = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows);
        response.status(200).json(results.rows)
    })
}

const loginUser = (request, response) => {
    const login = request.params.login;
    const password = request.params.password;
    
    pool.query('SELECT * FROM users WHERE login = $1 AND password = $2', [login, password], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length > 0) {
            response.status(200).json(results.rows[0])
        } else {
            response.status(200).send(false)
        }
    })
}

const registerUser = (request, response) => {
    const b = request.body

    const user = new User(b.id, b.login, b.password, b.name, b.lastname, b.company, b.role)

    pool.query('SELECT * FROM users WHERE login = $1', [user.login], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length == 0) {
            pool.query('INSERT INTO users (login, password, name, lastname, role, company) VALUES ($1, $2, $3, $4, $5, $6)',
                [user.login, user.password, user.name, user.lastname, user.role, user.company], (error, results) => {
                    if (error) {
                        throw error
                    }
                    response.status(201).send(true)
                })
        } else {
            response.status(200).send(false)
        }
    })

    
}

const updateUser = (request, response) => {
    const b = request.body
    const user = new User(b.id, b.login, b.password, b.name, b.lastname, b.company, b.role)
    const Id= request.params.id

    pool.query('UPDATE users SET login = $1, password = $2, name = $3, lastname = $4, role = $5, company = $6 WHERE id_u = $7',
    [user.login, user.password, user.name, user.lastname, user.role, user.company, Id], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(true)
        })
}

const deleteUser = (request, response) => {
    const id = request.params.id

    pool.query('SELECT * FROM issue WHERE solver_id = $1',[id], (error, results) => {
        if (error) {
            throw error
        }
        if (results.rows.length > 0) {
            response.status(200).send(false)
        } else {
            pool.query('DELETE FROM users WHERE id_u = $1', [id], (error, results) => {
                if (error) {
                    throw error
                }
                response.status(200).send(true)
            })
        }
    })
}

module.exports = {
    getAllUsers,
    getUserById,
    loginUser,
    registerUser,
    updateUser,
    deleteUser
}