'use strict'

const { ObjectId } = require("@fastify/mongodb")

module.exports = async function (fastify, opts) {
    fastify.get('/', async function (request, reply) {
        const collection = this.mongo.db.collection('restaurants')
        const result = await collection.findOne({ _id: ObjectId(process.env.MARKET_ID) })

        reply
            .code(200)
            .header('content-type','application/json')
            .send(result)
    })
}
