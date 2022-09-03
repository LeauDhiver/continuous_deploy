'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    const result = "api 문서를 참조해주시기 바랍니다."

    reply
    .code(200)
    .header('content-type','application/json')
    .send(result)
  })
}