'use strict'

const { ObjectId } = require("@fastify/mongodb")

module.exports = async function (fastify, opts) {
    fastify.patch('/:id/status', async function (request, reply) {        
        const collection = this.mongo.db.collection('order')
        const result = await collection.updateOne({_id: ObjectId(id)}, {
            $set: { 
                deliveryInfo: {
                    status: request.body.status
                }
            }
        }, { returnDocument:"after" })

        console.log(result);

        reply
            .code(204)
            .header('content-type','application/json')
    })
}