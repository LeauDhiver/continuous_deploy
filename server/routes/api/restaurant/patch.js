'use strict'

const { ObjectId } = require("@fastify/mongodb")

module.exports = async function (fastify, opts) {
    fastify.patch('/', async function (request, reply) {        
        const collection = this.mongo.db.collection('restaurants')
        const data = await collection.findOne({ _id: ObjectId(process.env.MARKET_ID) })
        
        if ( request.body.name !== undefined && request.body.name !== null ){
            data.name = request.body.name
        } 
        if ( request.body.address !== undefined && request.body.address !== null ){
            data.address = request.body.address 
        }
        
        console.log(data)
        
        const result = await collection.updateOne({_id: ObjectId(process.env.MARKET_ID)}, {
        $set: { 
            name: data.name,
            address: data.address
        }
        }, { returnDocument:"after" })

        console.log(result);

        reply
            .code(204)
            .header('content-type','application/json')
    })
}