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

//GET workout
router.get("/", (req, res) => {
    Workout.find({})
        .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});

// add workout
router.put("/:id", ({ body }, res) => {
    Workout.updateOne(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});


// create workout
router.post("/", ({ body }, res) => {
    Workout.create(body)
    .then(dbWorkout => {
        res.json(dbWorkout);
    })
    .catch(err => {
        res.status(400).json(err);
    });
});







module.exports = router;