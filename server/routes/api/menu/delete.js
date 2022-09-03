'use strict'

const { ObjectId } = require("@fastify/mongodb")

module.exports = async function (fastify, opts) {
    fastify.delete('/:id', async function (request, reply) {
        const collection = this.mongo.db.collection('restaurants')
        const oldData = await collection.findOne({ _id: ObjectId(process.env.MARKET_ID) })
        
        const newData = oldData.menu.filter(element => {
            if( element._id.toString() !== request.params.id ) {
                return element
            }           
        });
        
        const result = await collection.findOneAndUpdate({ _id: ObjectId(process.env.MARKET_ID) }, { $set: { menu: newData } }, { returnDocument:"after" })
        console.log(result);
        
        reply
            .code(204)
    })
}