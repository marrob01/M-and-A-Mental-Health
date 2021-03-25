const express = require('express');
const router = express.Router();

const User = require('../models/users');
const bcrypt = require('bcrypt');


router.get('/new', (req, res)=>{
    res.render('users/new.ejs')
})


router.post('/', (req, res)=>{

    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))

    User.create(req.body, (err, createdUser)=>{
        if  (err){
            if (err.code===11000){
                res.send('USER already exist!!!')
            }
            else{
                res.send(err)
            }
        }
        else{

          req.session.currentUser = createdUser
          res.redirect('/confirmation')

        }
    })
})

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

module.exports = router;
