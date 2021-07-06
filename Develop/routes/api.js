const router = require("express").Router();
const Workout = require("../models/workout.js")
const path = require("path");

//getting html
router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
})

router.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"))
})

router.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"))
})

//view workouts
router.get("/api/workouts/range", (req, res) => {
    Workout.aggregate([
      { $addFields : { totalDuration: { $sum : "$exercises.duration" }}
    }]).sort({ day: -1 }).limit(7)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
   
    .catch(err => {
      res.status(400).json(err);
    });
  });
//GET workout
router.get("/api/workouts", (req, res) => {
    Workout.aggregate([{
        $addFields: {totalDuration: {$sum: "$exercises.duration"}}
    }])
        .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// add workout
router.put("/api/workouts/:id", ({ body, params }, res) => {
    Workout.findByIdAndUpdate(
        {_id: params.id},
        {$push:{exercises:body}}
    )
        .then(dbWorkout => {
            res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    })
    });



// create workout
router.post("/api/workouts/", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkoutData => {
        res.json(dbWorkoutData);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});



module.exports = router;