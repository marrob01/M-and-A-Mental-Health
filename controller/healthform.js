const express = require('express');
const router = express.Router();

const Health = require('../models/healthform.js')


router.get('/form1', (req, res)=>{

    res.render('healthforms/form1.ejs')
});
//
// let allforms= Health.find({updatedAt})
// console.log(allforms)
//
//   // })
//
//    allforms.sort(function(a,b){
//
//     return new Date(b.date) - new Date(a.date);
//   })
//
//     let x = data[0]
//     console.log(data)

router.get('/', (req, res)=>{

  Health.find({}, (err, oneFormData, next) => {
    console.log(Health.find({}))

        if (err) {
            console.log(err)
            next(err)
        } else {
          console.log(oneFormData)
          // console.log(req.body)

          res.render('healthforms/healthhome.ejs', {
            one : oneFormData
          })
        }
    })


});




router.post('/', (req, res) => {
  console.log(req.body)
  // const tips ={
  //   tip1 : req.body.tip1
  // }
    Health.create(req.body, (error, createdFormData) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            // res.send(createdtips)
            // console.log(req.body)
            // console.log(createdFormData)
            res.render('healthforms/healthhome.ejs', {
              // res.local.createdFormData = createdFormData
              // use res.local to set this up for every route?
              // then use date now to show the most current form responces, then save every old responcesto another page(put)???
              one: createdFormData
            })
            // res.send(req.body)
        }
    })


})

module.exports = router;
