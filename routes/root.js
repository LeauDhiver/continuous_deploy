'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const result = "Hello world!!!!!"
    reply
    .code(200)
    .header('content-type','application/json')
    .send(result)
    
  })
}
