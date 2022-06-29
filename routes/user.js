const express = require('express')
const router = express.Router()
const pool = require('../db')
const crypto = require('crypto-js')
const jwt = require('jsonwebtoken')
const config = require('../config')
const utils = require('../utils')

router.post('/Signin', (request, response) => {
    const { email, password } = request.body
    const encryptedPassword = String(crypto.MD5(password))
    const statement = `SELECT id, FirstName, LastName, email,phone,city  FROM user WHERE email=? AND password=?;`


    pool.query(statement, [email, encryptedPassword], (error, users) => {
        const result = {}
        if (error) {
            result['status'] = 'error'
            result['error'] = error
        } else if (users.length === 0) {
            result['status'] = 'failure'
            result['error'] = 'user not found'
        } else {
            const user = users[0]
            const payload = { id: user['id'] }
            const token = jwt.sign(payload, config.secret)
            result['status'] = 'success'
            result['data'] = {
                name: `${user['FirstName']} ${user['LastName']}`,
                email: user['email'],
                city: user.city,
                phone: user.phone,
                token,
            }
        }
        console.log(result)
        response.send(result)
    })

})

router.post('/Signup', (request, response) => {
    const { Firstname, Lastname, email, password, city, phone } = request.body
    const statement = `INSERT into user (Firstname, Lastname, email, password,city, phone) VALUES (?,?,?,?,?,?)`
    const encryptedPassword = String(crypto.MD5(password))
    pool.query(statement, [Firstname, Lastname, email, encryptedPassword, city, phone], (error, data) => {
        response.send(utils.useme(error, data))
    })
})
module.exports = router;