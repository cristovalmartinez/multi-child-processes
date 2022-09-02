import express from "express"
import { fork } from "node:child_process"

const app = express()
const port = 4001

app.get("*", (req, res) => {
  const { number } = req.query

  if (!number) {
    return res.status(400).send({ message: `number query is required` })
  } else if (number <= 1) {
    return res
      .status(400)
      .send({ message: `Not a valid number to check if it's prime` })
  } else {
    const child = fork("./child.js")
    child.send(number)
    child.on("message", (message) => {
      res.status(200).send({ number, "is it prime?": message })
    })
  }
})

let method = function (req, res) {
  console.log(`listening on port ${port}`)
}

app.listen(port, method)
