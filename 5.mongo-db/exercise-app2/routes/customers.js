const { validateName, Course } = require('../models/customer');  //Object Destructering (Instead of obj.validateName we can use this approach)
const mongoose =  require('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router() ; 

router.get('/', async (req, res) => {
    try{
        let courses = await Course.find();
        if(Course.length < 1) return res.status(404).send('No Courses found ! ');
        res.send(courses);
    }
    catch(e){
        res.status(400).send('Error : ' + e.message);       
        console.log('Error : ', e.message);
    }
});

router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try{
        let course = await Course.findById(id);
        if(!course) return res.status(404).send (`Course with given id '${id}' was not found`);
        res.send(course);
    }
    catch(e){
        res.status(400).send('Error : '+ e.message);       
        console.log('Error : ',  e.message);
    }
});

router.post('/', async (req, res) => {

    //Joi Validation
const result = validateName(req.body);
if(result.error) return res.status(400).send(result.error.details[0].message) ;

    //saving customers
let course  = new Course({
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
})
try{
    course = await course.save();
    res.send(course);
}
catch(e){
    res.status(400).send(e.message);
    console.log('Error : ', e.message);
}
})

router.put('/:id', async (req, res) => {

        //Joi Validation
    const result = validateName(req.body);
    if(result.error) return res.status(400).send(result.error.details[0].message) ;
    
        //updating customers
    try{
        const course = await Course.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            isGold: req.body.isGold,
            phone: req.body.phone
        }, { new: true } );
        if(!course) return res.status(404).send(`The genres with given id ${req.params.id} is not found`);
        res.send(course)
    }
    catch(e){
        res.status(400).send(e.message);
        console.log('Error : ', e.message);        
    }
});

router.delete('/:id', async (req, res) => {
    try{
        const course = await Course.findOneAndRemove( {_id: req.params.id} );
        if(!course) return res.status(404).send(`Unable to delele ! Course with given id '${req.params.id}' was not found`);
        res.send(course);
    }catch(e){
        res.status(400).send('Error : ' + e.message);
        console.log('Error : ', e.message);        
    }
})

module.exports = router;

