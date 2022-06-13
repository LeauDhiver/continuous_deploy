'use strict'

const { ObjectId } = require("@fastify/mongodb")

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        const collection = this.mongo.db.collection('restaurants')
        const result = await collection.findOne({ _id: ObjectId("62a5776ea1a55a9af7bdbde0") })

        reply
            .code(200)
            .header('content-type','application/json')
            .send(result)
    })
}
