const { createUser, getUserByID, login } = require('./users.controller')
const router = require('express').Router()
const { checkToken } = require('../../auth/token_validation')

router.post('/api/users', createUser)   // I couldn't complete the frontend for the user but I created the API
//router.post('/api/users',checkToken,  createUser) // By this variation of checktoken a user could not create a user without any jwt token first
router.get('/api/users/:id', checkToken, getUserByID)

router.post('/api/users/login', login)  // through login you could easily create jwt token

//all the other routes

module.exports = router