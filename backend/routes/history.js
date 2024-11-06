const express = require("express");
const router = express.Router();
const historyDB = require('../models/history')

router.post("/", async (req,res) => {
    try{
        await historyDB.create({
            questionName: req.body.questionName,
            questionUrl: req.body.questionUrl,
            user: req.body.user,
        }).then(() =>{
            res.status(201).send({
                status: true,
                message: "Question added successfully",
              });  
        })
    }
    catch (e) {
        res.status(500).send({
          status: false,
          message: "Error while adding question",
        });
      }
    });

    router.get("/", async (req, res) => {
        try {
          await historyDB.aggregate([
              {
                $lookup: {
                  from: "answers", 
                  localField: "_id", 
                  foreignField: "questionId",
                  as: "allAnswers", 
                },
              },
            ])
            .exec()
            .then((doc) => {
              res.status(200).send(doc);
            })
        } catch (e) {
          res.status(500).send({
            status: false,
            message: "Unexpected error",
          });
        }
      });
      
      
    module.exports = router;
