const express = require('express')
const next = require('next')
const fileUpload = require("express-fileupload")
const init = require('./server/init')
const user = require("./server/routes/user")
const admin = require("./server/routes/admin")

const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
    const server = express()

    init(server)

    // SET UP POST
    server.use(express.json())
    server.use(express.urlencoded({ extended: true }))
    server.use(fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        limits: { fileSize: 50 * 1024 * 1024 }
    }))

    server.use("/user", user)
    server.use("/admin", admin)

    server.all('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`> Ready on http://localhost:${port}`)
    })
})
