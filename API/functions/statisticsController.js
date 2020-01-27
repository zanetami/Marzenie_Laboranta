const db = require('../databaseCredentials')
const pool = db.pool

const getStatistics = (request, response) =>{
    var statArray = []
    const empty = null
    const date = new Date()
    const week = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
    const month = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
    const year = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())

    // week
    pool.query('SELECT COUNT(*) FROM issue WHERE accept_d IS NULL AND notif_d > $1',
    [week], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows.count);
        statArray[0] = results.rows[0].count
        pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NULL AND notif_d > $1`,
        [week], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results.rows.count);
            statArray[1] = results.rows[0].count
            pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NOT NULL AND notif_d > $1`,
            [week], (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows.count);
                statArray[2] = results.rows[0].count
                // month
                pool.query('SELECT COUNT(*) FROM issue WHERE accept_d IS NULL AND notif_d > $1',
                [month], (error, results) => {
                    if (error) {
                        throw error
                    }
                    console.log(results.rows.count);
                    statArray[3] = results.rows[0].count

                    pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NULL AND notif_d > $1`,
                    [month], (error, results) => {
                        if (error) {
                            throw error
                        }
                        console.log(results.rows.count);
                        statArray[4] = results.rows[0].count
                        pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NOT NULL AND notif_d > $1`,
                        [month], (error, results) => {
                            if (error) {
                                throw error
                            }
                            console.log(results.rows.count);
                            statArray[5] = results.rows[0].count
                                // year
                            pool.query('SELECT COUNT(*) FROM issue WHERE accept_d IS NULL AND notif_d > $1',
                            [year], (error, results) => {
                                if (error) {
                                    throw error
                                }
                                console.log(results.rows.count);
                                statArray[6] = results.rows[0].count
                                pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NULL AND notif_d > $1`,
                                [year], (error, results) => {
                                    if (error) {
                                        throw error
                                    }
                                    console.log(results.rows.count);
                                    statArray[7] = results.rows[0].count
                                    pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NOT NULL AND notif_d > $1`,
                                    [year], (error, results) => {
                                        if (error) {
                                            throw error
                                        }
                                        statArray[8] = results.rows[0].count
                                        response.status(200).send(statArray)
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
 
}

const getStatisticsService = (request, response) =>{
    var statArray = []
    const id_u = request.params.id
    const date = new Date()
    const week = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
    const month = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
    const year = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())

    // week
    pool.query('SELECT COUNT(*) FROM issue WHERE accept_d IS NULL AND notif_d > $1 AND solver_id = $2',
    [week, id_u], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows.count);
        statArray[0] = results.rows[0].count
        pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NULL AND notif_d > $1 AND solver_id = $2`,
        [week, id_u], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results.rows.count);
            statArray[1] = results.rows[0].count
            pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NOT NULL AND notif_d > $1 AND solver_id = $2`,
            [week, id_u], (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows.count);
                statArray[2] = results.rows[0].count
                // month
                pool.query('SELECT COUNT(*) FROM issue WHERE accept_d IS NULL AND notif_d > $1 AND solver_id = $2',
                [month, id_u], (error, results) => {
                    if (error) {
                        throw error
                    }
                    console.log(results.rows.count);
                    statArray[3] = results.rows[0].count

                    pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NULL AND notif_d > $1 AND solver_id = $2`,
                    [month, id_u], (error, results) => {
                        if (error) {
                            throw error
                        }
                        console.log(results.rows.count);
                        statArray[4] = results.rows[0].count
                        pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NOT NULL AND notif_d > $1 AND solver_id = $2`,
                        [month, id_u], (error, results) => {
                            if (error) {
                                throw error
                            }
                            console.log(results.rows.count);
                            statArray[5] = results.rows[0].count
                                // year
                            pool.query('SELECT COUNT(*) FROM issue WHERE accept_d IS NULL AND notif_d > $1 AND solver_id = $2',
                            [year, id_u], (error, results) => {
                                if (error) {
                                    throw error
                                }
                                console.log(results.rows.count);
                                statArray[6] = results.rows[0].count
                                pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NULL AND notif_d > $1 AND solver_id = $2`,
                                [year, id_u], (error, results) => {
                                    if (error) {
                                        throw error
                                    }
                                    console.log(results.rows.count);
                                    statArray[7] = results.rows[0].count
                                    pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NOT NULL AND notif_d > $1 AND solver_id = $2`,
                                    [year, id_u], (error, results) => {
                                        if (error) {
                                            throw error
                                        }
                                        statArray[8] = results.rows[0].count
                                        response.status(200).send(statArray)
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
 
}

const getStatisticsUser = (request, response) =>{
    var statArray = []
    const id_u = request.params.id
    const empty = null
    const date = new Date()
    const week = new Date(date.getFullYear(), date.getMonth(), date.getDate() - 7)
    const month = new Date(date.getFullYear(), date.getMonth() - 1, date.getDate())
    const year = new Date(date.getFullYear() - 1, date.getMonth(), date.getDate())

    // week
    pool.query('SELECT COUNT(*) FROM issue WHERE accept_d IS NULL AND notif_d > $1 AND initiator_id = $2',
    [week, id_u], (error, results) => {
        if (error) {
            throw error
        }
        console.log(results.rows.count);
        statArray[0] = results.rows[0].count
        pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NULL AND notif_d > $1 AND initiator_id = $2`,
        [week, id_u], (error, results) => {
            if (error) {
                throw error
            }
            console.log(results.rows.count);
            statArray[1] = results.rows[0].count
            pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NOT NULL AND notif_d > $1 AND initiator_id = $2`,
            [week, id_u], (error, results) => {
                if (error) {
                    throw error
                }
                console.log(results.rows.count);
                statArray[2] = results.rows[0].count
                // month
                pool.query('SELECT COUNT(*) FROM issue WHERE accept_d IS NULL AND notif_d > $1 AND initiator_id = $2',
                [month, id_u], (error, results) => {
                    if (error) {
                        throw error
                    }
                    console.log(results.rows.count);
                    statArray[3] = results.rows[0].count

                    pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NULL AND notif_d > $1 AND initiator_id = $2`,
                    [month, id_u], (error, results) => {
                        if (error) {
                            throw error
                        }
                        console.log(results.rows.count);
                        statArray[4] = results.rows[0].count
                        pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NOT NULL AND notif_d > $1 AND initiator_id = $2`,
                        [month, id_u], (error, results) => {
                            if (error) {
                                throw error
                            }
                            console.log(results.rows.count);
                            statArray[5] = results.rows[0].count
                                // year
                            pool.query('SELECT COUNT(*) FROM issue WHERE accept_d IS NULL AND notif_d > $1 AND initiator_id = $2',
                            [year, id_u], (error, results) => {
                                if (error) {
                                    throw error
                                }
                                console.log(results.rows.count);
                                statArray[6] = results.rows[0].count
                                pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NULL AND notif_d > $1 AND initiator_id = $2`,
                                [year, id_u], (error, results) => {
                                    if (error) {
                                        throw error
                                    }
                                    console.log(results.rows.count);
                                    statArray[7] = results.rows[0].count
                                    pool.query(`SELECT COUNT(*) FROM issue WHERE accept_d IS NOT NULL AND solve_d IS NOT NULL AND notif_d > $1 AND initiator_id = $2`,
                                    [year, id_u], (error, results) => {
                                        if (error) {
                                            throw error
                                        }
                                        statArray[8] = results.rows[0].count
                                        response.status(200).send(statArray)
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
    })
 
}

module.exports = {
    getStatistics,
    getStatisticsUser,
    getStatisticsService
}