const express = require('express');
const router = express.Router();

const Health = require('../models/healthform.js')


router.get('/form1', (req, res)=>{

    res.render('healthforms/form1.ejs')
});


router.get('/', (req, res)=>{

  const arry = Health.find({},  (err, oneFormData, next) => {

        if (err) {
            console.log(err)
            next(err)
        }
    }).sort({"createdAt":-1});
    res.render('healthforms/healthhome.ejs',{
      two : arry
    })
    console.log(arry)


});
//
// const h = Health.find({} , (err, oneFormData, next) => {
//
//     if (err) {
//         console.log(err)
//         next(err)
//       } else {
//           res.render('healthforms/healthhome.ejs',{
//
//             saved : h
//           })
//
//       }
//     }).sort({"createdAt":-1});
//



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
