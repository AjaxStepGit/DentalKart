const { create , getUsers, getUserByID, getUserByEmail} = require('./users.service')
const { genSaltSync, hashSync, compareSync} = require('bcrypt')

const { sign } = require('jsonwebtoken')

module.exports = {
    createUser : (req, res) => {
        const body = req.body
        const salt =  genSaltSync(10)
        body.password = hashSync(body.password, salt)
        create(body, (err, results) => {
            if(err){
                console.log(err)    
                return res.status(500).json({
                    success: 0,
                    message: 'Databse connection error'
                })
            }
            return res.status(200).json({
                success: 1, 
                data: results
            })
        })
    }, 
    getUserByID : (req, res) => {
        const id = req.params.id
        getUserByID(id, (err, results) => {
            if(err){
                console.log(err)
                return
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Record not found"
                })
            }
            return res.json({
                success: 1,
                data: results
            })
        })
    },
    login : (req, res) => {
        const body = req.body
        getUserByEmail(body.email, (err, results) => {
            if(err){
                console.log(err)
                return
            }
            if(!results) {
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
            const result = compareSync(body.password, results.password)
            if(result){
                results.password = undefined
                const jsontoken = sign({ result: results}, "qwe1234", {
                    expiresIn: '2d'
                })
                return res.json({
                    success: 1,
                    message: 'login successful',
                    token: jsontoken
                })
            }else{
                return res.json({
                    success: 0,
                    message: "Invalid email or password"
                })
            }
        })
    }
}