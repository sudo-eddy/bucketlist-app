//Require express package and use express.Router()
const express = require('express');
const router = express.Router();
//Link list model
const bucketlist = require('../models/list');

//GET HTTP method to /bucketlist
router.get('/',(req,res) => {
  bucketlist.getAllLists((err,lists) => {
//err always goes first
    if(err) {
      res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
    }
    else {
      res.write(JSON.stringify({success: true, lists:lists},null,2));
      res.end();
    }
  });
});

//POST HTTP method to /bucketlist
router.post('/',(req,res,next) => {
  let newList = new bucketlist({
    title: req.body.title,
    description: req.body.description,
    category: req.body.category
  });
  bucketlist.addList(newList,(err, list) => {
    if(err) {
      res.json({success: false, message: `Failed to create a new list. Error: ${err}`});
    }
    else
      res.json({success:true, message: "Added successfully."});
  });
});

//DELETE HTTP method to /bucketlist
//Pass object id ('/:id') as params
router.delete('/:id',(req,res,next) => {
//access the parameter which is the id of the item to be deleted
  let id = req.params.id;
  console.log(id);
//Call the model method deleteListById
  buketlist.deleteListById(id,(err,list) => {
    if(err) {
      res.json({suess:false, message: `Failed to delete the list. Error: ${err}`});
    }
    else if(list) {
      res.json({success:true, message: "Deleted successfully"});
    }
    else
      res.json({success:false});
  })

});


module.exports = router;
