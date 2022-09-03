'use strict'
const { ObjectId } = require('@fastify/mongodb')

module.exports = async function (fastify, opts) {
    fastify.post('/', async function (request, reply) {
        const menuName = request.body.name;
        const menuPrice = request.body.price;

        const collection = this.mongo.db.collection('restaurants')
        const data = await collection.findOne({ _id: ObjectId(process.env.MARKET_ID) })
        
        // console.log(data)

        const sameIndex = data.menu.findIndex( index => index.name === menuName )
        if ( sameIndex === -1 ){
            const reqData = {
                _id: new ObjectId(),
                name: menuName,
                price: menuPrice
            }
            data.menu.push(reqData);  
            await collection.findOneAndUpdate({ _id: ObjectId(process.env.MARKET_ID) }, { $set: { menu: data.menu } }, { returnDocument:"after" })

            reply
            .code(201)
            .header('content-type','application/json')
            .send(reqData)
        } else {
            reply
            .code(400)
            .header('content-type','application/json')
            .send('Bad Request')
        }
    })
}