const db = require('../databaseCredentials')
const pool = db.pool
const deviceModel = require('../models/device')
const Device = deviceModel.Device

const getAllDevices = (request, response) => {

    pool.query('SELECT * FROM device', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getAllConnectedDevices = (request, response) => {
    const id = request.params.id

    pool.query('SELECT * FROM device WHERE id_i = $1', [id], (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const addDevice = (request, response) => {
    const b = request.body
    const device = new Device(null, b.type, b.lab, b.id_i)

    pool.query('INSERT INTO device (type, lab, id_i) VALUES ($1, $2, $3)',
                [device.type, device.lab, device.id_i], (error, results) => {
                    if (error) {
                        throw error
                    }
                    response.status(201).send(true)
                })

}

module.exports = {
    addDevice,
    getAllConnectedDevices,
    getAllDevices
}
