const express = require("express");
const router = express.Router();
router.get("/test", (req, res) => {
    res.send("Auth route working");
});
const User = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const user = new User({
            name,
            email,
            password
        });

        await user.save();

        res.json({
            success: true,
            message: "Signup Successful"
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
});


// Login
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({
            email,
            password
        });

        if (!user) {
            return res.json({
                success: false,
                message: "Invalid Email or Password"
            });
        }

        res.json({
            success: true,
            message: "Login Successful"
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