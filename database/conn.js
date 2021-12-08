const knex=require('knex')({
    client: "mysql",
    connection:{
        host : "localhost",
        user : "root",
        password : "Sapna@2104",
        database: "collage"

    }
})
knex.schema.createTable("childs",(table)=>{
    table.increments("id")
    table.string("name")
    table.integer("age")
    table.string("address")
}).then ((data)=>{
    console.log('table created')
}).catch ((err)=>{
    console.log("table already created")
})
module.exports=knex