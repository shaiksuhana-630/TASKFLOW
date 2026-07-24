const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// Get all tasks
router.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);

    } catch (error) {
        res.status(500).json({
            message: "Server Error"
        });
    }
});


// Add Task
router.post("/tasks", async (req, res) => {
    try {
        const { title } = req.body;

        const task = new Task({
            title
        });

        await task.save();

        res.json({
            success: true,
            message: "Task Added Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});


// Delete Task
router.delete("/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Task Deleted Successfully"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});


module.exports = router;