const express = require('express');
const router = express.Router();

const Exercise = require('../models/exercies.js')

router.get('/new', (req, res) => {

    res.render('newAdd.ejs', {

    })
})

router.get('/', (req, res)=>{
  Exercise.find({}, (err, allPractice, next) => {
        if (err) { //null is the query was ok
            console.log(err)
            next(err)
        } else {
          res.render('exercies.ejs', {
                practice: allPractice,


            })
        }
    })
});



router.get('/:id', (req, res) => {
    Exercise.findById(req.params.id, (err, data) => {
      console.log(data)
        res.render('exerciesShow.ejs', {
            showId: data


        })
    })
})

router.post('/', (req, res) => {

    Exercise.create(req.body, (error, createdExercise) => {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.redirect('/exercies')
        }
    })
})

router.delete('/:id', (req, res) => {
    Exercise.findByIdAndRemove(req.params.id, (err, data) => {
        if (err) {
            console.log(err)
        } else {
        
            res.redirect('/exercies')
        }
    })
})

router.get('/:id/edit', (req, res) => {
    Exercise.findById(req.params.id, (err, foundExercise) => {
        res.render('editAdd.ejs', {
            exerciseEdit: foundExercise,

        })

    })
})

router.put('/:id', (req, res) => {

    Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updatedExercise) => {
        res.redirect('/exercies')
    })
})
module.exports = router;
