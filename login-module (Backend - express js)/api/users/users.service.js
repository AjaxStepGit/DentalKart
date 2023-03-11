const pool = require('../../config/db')


module.exports = {
    create : (data, callback) => {
        pool.query(
            `insert into registrations(id, firstName, lastName, password, email) values (null, ?, ?, ?, ?)`,
            [
                data.first_name,
                data.last_name, 
                data.password, 
                data.email
            ],
            (error, results, fields) => {
                if(error) {
                    callback(error)
                }
                return callback(null, results)
            }
        )
    },
    getUsers: callback => {
        pool.query(
            `select firstName, lastName, email from registrations`,
            [],
            (error, results, fields) => {
                if(error) {
                    callback(error)
                }
                return callback(null, results[0])
            }
        )
    },
    getUserByID: (id, callback) => {
        pool.query(
            `select firstName, lastName, email from registrations where id=?`,
            [id],
            (error, results, fields) => {
                if(error) {
                    callback(error)
                }
                return callback(null, results[0])
            }
        )
    }, 
    getUserByEmail : (email, callback) => {    
        pool.query(
            `select * from registrations where email = ?`,
            [email],
            (error, results, fields) => {
                if(error){
                    callback(error)
                }
                return callback(null, results[0])
            }
        )
    }
}