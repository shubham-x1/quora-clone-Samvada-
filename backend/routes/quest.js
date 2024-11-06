const express = require("express");
const router = express.Router();
const questionDB = require("../models/quest");



router.post("/", async (req, res) => {
  console.log(req.body);

  try {
    await questionDB.create({
        questionName: req.body.questionName,
        questionUrl: req.body.questionUrl,
        user:req.body.user,
      })
      .then(() => {
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
 
router.post("/questions/:id/upvote", async (req, res) => {
  console.log("Upvote request received for question:", req.params.id);
  try {
    console.log("Upvote request received for question:", req.params.id);
    
    const question = await questionDB.findByIdAndUpdate(
      req.params.id,
      { $inc: { upvotes: 1 } },
      { new: true }
    );

    if (!question) {
      console.log("Question not found:", req.params.id);
      return res.status(404).send({
        status: false,
        message: "Question not found",
      });
    }

    console.log("Question upvoted successfully:", question);
    res.status(200).send({
      status: true,
      message: "Upvote successful",
      upvotes: question.upvotes,
    });
  } catch (error) {
    console.error("Error in upvote:", error);
    res.status(500).send({
      status: false,
      message: "Error while upvoting",
      error: error.message,
    });
  }
});

router.post("/questions/:id/downvote", async (req, res) => {
  console.log("Upvote request received for question:", req.params.id);
  try {
    console.log("Downvote request received for question:", req.params.id);

    const question = await questionDB.findByIdAndUpdate(
      req.params.id,
      { $inc: { downvotes: 1 } },
      { new: true }
    );

    if (!question) {
      console.log("Question not found:", req.params.id);
      return res.status(404).send({
        status: false,
        message: "Question not found",
      });
    }

    console.log("Question downvoted successfully:", question);
    res.status(200).send({
      status: true,
      message: "Downvote successful",
      downvotes: question.downvotes,
    });
  } catch (error) {
    console.error("Error in downvote:", error);
    res.status(500).send({
      status: false,
      message: "Error while downvoting",
      error: error.message,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    await questionDB.aggregate([
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

router.delete("/questions/:id", async (req, res) => {
  const questionId = req.params.id;
  
  try {
    const deletedQuestion = await questionDB.findByIdAndDelete(questionId);
    
    if (!deletedQuestion) {
      return res.status(404).json({ 
        status: false,
        message: "Question not found" 
      });
    }

    res.status(200).json({ 
      status: true,
      message: "Question deleted successfully",
    });
    
  } catch (error) {
    res.status(500).json({ 
      status: false,
      message: "Error deleting question",
      error: error.message 
    });
  }
});
module.exports = router;