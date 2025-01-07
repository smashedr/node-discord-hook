const express = require('express')
const cors = require('cors')

const port = 3000

console.debug('process.env.HOOKS:', process.env.HOOKS)
const hooks = process.env.HOOKS.split(',')
console.debug('hooks:', hooks)

const tokens = {}
hooks.forEach((hook) => {
    console.debug('hook:', hook)
    if (hook.includes('/')) {
        const parts = hook.split('|')
        tokens[parts[0].trim()] = parts[1].trim()
    }
})
console.log('tokens:', tokens)

const app = express()

app.use(express.json())
app.use(cors())

app.get('/app-health-check', (req, res) => {
    res.sendStatus(200)
})

app.get('/', (req, res) => {
    res.send('API Online!!')
})

app.post('/discord/:id', (req, res) => {
    console.debug('req.params.id:', req.params.id)
    // console.log('token:', req.params.token)
    console.debug('body:', req.body)
    const token = tokens[req.params.id]
    console.debug('token:', token)
    if (!token) {
        return res.sendStatus(404)
    }
    const webhook = `https://discord.com/api/webhooks/${token}`
    console.log('webhook:', webhook)
    postBody(webhook, req.body)
        .then((response) => {
            console.log('response:', response)
            if (response.ok) {
                // res.send(response)
                // res.status(204).send()
                res.sendStatus(204)
            } else {
                // res.sendStatus(response.status)
                res.status(response.status).send(response.statusText)
            }
        })
        .catch((error) => {
            console.error('error:', error)
            res.status(500).send(error.message)
        })
})

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})

async function postBody(url, body) {
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
    return await fetch(url, opts)
}
