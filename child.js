import { prime } from "./isPrimeUtil.js"

process.on("message", (message) => {
  let isPrime = prime(message)
  process.send(isPrime)
  process.exit()
})
