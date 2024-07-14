const express = require('express')
const cors = require('cors')

const webhook =
    'https://discord.com/api/webhooks/1143463238030331945/mxE_OgVcyl2mkb7XZNoNggOMn3vcUr8QhQ-LkBKNfeXdj9fHFkIbDrcIA6uRDZMEWlsG'

const port = 3000

const app = express()

app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
    res.send('API Online!')
})

app.post('/cssnr', (req, res) => {
    console.log('body:', req.body)
    sendDiscord(webhook, req.body).then((response) => {
        console.log('response:', response)
        // res.send(response)
        res.status(204).send()
    })
})

app.listen(port, () => {
    console.log(`App listening on port: ${port}`)
})

async function sendDiscord(url, body) {
    const opts = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }
    return await fetch(url, opts)
}
