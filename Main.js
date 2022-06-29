const express = require('express')
const cors = require('cors')
const app = express()
const userRouter = require('./routes/user')
const config = require('./config')
app.use(express.json())
app.use(cors())
app.use((request, response, next) => {
    if (request.url === '/user/Signup' || request.url === '/user/Signin') {
        next()
    } else {
        const token = request.headers['token']
        if (!token || token.length === 0) {
            response.send(utils.createResult('token is missing'))
        } else {
            try {
                // extract the user id from token
                const payload = jwt.verify(token, config.secret)

                // add the userid to the request so that
                // all the other requests can use it
                request.userId = payload.id

                next()
            } catch (ex) {
                response.send(utils.useme('invalid token'))
            }
        }
    }
})

app.use('/user', userRouter)
app.listen(4000, '0.0.0.0', () => {
    console.log('Application started at 4000')
})

