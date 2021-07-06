const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//track the name, type, weight, sets, reps, and duration of exercise. If the exercise is a cardio exercise, I should be able to track my distance traveled.
const workoutSchema = new Schema({

    date: {
        type: Date,
        default: Date.now
    },
    exercises: [{
        name: {
            type: String,
            trim: true,
            require: true
        },
        type: {
            type: String,
            trim: true,
            required: true
        },
        weight: {
            type: Number,
            default: 0
        },
        sets: {
            type: Number,
            default: 0
        },
        reps: {
            type: Number,
            default: 0
        },
        duration: {
            type: Number,
            default: 0
        },
        distance: {
            type: Number,
            default: 0
        },
        isCardio: {
            type: Boolean,
            default: false
        },

    }]
});

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;