const express = require("express")
const fs = require("fs");
const router = express.Router();
const knex = require("../database/conn")

router.post('/create', (req, res) => {
    let demo = {
        id: req.body.id,
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    };
    knex.select('*').from('childs').where({'id':req.body.id}).then((data) => {
        if (data.length < 1) {
            knex('childs').insert(demo).then((data) => {
            }).catch((err) => {
                res.send({"err" : err.message})
                console.log({"err" : err.message})
            })

            try{
                if(fs.existsSync('Data.json')){ 
                var a=fs.readFileSync('Data.json')
                let bb=JSON.parse(a)
                //console.log(bb)
                bb.push(demo)
                //console.log(bb)
                fs.writeFileSync('Data.json',JSON.stringify(bb,null,4))
                res.send('Your data has been inserted successfully...')
                console.log('Your data has been inserted successfully...');

            }else{
                fs.writeFileSync('Data.json',JSON.stringify([demo],null,4))
                res.send('Your data has been inserted successfully...')
                console.log('Your data has been inserted successfully...');
            }
            }catch{
                    console.log("Something wrong..");
                }
        } else {
            res.send('Data has been already inserted..')
            console.log('Data has been already inserted...')
        }
    })
})
////get data by id//
router.get('/get/:id', (req, res) => {
    knex.select('*').from('childs')
    .where({id: req.params.id})
    .then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send(err.message)
    })
    var a=fs.readFileSync('Data.json')
    let bb=JSON.parse(a)
    for( i of bb){
        if(i["id"]==req.params.id){
            console.log([i])
            break;
        }
    }
});
//update by id///
router.put('/update/:id', (req, res) => {
    knex('childs').where({"id": req.params.id})
    .update(req.body).then((data) => {
        res.send("Data has been updated successfully...")
    }).catch((err) => {
        res.send(err.message)
    })


    var d=0
    var a=fs.readFileSync('Data.json')
    let demo=JSON.parse(a)
    for( i of demo){
        if(i["id"]==req.params.id){
            demo[d]={...i,...req.body}
            break;
        }
        d++
    }
        fs.writeFileSync('Data.json',JSON.stringify(demo,null,4))
        res.send("Data has been updated successfully...")
        console.log("Data has been updated successfully..")
})


//// Delete by Id ////
router.delete('/delete/:id', (req, res) => {
    knex('childs').where({"id": req.params.id})
    .del().then((data) => {
        res.send("Data has been deleted successfully...")
    }).catch((err) => {
        res.send(err.message)
    })


    var d=0
    var a=fs.readFileSync('Data.json')
    let demo=JSON.parse(a)
    for( i of demo){
        if(i["id"]==req.params.id){
            demo.splice(d,1)
            break;
        }
        d++
    }
        fs.writeFileSync('Data.json',JSON.stringify(demo,null,4))
        res.send("Data has been delete successfully...")
        console.log("Data has been deleted successfully..")
})

module.exports=router