const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');

//ADD EXPENSE
router.post('/', async (req, res) => {
 
    try{
        const newExpense=await Expense(req.body);
        const expense=newExpense.save();
        res.status(200).json(expense);

    }catch(err){
        res.status(500).json(err);
    }

})

//GET ALL EXPENSES
router.get('/', async (req, res) => {
   
    try{
        const expenses=await Expense.find().sort({createdAt:-1});
        res.status(200).json(expenses);
    }catch(err){
        res.status(500).json(err);
    }
    
});
//update expense
router.put('/:id', async (req, res) => {
    try{
        const updatedExpense=await Expense.findByIdAndUpdate(req.params.id, {
            $set:req.body
        }, {new:true});
        res.status(200).json(updatedExpense);
    }catch(err){
        res.status(500).json(err);
    }    
    
});
//delete expense
router.delete('/:id', async (req, res) => {
    try{
        await Expense.findByIdAndDelete(req.params.id);
        res.status(200).json("Expense has been deleted");
    }catch(err){
        res.status(500).json(err);
    }
    
});

//GET EXPENSE BY ID
module.exports = router;