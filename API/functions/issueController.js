const db = require('../databaseCredentials')
const pool = db.pool
const issueModel = require('../models/issue')
const Issue = issueModel.Issue

const getAllIssuesByUser = (request, response) => {
    const user = request.body

    if (user.role == 'Administrator') {
        pool.query('SELECT * FROM issue', (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    } else if (user.role == 'Serwisant') {
        pool.query('SELECT * FROM issue WHERE solver_id = $1',[user.id_u], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    } else if (user.role == 'Użytkownik') {
        pool.query('SELECT * FROM issue WHERE initiator_id = $1',[user.id_u], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).json(results.rows)
        })
    }
}

const getIssueByDate = (request, response) => {
    const date = request.body[0]
    pool.query('SELECT * FROM issue WHERE notif_d = $1',[date], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addIssue = (request, response) => {
    const initiator_id = request.params.initiator_id
    const description = request.body[0]
    const date = new Date(request.body[1])
    const issue = new Issue(null, description, 'Oczekuje', 'Niski', date, null, null, null, initiator_id)
    pool.query('INSERT INTO issue (descr, state, priority, notif_d, accept_d, solve_d, solver_id, initiator_id ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
                [issue.descr, issue.state, issue.priority, issue.notif_d, issue.accept_d, issue.solve_d, issue.solver_id, issue.initiator_id], (error, results) => {
                    if (error) {
                        throw error
                    }
                    response.status(201).send(true)
                })

}

const setIssueSolver = (request,response) => {
    const id_i = request.params.id_i
    const solver_id = request.params.solver_id

    pool.query('UPDATE issue SET solver_id = $1 WHERE id_i = $2',[solver_id, id_i], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(true)
    })
}

const updateIssue = (request, response) => {
    const b = request.body

    const date = new Date()
    if (b.state == 'W naprawie') {
        pool.query('UPDATE issue SET priority = $1, state = $2, accept_d = $3 WHERE id_i = $4',[b.priority, b.state, date, b.id_i], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(true)
        })
    } else if (b.state == 'Rozwiązane') {
        pool.query('UPDATE issue SET priority = $1, state = $2, solve_d = $3 WHERE id_i = $4',[b.priority, b.state, date, b.id_i], (error, results) => {
            if (error) {
                throw error
            }
            response.status(200).send(true)
        })
    }
}

const deleteIssue = (request, response) => {
    const id = request.params.id

    
    pool.query('DELETE FROM device WHERE id_i = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
    })

    pool.query('DELETE FROM issue WHERE id_i = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(true)
    })
}

module.exports = {
    getAllIssuesByUser,
    addIssue,
    getIssueByDate,
    setIssueSolver,
    updateIssue,
    deleteIssue
}